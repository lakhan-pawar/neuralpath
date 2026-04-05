// Interview Deep Dives - Part 8
// Vision Models, Generative Models, Advanced Architectures

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART8: DeepDiveTopic[] = [
  {
    id: 'vision-1',
    title: 'Vision Transformer (ViT)',
    category: 'Model Architectures',
    difficulty: 'Advanced',
    concept: 'Vision Transformer applies transformer architecture to images by splitting images into patches, treating them as tokens. It achieves state-of-the-art results without convolutions, showing transformers work beyond NLP.',
    howItWorks: [
      {
        step: 'Split image into patches',
        explanation: 'Divide image (e.g., 224×224) into fixed-size patches (e.g., 16×16). For 224×224 image with 16×16 patches, get 196 patches. Flatten each patch to vector.',
      },
      {
        step: 'Linear projection',
        explanation: 'Project each flattened patch to embedding dimension (e.g., 768) using learned linear layer. This is like word embeddings for patches.',
      },
      {
        step: 'Add positional embeddings',
        explanation: 'Add learned positional embeddings to patch embeddings. Unlike NLP, these are learned (not sinusoidal) since image positions are fixed.',
      },
      {
        step: 'Prepend [CLS] token',
        explanation: 'Add special [CLS] token at beginning (like BERT). Its final representation is used for classification.',
      },
      {
        step: 'Transformer encoder',
        explanation: 'Pass through standard transformer encoder (12-24 layers). Self-attention allows patches to attend to all other patches, capturing global context.',
      },
      {
        step: 'Classification head',
        explanation: 'Take [CLS] token output, pass through MLP head for classification. Train end-to-end on image classification.',
      },
    ],
    intuition: 'ViT treats an image like a sentence. Each patch is a "word". Just as BERT understands sentences by relating words, ViT understands images by relating patches. The transformer learns which patches are important and how they relate.',
    whenToUse: [
      'Image classification with large datasets (ImageNet-21K)',
      'When you have sufficient pre-training data',
      'Transfer learning for vision tasks',
      'When you want to avoid inductive biases of CNNs',
    ],
    tradeoffs: {
      pros: [
        'Scales better than CNNs with data',
        'Global receptive field from layer 1',
        'Unified architecture for vision and language',
        'Interpretable attention maps',
      ],
      cons: [
        'Requires large datasets (worse than CNNs on small data)',
        'More computationally expensive than CNNs',
        'Loses spatial inductive bias of convolutions',
        'Larger model size',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
from einops import rearrange
from transformers import ViTForImageClassification, ViTImageProcessor

# Simple ViT implementation
class VisionTransformer(nn.Module):
    def __init__(self, image_size=224, patch_size=16, num_classes=1000,
                 dim=768, depth=12, heads=12, mlp_dim=3072):
        super().__init__()
        num_patches = (image_size // patch_size) ** 2
        patch_dim = 3 * patch_size * patch_size
        
        # Patch embedding
        self.patch_embed = nn.Linear(patch_dim, dim)
        
        # Positional embedding
        self.pos_embed = nn.Parameter(torch.randn(1, num_patches + 1, dim))
        
        # CLS token
        self.cls_token = nn.Parameter(torch.randn(1, 1, dim))
        
        # Transformer encoder
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model=dim, nhead=heads, dim_feedforward=mlp_dim),
            num_layers=depth
        )
        
        # Classification head
        self.mlp_head = nn.Sequential(
            nn.LayerNorm(dim),
            nn.Linear(dim, num_classes)
        )
        
        self.patch_size = patch_size
    
    def forward(self, img):
        # Split into patches
        patches = rearrange(img, 'b c (h p1) (w p2) -> b (h w) (p1 p2 c)',
                           p1=self.patch_size, p2=self.patch_size)
        
        # Patch embedding
        x = self.patch_embed(patches)
        
        # Add CLS token
        cls_tokens = self.cls_token.expand(x.shape[0], -1, -1)
        x = torch.cat([cls_tokens, x], dim=1)
        
        # Add positional embedding
        x = x + self.pos_embed
        
        # Transformer
        x = self.transformer(x)
        
        # Classification from CLS token
        return self.mlp_head(x[:, 0])

# Using pre-trained ViT
processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')

# Inference
from PIL import Image
image = Image.open('cat.jpg')
inputs = processor(images=image, return_tensors="pt")
outputs = model(**inputs)
logits = outputs.logits
predicted_class = logits.argmax(-1).item()

print(f"Predicted class: {model.config.id2label[predicted_class]}")`,
      explanation: 'ViT splits image into patches, embeds them, adds positional encoding, and processes with transformer. The einops library makes patch extraction clean. Pre-trained ViT models are available in Hugging Face.',
    },
    visualAnalogy: 'ViT is like reading a comic book. Instead of seeing the whole page at once (CNN), you read panel by panel (patches). But you can look back at any panel (global attention) to understand the story. Each panel relates to others through attention.',
    interviewQuestions: [
      {
        question: 'Why does ViT need more data than CNNs?',
        answer: 'CNNs have inductive biases: locality (nearby pixels are related), translation equivariance (same pattern anywhere). ViT has no such biases - it must learn everything from data. With small datasets, CNNs leverage biases to generalize. With large datasets (ImageNet-21K), ViT learns these patterns and more, outperforming CNNs. Hybrid models (ViT with conv stem) work better on medium data.',
      },
      {
        question: 'How does ViT compare to CNNs in terms of receptive field?',
        answer: 'CNNs: receptive field grows gradually with depth. Early layers see small regions, deep layers see larger regions. ViT: global receptive field from layer 1 due to self-attention. Every patch can attend to every other patch immediately. This allows modeling long-range dependencies early. Trade-off: CNNs are more parameter-efficient for local patterns, ViT better for global context.',
      },
      {
        question: 'What are the main ViT variants?',
        answer: 'DeiT (Data-efficient ViT): Uses distillation and augmentation to train on ImageNet-1K. Swin Transformer: Hierarchical ViT with shifted windows for efficiency. BEiT: BERT-style pre-training for images (masked patch prediction). MAE (Masked Autoencoder): Masks 75% of patches, reconstructs them. CvT: Convolutional ViT with conv layers. Each addresses ViT limitations: data efficiency, computational cost, or pre-training.',
      },
    ],
    commonMistakes: [
      'Using ViT on small datasets without pre-training',
      'Not using proper data augmentation',
      'Forgetting positional embeddings',
      'Using wrong patch size (too large or too small)',
      'Not considering computational cost vs CNNs',
    ],
    relatedTopics: ['Swin Transformer', 'DeiT', 'MAE', 'BEiT', 'Convolutional Neural Networks'],
  },
  {
    id: 'gen-1',
    title: 'Diffusion Models (DDPM)',
    category: 'Generative Models',
    difficulty: 'Advanced',
    concept: 'Diffusion models generate images by learning to reverse a gradual noising process. They iteratively denoise random noise into high-quality samples, achieving state-of-the-art image generation quality.',
    howItWorks: [
      {
        step: 'Forward diffusion (training)',
        explanation: 'Gradually add Gaussian noise to real images over T steps (e.g., T=1000). x_0 (real image) → x_1 → ... → x_T (pure noise). Each step: x_t = √(1-β_t) × x_{t-1} + √β_t × ε, where ε ~ N(0,I).',
      },
      {
        step: 'Train denoising network',
        explanation: 'Neural network (U-Net) learns to predict noise added at each step. Input: noisy image x_t and timestep t. Output: predicted noise ε_θ. Loss: MSE between predicted and actual noise.',
      },
      {
        step: 'Reverse diffusion (sampling)',
        explanation: 'Start with random noise x_T ~ N(0,I). Iteratively denoise: x_{t-1} = (x_t - predicted_noise) / √(1-β_t) + noise. Repeat T steps to get x_0 (generated image).',
      },
      {
        step: 'Conditioning (optional)',
        explanation: 'For conditional generation (text-to-image), add condition to network input. Classifier-free guidance: train both conditional and unconditional models, interpolate predictions.',
      },
    ],
    intuition: 'Diffusion is like sculpting from clay. Start with a rough blob (noise), gradually refine it by removing imperfections (denoising). The model learns what "imperfections" look like at each refinement stage. After many steps, you have a detailed sculpture (image).',
    whenToUse: [
      'High-quality image generation (Stable Diffusion, DALL-E 2)',
      'Text-to-image synthesis',
      'Image inpainting and editing',
      'When you prioritize quality over speed',
    ],
    tradeoffs: {
      pros: [
        'State-of-the-art image quality',
        'Stable training (no mode collapse like GANs)',
        'Flexible conditioning',
        'Interpretable generation process',
      ],
      cons: [
        'Slow sampling (requires many steps)',
        'Computationally expensive',
        'Large model size',
        'Requires careful hyperparameter tuning',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
from diffusers import DDPMPipeline, DDPMScheduler, UNet2DModel

# Simple diffusion training
class SimpleDiffusion(nn.Module):
    def __init__(self, model, timesteps=1000):
        super().__init__()
        self.model = model  # U-Net
        self.timesteps = timesteps
        
        # Noise schedule (beta)
        self.betas = torch.linspace(1e-4, 0.02, timesteps)
        self.alphas = 1 - self.betas
        self.alphas_cumprod = torch.cumprod(self.alphas, dim=0)
    
    def forward_diffusion(self, x0, t):
        """Add noise to x0 at timestep t"""
        noise = torch.randn_like(x0)
        alpha_t = self.alphas_cumprod[t].view(-1, 1, 1, 1)
        
        # x_t = sqrt(alpha_t) * x_0 + sqrt(1-alpha_t) * noise
        noisy_x = torch.sqrt(alpha_t) * x0 + torch.sqrt(1 - alpha_t) * noise
        return noisy_x, noise
    
    def training_step(self, x0):
        # Random timestep
        t = torch.randint(0, self.timesteps, (x0.shape[0],))
        
        # Add noise
        noisy_x, noise = self.forward_diffusion(x0, t)
        
        # Predict noise
        predicted_noise = self.model(noisy_x, t)
        
        # MSE loss
        loss = nn.functional.mse_loss(predicted_noise, noise)
        return loss
    
    @torch.no_grad()
    def sample(self, shape):
        """Generate samples by denoising"""
        x = torch.randn(shape)
        
        for t in reversed(range(self.timesteps)):
            # Predict noise
            predicted_noise = self.model(x, torch.tensor([t]))
            
            # Denoise
            alpha_t = self.alphas_cumprod[t]
            beta_t = self.betas[t]
            
            x = (x - beta_t / torch.sqrt(1 - alpha_t) * predicted_noise) / torch.sqrt(1 - beta_t)
            
            # Add noise (except last step)
            if t > 0:
                x += torch.sqrt(beta_t) * torch.randn_like(x)
        
        return x

# Using Stable Diffusion
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1")
pipe = pipe.to("cuda")

# Generate image from text
prompt = "A cat wearing a space suit, digital art"
image = pipe(prompt, num_inference_steps=50).images[0]
image.save("cat_astronaut.png")`,
      explanation: 'Diffusion training is simple: add noise, predict it, minimize MSE. Sampling reverses the process iteratively. Stable Diffusion adds text conditioning via CLIP embeddings. The diffusers library makes it easy to use pre-trained models.',
    },
    visualAnalogy: 'Diffusion is like developing a photograph in a darkroom. Start with blank paper (noise), gradually reveal the image by applying chemicals (denoising). Each step reveals more detail. The model learns the "chemistry" of image formation.',
    interviewQuestions: [
      {
        question: 'How do diffusion models differ from GANs?',
        answer: 'Diffusion: Iterative denoising, stable training, slow sampling, no mode collapse. GANs: Single-step generation, fast sampling, unstable training (adversarial), mode collapse. Diffusion achieves better quality and diversity but is slower. GANs are faster but harder to train. Diffusion has become dominant for image generation (Stable Diffusion, DALL-E 2) due to quality and stability.',
      },
      {
        question: 'What is classifier-free guidance?',
        answer: 'Classifier-free guidance improves conditional generation quality. Train model on both conditional (with text) and unconditional (without text) objectives. At sampling: predicted_noise = unconditional_noise + guidance_scale × (conditional_noise - unconditional_noise). Higher guidance_scale = stronger conditioning but less diversity. Typical values: 7-15. Eliminates need for separate classifier, simplifies training.',
      },
      {
        question: 'How can you speed up diffusion sampling?',
        answer: 'Diffusion is slow (50-1000 steps). Speedups: 1) DDIM: Deterministic sampling, fewer steps (50 instead of 1000), 2) Latent diffusion (Stable Diffusion): Operate in compressed latent space, not pixel space, 3) Distillation: Train student to match teacher in fewer steps, 4) Better noise schedules. Stable Diffusion combines latent space + DDIM for practical speed.',
      },
    ],
    commonMistakes: [
      'Using too few timesteps (poor quality)',
      'Wrong noise schedule (beta values)',
      'Not using U-Net architecture (other architectures work poorly)',
      'Forgetting to condition on timestep t',
      'Not using latent diffusion for large images (too slow)',
    ],
    relatedTopics: ['Stable Diffusion', 'DALL-E 2', 'Score-Based Models', 'VAE', 'U-Net'],
  },
  {
    id: 'arch-3',
    title: 'ResNet (Residual Networks)',
    category: 'Model Architectures',
    difficulty: 'Intermediate',
    concept: 'ResNet introduces skip connections that allow gradients to flow directly through the network. This solves vanishing gradients in very deep networks, enabling training of 100+ layer models.',
    howItWorks: [
      {
        step: 'Residual block',
        explanation: 'Instead of learning H(x), learn residual F(x) = H(x) - x. Output: H(x) = F(x) + x. The "+x" is the skip connection (identity mapping).',
      },
      {
        step: 'Forward pass',
        explanation: 'Input x goes through conv layers to compute F(x). Add x to F(x) via skip connection. Apply activation. This creates shortcut path.',
      },
      {
        step: 'Backward pass',
        explanation: 'Gradient flows through both residual path and skip connection. Skip connection provides direct path for gradients, preventing vanishing.',
      },
      {
        step: 'Stack residual blocks',
        explanation: 'Stack many residual blocks (ResNet-50 has 50 layers, ResNet-152 has 152). Periodically downsample with stride=2.',
      },
    ],
    intuition: 'ResNet is like a highway with exits. Instead of forcing traffic through every exit (layer), you can take the highway (skip connection) and bypass some exits. This makes the journey (gradient flow) much faster and prevents getting stuck.',
    whenToUse: [
      'Image classification (ImageNet)',
      'Object detection (Faster R-CNN backbone)',
      'When you need very deep networks',
      'As backbone for many vision tasks',
    ],
    tradeoffs: {
      pros: [
        'Enables training very deep networks (100+ layers)',
        'Solves vanishing gradient problem',
        'Better accuracy than plain networks',
        'Widely used and well-understood',
      ],
      cons: [
        'More memory (stores activations for skip connections)',
        'Slightly more complex than plain networks',
        'Not as parameter-efficient as some newer architectures',
      ],
    },
    visualAnalogy: 'ResNet is like editing a document. Instead of rewriting from scratch (learning H(x)), you make edits to the original (learning F(x) and adding to x). If no edits needed, F(x)=0 and output=input. This makes learning easier.',
    interviewQuestions: [
      {
        question: 'Why do skip connections help with vanishing gradients?',
        answer: 'In deep networks, gradients are multiplied through layers during backprop. If gradients <1, they vanish. Skip connections provide direct path: gradient can flow through identity mapping without multiplication. Even if residual path has vanishing gradient, skip connection preserves gradient. Mathematically: ∂loss/∂x = ∂loss/∂H × (∂F/∂x + 1). The "+1" ensures gradient always flows.',
      },
      {
        question: 'What is the difference between ResNet and Highway Networks?',
        answer: 'Both use skip connections. Highway Networks: learned gates control how much signal flows through skip vs residual path. ResNet: always adds full skip connection (no gates). ResNet is simpler and works better empirically. Highway Networks were first (2015), ResNet improved the idea (2015). ResNet\'s simplicity (no gates) is key to its success.',
      },
      {
        question: 'How does ResNet handle dimension mismatch in skip connections?',
        answer: 'When spatial dimensions change (stride=2) or channels change, can\'t directly add x to F(x). Solutions: 1) Zero-padding: pad x with zeros to match dimensions, 2) Projection: use 1×1 conv to project x to correct dimensions. Projection is more common and performs better. Example: x is 64 channels, F(x) is 128 channels → use 1×1 conv to make x 128 channels.',
      },
    ],
    commonMistakes: [
      'Forgetting skip connections (defeats purpose)',
      'Not handling dimension mismatch properly',
      'Applying activation before adding skip connection',
      'Using too few residual blocks (need depth for benefits)',
    ],
    relatedTopics: ['DenseNet', 'Highway Networks', 'Skip Connections', 'Vanishing Gradients'],
  },
  {
    id: 'vision-2',
    title: 'Convolutional Neural Networks (CNNs)',
    category: 'Model Architectures',
    difficulty: 'Beginner',
    concept: 'CNNs use convolutional layers with local receptive fields and weight sharing to process grid-like data. They exploit spatial structure, achieving translation invariance and parameter efficiency for vision tasks.',
    howItWorks: [
      {
        step: 'Convolution operation',
        explanation: 'Slide filter (kernel) over input. Compute dot product at each position. Creates feature map. Filter detects specific pattern (edge, texture).',
      },
      {
        step: 'Pooling',
        explanation: 'Downsample feature maps. Max pooling: take maximum in window. Reduces spatial dimensions, provides translation invariance.',
      },
      {
        step: 'Stack layers',
        explanation: 'Multiple conv-pool layers. Early layers detect edges, later layers detect complex patterns (faces, objects).',
      },
      {
        step: 'Fully connected layers',
        explanation: 'Flatten feature maps, pass through FC layers for classification.',
      },
    ],
    intuition: 'CNNs are like looking at a photo through different filters. Each filter highlights specific features (edges, colors, textures). Stack filters to detect increasingly complex patterns. Pooling is like zooming out to see the big picture.',
    whenToUse: [
      'Image classification, object detection',
      'Video analysis',
      'Any grid-like data (images, audio spectrograms)',
      'When spatial structure matters',
    ],
    tradeoffs: {
      pros: [
        'Parameter efficient (weight sharing)',
        'Translation invariant',
        'Captures spatial hierarchies',
        'Fast on GPUs',
      ],
      cons: [
        'Fixed receptive field',
        'Not rotation invariant',
        'Struggles with long-range dependencies',
        'Requires spatial structure',
      ],
    },
    visualAnalogy: 'CNNs are like reading with a magnifying glass. You scan small regions (local receptive field), looking for patterns. You use the same magnifying glass everywhere (weight sharing). As you zoom out (pooling), you see bigger patterns.',
    interviewQuestions: [
      {
        question: 'What is weight sharing and why is it important?',
        answer: 'Weight sharing: Same filter weights used across all spatial positions. A 3×3 filter has 9 parameters, applied to entire image. Without sharing: separate weights for each position (millions of parameters). Benefits: 1) Drastically fewer parameters, 2) Translation invariance (detects pattern anywhere), 3) Learns generalizable features. Key innovation of CNNs.',
      },
      {
        question: 'How does receptive field grow with depth?',
        answer: 'Receptive field: region of input that affects a neuron. Grows with depth. Example: 3×3 conv, layer 1 sees 3×3, layer 2 sees 5×5, layer 3 sees 7×7. Formula: RF = 1 + Σ(kernel_size - 1) × Πstrides. Pooling increases RF. Deep networks see large regions. Important for detecting large objects. Dilated convolutions increase RF without pooling.',
      },
      {
        question: 'Why are CNNs being replaced by Vision Transformers?',
        answer: 'CNNs: Strong inductive biases (locality, translation invariance), parameter efficient, work well on small data. ViTs: Weaker biases, global receptive field from layer 1, scale better with data. On large datasets (ImageNet-21K), ViTs outperform CNNs. On small datasets, CNNs still better. Trend: ViTs for large-scale, CNNs for resource-constrained. Hybrid models combine both.',
      },
    ],
    commonMistakes: [
      'Not using padding (spatial dimensions shrink too fast)',
      'Too much pooling (lose spatial information)',
      'Not considering receptive field size',
      'Using FC layers when fully convolutional is better',
    ],
    relatedTopics: ['ResNet', 'Vision Transformer', 'Pooling', 'Receptive Field'],
  },
  {
    id: 'gen-2',
    title: 'VAE (Variational Autoencoder)',
    category: 'Generative Models',
    difficulty: 'Advanced',
    concept: 'VAE is a generative model that learns a probabilistic mapping between data and latent space. It uses encoder-decoder architecture with reparameterization trick, enabling generation of new samples by sampling from learned latent distribution.',
    howItWorks: [
      {
        step: 'Encoder',
        explanation: 'Maps input x to latent distribution parameters: mean μ and variance σ². q(z|x) = N(μ, σ²).',
      },
      {
        step: 'Reparameterization trick',
        explanation: 'Sample z = μ + σ × ε, where ε ~ N(0,1). This makes sampling differentiable.',
      },
      {
        step: 'Decoder',
        explanation: 'Maps latent z to reconstruction x̂. p(x|z).',
      },
      {
        step: 'Loss function',
        explanation: 'Loss = Reconstruction loss + KL divergence. Reconstruction: how well decoder reconstructs input. KL: how close latent distribution is to prior N(0,1).',
      },
      {
        step: 'Generation',
        explanation: 'Sample z ~ N(0,1), pass through decoder to generate new x.',
      },
    ],
    intuition: 'VAE is like learning to compress and decompress images. Encoder compresses to compact code (latent), decoder decompresses. The code is probabilistic, allowing generation of variations. KL term ensures codes are well-organized.',
    whenToUse: [
      'Image generation',
      'Anomaly detection (reconstruction error)',
      'Data compression',
      'When you need interpretable latent space',
    ],
    tradeoffs: {
      pros: [
        'Principled probabilistic framework',
        'Smooth latent space',
        'Fast sampling (single forward pass)',
        'Can do both generation and reconstruction',
      ],
      cons: [
        'Blurry generations (compared to GANs/diffusion)',
        'Posterior collapse (KL→0)',
        'Difficult to balance reconstruction and KL',
        'Limited generation quality',
      ],
    },
    visualAnalogy: 'VAE is like learning a language. Encoder translates images to abstract concepts (latent). Decoder translates concepts back to images. The concepts are fuzzy (probabilistic), allowing creative variations. Grammar rules (KL term) keep concepts organized.',
    interviewQuestions: [
      {
        question: 'What is the reparameterization trick and why is it needed?',
        answer: 'Problem: Sampling z ~ N(μ, σ²) is not differentiable (can\'t backprop through random sampling). Solution: Reparameterization. Instead of sampling z directly, sample ε ~ N(0,1) and compute z = μ + σε. Now randomness is in ε (fixed), and z is differentiable function of μ, σ. This allows backprop through encoder. Essential for training VAE.',
      },
      {
        question: 'What is posterior collapse and how to fix it?',
        answer: 'Posterior collapse: Encoder ignores input, outputs prior N(0,1). KL term becomes 0, decoder learns to generate from prior alone. Causes: KL term too strong, decoder too powerful. Solutions: 1) KL annealing (gradually increase KL weight), 2) Free bits (allow some KL before penalizing), 3) Weaker decoder, 4) β-VAE (tune KL weight). Common problem in VAE training.',
      },
      {
        question: 'VAE vs GAN - what are the differences?',
        answer: 'VAE: Explicit likelihood, encoder-decoder, blurry outputs, stable training, fast sampling. GAN: Implicit likelihood, generator-discriminator, sharp outputs, unstable training, fast sampling. VAE optimizes lower bound on likelihood, GAN uses adversarial loss. VAE has encoder (GAN doesn\'t), useful for reconstruction. GAN generates higher quality images. Modern: combine both (VAE-GAN).',
      },
    ],
    commonMistakes: [
      'Not using reparameterization trick',
      'Wrong balance between reconstruction and KL',
      'Not handling posterior collapse',
      'Expecting GAN-quality generations',
    ],
    relatedTopics: ['Autoencoder', 'GAN', 'β-VAE', 'Latent Space', 'Reparameterization Trick'],
  },
  {
    id: 'arch-6',
    title: 'Attention Mechanism (Bahdanau/Luong)',
    category: 'Model Architectures',
    difficulty: 'Intermediate',
    concept: 'Attention allows decoder to focus on relevant parts of encoder output at each decoding step. It computes weighted sum of encoder states, where weights indicate relevance. Crucial for sequence-to-sequence tasks.',
    howItWorks: [
      {
        step: 'Encoder produces hidden states',
        explanation: 'Encoder (RNN/LSTM) processes input sequence, outputs hidden state for each position: h_1, ..., h_n.',
      },
      {
        step: 'Compute attention scores',
        explanation: 'At each decoder step, compute score between decoder state s_t and each encoder state h_i. Score = s_t · h_i (dot) or MLP(s_t, h_i) (additive).',
      },
      {
        step: 'Softmax to get weights',
        explanation: 'α_i = softmax(scores). Weights sum to 1, indicate importance of each encoder position.',
      },
      {
        step: 'Compute context vector',
        explanation: 'c_t = Σ α_i × h_i. Weighted sum of encoder states.',
      },
      {
        step: 'Decoder uses context',
        explanation: 'Decoder combines context c_t with current state s_t to predict next token.',
      },
    ],
    intuition: 'Attention is like reading a book while writing a summary. At each sentence you write (decoder step), you look back at relevant parts of the book (encoder states). You don\'t need to remember everything - just focus on what\'s relevant now.',
    whenToUse: [
      'Machine translation',
      'Text summarization',
      'Image captioning',
      'Any seq2seq task',
    ],
    tradeoffs: {
      pros: [
        'Handles long sequences better than vanilla seq2seq',
        'Interpretable (can visualize attention weights)',
        'Allows decoder to access all encoder states',
        'Improves translation quality significantly',
      ],
      cons: [
        'O(n²) complexity for self-attention',
        'More parameters than vanilla seq2seq',
        'Slower than no attention',
        'Superseded by transformer attention',
      ],
    },
    visualAnalogy: 'Attention is like a spotlight on a stage. The decoder (director) shines the spotlight on different actors (encoder states) as needed. The spotlight intensity (attention weights) shows who\'s important for the current scene.',
    interviewQuestions: [
      {
        question: 'What is the difference between Bahdanau and Luong attention?',
        answer: 'Bahdanau (additive): score = v^T tanh(W_1 s_t + W_2 h_i). Uses previous decoder state. Computes attention before decoder step. Luong (multiplicative): score = s_t · h_i (dot) or s_t W h_i (general). Uses current decoder state. Computes attention after decoder step. Luong is simpler and faster. Both work well. Luong more common now.',
      },
      {
        question: 'How does attention solve the bottleneck problem?',
        answer: 'Vanilla seq2seq: Encoder compresses entire input into single fixed-size vector (bottleneck). Long sequences lose information. Attention: Decoder accesses all encoder states directly. No compression bottleneck. Can focus on relevant parts. Especially important for long sequences. Attention weights show alignment between input and output.',
      },
      {
        question: 'What is the relationship between this attention and transformer attention?',
        answer: 'This is encoder-decoder attention (cross-attention). Transformer generalized it: 1) Self-attention (attend to same sequence), 2) Multi-head (multiple attention in parallel), 3) Scaled dot-product (divide by √d_k). Core idea same: weighted sum based on relevance. Transformer made attention the primary mechanism, not just an add-on to RNN.',
      },
    ],
    commonMistakes: [
      'Not normalizing attention scores (use softmax)',
      'Confusing with self-attention',
      'Not visualizing attention weights (useful for debugging)',
      'Using attention with very short sequences (overhead not worth it)',
    ],
    relatedTopics: ['Seq2Seq', 'Self-Attention', 'Transformer', 'Machine Translation'],
  },
];