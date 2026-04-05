// Interview Deep Dives - Part 6
// Activation Functions, Fine-Tuning, Embeddings

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART6: DeepDiveTopic[] = [
  {
    id: 'act-1',
    title: 'ReLU (Rectified Linear Unit)',
    category: 'Activation Functions',
    difficulty: 'Beginner',
    concept: 'ReLU is the most popular activation function: f(x) = max(0, x). It introduces non-linearity while being computationally efficient and avoiding vanishing gradients for positive values.',
    howItWorks: [
      {
        step: 'Apply threshold',
        explanation: 'For each neuron output x: if x > 0, output x; if x ≤ 0, output 0. Simple element-wise operation.',
      },
      {
        step: 'Forward pass',
        explanation: 'Positive values pass through unchanged. Negative values become zero. This creates sparsity (many zeros).',
      },
      {
        step: 'Backward pass',
        explanation: 'Gradient: 1 if x > 0, else 0. Dead neurons (always negative) have zero gradient and stop learning.',
      },
    ],
    intuition: 'ReLU is like a one-way valve. Positive signals flow through unchanged, negative signals are blocked. This simple rule creates powerful non-linear transformations while being fast to compute.',
    whenToUse: [
      'Default choice for hidden layers in deep networks',
      'CNNs (convolutional neural networks)',
      'When training deep networks (>10 layers)',
      'When you want fast training',
    ],
    tradeoffs: {
      pros: [
        'Computationally efficient (just thresholding)',
        'Avoids vanishing gradient for positive values',
        'Induces sparsity (many zeros)',
        'Empirically works very well',
      ],
      cons: [
        'Dying ReLU problem (neurons stuck at 0)',
        'Not zero-centered (can slow convergence)',
        'Unbounded output (can explode)',
        'Not differentiable at 0',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
import matplotlib.pyplot as plt

# ReLU implementation
class SimpleReLU(nn.Module):
    def forward(self, x):
        return torch.maximum(x, torch.zeros_like(x))

# PyTorch built-in
relu = nn.ReLU()

# Example
x = torch.linspace(-3, 3, 100)
y = relu(x)

plt.plot(x.numpy(), y.numpy())
plt.xlabel('Input')
plt.ylabel('Output')
plt.title('ReLU Activation')
plt.grid(True)
plt.show()

# Dying ReLU example
model = nn.Sequential(
    nn.Linear(10, 100),
    nn.ReLU(),
    nn.Linear(100, 1)
)

# Check dead neurons after training
with torch.no_grad():
    x = torch.randn(1000, 10)
    activations = model[0](x)
    activations = model[1](activations)
    
    # Count neurons that are always zero
    dead_neurons = (activations.max(dim=0)[0] == 0).sum()
    print(f"Dead neurons: {dead_neurons}/100")

# Variants
leaky_relu = nn.LeakyReLU(negative_slope=0.01)  # f(x) = max(0.01x, x)
elu = nn.ELU(alpha=1.0)  # Smooth at 0
gelu = nn.GELU()  # Used in transformers`,
      explanation: 'ReLU is simple but effective. Dying ReLU occurs when neurons always output negative values (gradient=0). Variants like Leaky ReLU, ELU, and GELU address this. GELU is popular in transformers.',
    },
    visualAnalogy: 'ReLU is like a bouncer at a club. Positive vibes (positive values) get in unchanged. Negative vibes (negative values) are turned away (set to zero). Simple rule, but effective at filtering.',
    interviewQuestions: [
      {
        question: 'What is the dying ReLU problem?',
        answer: 'Dying ReLU: neurons that always output 0 because their weighted sum is always negative. Gradient is 0, so they never update. Causes: large learning rate (weights become very negative), poor initialization, or data distribution. Once dead, neurons stay dead. Solution: use Leaky ReLU (small negative slope), lower learning rate, better initialization (He initialization), or use ELU/GELU.',
      },
      {
        question: 'Why does ReLU work better than sigmoid for deep networks?',
        answer: 'Sigmoid has vanishing gradient problem: gradient is max 0.25, gets multiplied through layers, becomes tiny in deep networks. ReLU gradient is 1 for positive values - no vanishing. Also, ReLU is faster (no exp computation), induces sparsity (many zeros), and empirically trains faster. Sigmoid still used for output layer in binary classification.',
      },
      {
        question: 'What is GELU and why is it used in transformers?',
        answer: 'GELU (Gaussian Error Linear Unit): f(x) = x × Φ(x), where Φ is Gaussian CDF. Smooth approximation: 0.5x(1 + tanh(√(2/π)(x + 0.044715x³))). Unlike ReLU, it\'s smooth everywhere and has non-zero gradient for negative values. Used in BERT, GPT because: 1) smooth (better optimization), 2) stochastic regularization effect, 3) empirically better for transformers. Slightly slower than ReLU.',
      },
    ],
    commonMistakes: [
      'Using ReLU in output layer (use sigmoid/softmax)',
      'Not monitoring for dead neurons',
      'Using too large learning rate (causes dying ReLU)',
      'Not trying variants (Leaky ReLU, ELU) when ReLU fails',
      'Forgetting ReLU is not differentiable at 0 (usually not an issue)',
    ],
    relatedTopics: ['Leaky ReLU', 'ELU', 'GELU', 'Sigmoid', 'Tanh', 'Swish'],
  },
  {
    id: 'finetune-1',
    title: 'LoRA (Low-Rank Adaptation)',
    category: 'Fine-Tuning',
    difficulty: 'Advanced',
    concept: 'LoRA fine-tunes large models by training small low-rank matrices that are added to frozen pre-trained weights. It dramatically reduces trainable parameters (10,000x fewer) while maintaining performance.',
    howItWorks: [
      {
        step: 'Freeze pre-trained weights',
        explanation: 'Keep original model weights W frozen (no gradients). For a weight matrix W of shape (d×k), freeze all parameters.',
      },
      {
        step: 'Add low-rank decomposition',
        explanation: 'Add trainable matrices: ΔW = BA, where B is (d×r) and A is (r×k). r is rank (typically 4-64), much smaller than d,k. Only train B and A.',
      },
      {
        step: 'Forward pass',
        explanation: 'Output = (W + BA)x = Wx + BAx. Compute frozen path Wx and trainable path BAx separately, then add.',
      },
      {
        step: 'Training',
        explanation: 'Only compute gradients for B and A. Memory and compute scale with r, not full model size. Can train on single GPU.',
      },
      {
        step: 'Inference',
        explanation: 'Merge weights: W\' = W + BA. No additional inference cost. Can swap LoRA adapters for different tasks.',
      },
    ],
    intuition: 'LoRA is like editing a book by adding sticky notes instead of rewriting pages. The original text (pre-trained weights) stays frozen. Your edits (low-rank matrices) are small additions. You can have multiple sets of sticky notes for different purposes.',
    whenToUse: [
      'Fine-tuning large language models (LLaMA, GPT)',
      'When you have limited compute/memory',
      'Multi-task learning (different LoRA for each task)',
      'When you want to preserve pre-trained knowledge',
    ],
    tradeoffs: {
      pros: [
        'Drastically fewer parameters (0.01% of full model)',
        'Much less memory (can train on consumer GPUs)',
        'Faster training',
        'Can swap adapters for different tasks',
        'Preserves pre-trained knowledge',
      ],
      cons: [
        'Slightly lower performance than full fine-tuning',
        'Requires choosing rank r (hyperparameter)',
        'Not all layers benefit equally',
        'May not work for very different domains',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# Load base model
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Configure LoRA
lora_config = LoraConfig(
    r=8,  # Rank
    lora_alpha=32,  # Scaling factor
    target_modules=["c_attn", "c_proj"],  # Which layers to adapt
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)

# Apply LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 294,912 || all params: 124,439,808 || trainable%: 0.24%

# Manual LoRA implementation
class LoRALayer(nn.Module):
    def __init__(self, in_features, out_features, rank=4, alpha=32):
        super().__init__()
        self.rank = rank
        self.alpha = alpha
        
        # Low-rank matrices
        self.lora_A = nn.Parameter(torch.randn(in_features, rank) * 0.01)
        self.lora_B = nn.Parameter(torch.zeros(rank, out_features))
        
        # Scaling
        self.scaling = alpha / rank
    
    def forward(self, x, original_weight):
        # Original path (frozen)
        output = torch.matmul(x, original_weight)
        
        # LoRA path (trainable)
        lora_output = torch.matmul(torch.matmul(x, self.lora_A), self.lora_B)
        
        return output + lora_output * self.scaling

# Training
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
# Only LoRA parameters have gradients

# Merge for inference
merged_model = model.merge_and_unload()  # W' = W + BA`,
      explanation: 'PEFT library makes LoRA easy. Manually, you add low-rank matrices to attention layers. The scaling factor alpha/r controls adaptation strength. After training, merge weights for efficient inference.',
    },
    visualAnalogy: 'LoRA is like customizing a car. Instead of rebuilding the engine (full fine-tuning), you add a small performance chip (low-rank adapter). The chip modifies behavior with minimal changes. You can swap chips for different driving modes (tasks).',
    interviewQuestions: [
      {
        question: 'Why does LoRA work despite having so few parameters?',
        answer: 'LoRA exploits the low intrinsic dimensionality of adaptation. Research shows fine-tuning updates have low "intrinsic rank" - most changes lie in a low-dimensional subspace. By constraining updates to rank-r matrices, LoRA captures essential adaptations while ignoring noise. The pre-trained model already has most knowledge; fine-tuning makes small adjustments. Empirically, r=4-8 often sufficient.',
      },
      {
        question: 'How do you choose the rank r in LoRA?',
        answer: 'Trade-off: higher r = more capacity but more parameters. Guidelines: Start with r=8 (good default), increase to 16-32 for complex tasks or domain shift, decrease to 4 for simple tasks. Monitor validation loss - if underfitting, increase r. Typical range: 4-64. Also tune alpha (scaling): alpha=2r is common. Some layers benefit from higher rank than others.',
      },
      {
        question: 'LoRA vs full fine-tuning - when to use which?',
        answer: 'LoRA: Limited compute/memory, similar domain to pre-training, need multiple task adapters, want fast iteration. Full fine-tuning: Very different domain, maximum performance needed, sufficient compute, single task. LoRA typically achieves 95-99% of full fine-tuning performance with 0.1% parameters. For most applications, LoRA is preferred due to efficiency.',
      },
    ],
    commonMistakes: [
      'Applying LoRA to all layers (focus on attention)',
      'Using too high rank (defeats purpose)',
      'Not tuning alpha scaling factor',
      'Forgetting to merge weights for inference',
      'Not freezing base model weights',
    ],
    relatedTopics: ['QLoRA', 'Adapter Layers', 'Prefix Tuning', 'Prompt Tuning', 'PEFT'],
  },
  {
    id: 'embed-1',
    title: 'Word Embeddings (Word2Vec, GloVe)',
    category: 'Embeddings',
    difficulty: 'Intermediate',
    concept: 'Word embeddings map words to dense vectors where semantic similarity is captured by vector proximity. Words with similar meanings have similar vectors, enabling arithmetic like "king - man + woman ≈ queen".',
    howItWorks: [
      {
        step: 'Build vocabulary',
        explanation: 'Create vocabulary from corpus. Each word gets unique ID. Typically 10K-100K words.',
      },
      {
        step: 'Initialize embeddings',
        explanation: 'Create embedding matrix (vocab_size × embedding_dim). Initialize randomly. Typical dimensions: 100-300.',
      },
      {
        step: 'Training objective',
        explanation: 'Word2Vec: Predict context from word (Skip-gram) or word from context (CBOW). GloVe: Factorize word co-occurrence matrix. Both learn similar representations.',
      },
      {
        step: 'Optimization',
        explanation: 'Update embeddings via gradient descent. Words appearing in similar contexts get similar vectors. Train on large corpus (Wikipedia, Common Crawl).',
      },
      {
        step: 'Use embeddings',
        explanation: 'Look up word vector from embedding matrix. Use as input to downstream models. Can compute similarity with cosine distance.',
      },
    ],
    intuition: 'Word embeddings are like a map where similar words are close together. "Cat" and "dog" are near each other (both animals), far from "car". The map is learned from how words are used in text - words in similar contexts get similar positions.',
    whenToUse: [
      'NLP tasks (classification, NER, sentiment)',
      'When you need semantic similarity',
      'As input features for neural networks',
      'For transfer learning (pre-trained embeddings)',
    ],
    tradeoffs: {
      pros: [
        'Captures semantic relationships',
        'Dense representation (vs sparse one-hot)',
        'Transfer learning (use pre-trained)',
        'Enables word arithmetic',
      ],
      cons: [
        'Fixed vocabulary (OOV problem)',
        'One vector per word (no context)',
        'Can encode biases from training data',
        'Superseded by contextual embeddings (BERT)',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity

# Train Word2Vec
sentences = [
    ["cat", "sat", "on", "mat"],
    ["dog", "sat", "on", "floor"],
    ["cat", "and", "dog", "are", "animals"]
]

model = Word2Vec(
    sentences,
    vector_size=100,  # Embedding dimension
    window=5,  # Context window
    min_count=1,
    sg=1  # Skip-gram (1) or CBOW (0)
)

# Get word vector
cat_vector = model.wv['cat']
print(f"Cat vector shape: {cat_vector.shape}")

# Find similar words
similar = model.wv.most_similar('cat', topn=3)
print(f"Similar to 'cat': {similar}")

# Word arithmetic
result = model.wv.most_similar(
    positive=['king', 'woman'],
    negative=['man'],
    topn=1
)
print(f"king - man + woman = {result}")

# PyTorch embedding layer
vocab_size = 10000
embedding_dim = 300

embedding = nn.Embedding(vocab_size, embedding_dim)

# Load pre-trained (e.g., GloVe)
# embedding.weight.data.copy_(pretrained_vectors)

# Use in model
word_ids = torch.tensor([1, 5, 10])  # Word IDs
word_vectors = embedding(word_ids)  # (3, 300)

# Compute similarity
def cosine_sim(v1, v2):
    return torch.dot(v1, v2) / (torch.norm(v1) * torch.norm(v2))

sim = cosine_sim(word_vectors[0], word_vectors[1])
print(f"Similarity: {sim.item():.4f}")`,
      explanation: 'Gensim makes training Word2Vec easy. PyTorch\'s nn.Embedding is a lookup table. Pre-trained embeddings (GloVe, FastText) can be loaded. Cosine similarity measures semantic similarity.',
    },
    visualAnalogy: 'Word embeddings are like a personality test that maps people to points in space. People with similar personalities are close together. You can do math: "extrovert - loud + quiet ≈ introvert". The positions are learned from observing behavior (word usage).',
    interviewQuestions: [
      {
        question: 'Explain Skip-gram vs CBOW in Word2Vec',
        answer: 'Skip-gram: Given center word, predict context words. Example: "cat sat on mat" → given "on", predict "cat", "sat", "mat". CBOW (Continuous Bag of Words): Given context, predict center word. Example: given "cat", "sat", "mat", predict "on". Skip-gram works better for rare words and larger datasets. CBOW is faster and better for frequent words. Skip-gram is more popular.',
      },
      {
        question: 'What is the OOV (Out-of-Vocabulary) problem?',
        answer: 'OOV: words not in training vocabulary have no embedding. Solutions: 1) Use subword embeddings (FastText, BPE) - represent words as sum of character n-grams, 2) Use <UNK> token for all OOV words, 3) Use contextual embeddings (BERT) which handle any text via tokenization. FastText is popular because it handles typos and rare words by using character n-grams.',
      },
      {
        question: 'Why are contextual embeddings (BERT) better than Word2Vec?',
        answer: 'Word2Vec: one vector per word, no context. "bank" (river) and "bank" (money) have same vector. BERT: different vectors based on context. "I sat by the river bank" vs "I went to the bank" get different embeddings. BERT captures polysemy, syntax, and long-range dependencies. Trade-off: BERT is much slower and larger. Word2Vec still useful for simple tasks or when speed matters.',
      },
    ],
    commonMistakes: [
      'Not normalizing embeddings before computing similarity',
      'Using embeddings trained on different domain',
      'Not handling OOV words',
      'Thinking word arithmetic always works (it\'s approximate)',
      'Not fine-tuning embeddings for downstream task',
    ],
    relatedTopics: ['FastText', 'GloVe', 'Contextual Embeddings', 'Sentence Embeddings', 'BERT Embeddings'],
  },
  {
    id: 'act-2',
    title: 'Softmax Activation',
    category: 'Activation Functions',
    difficulty: 'Beginner',
    concept: 'Softmax converts a vector of real numbers into a probability distribution. Each output is between 0 and 1, and they sum to 1. It\'s the standard activation for multi-class classification output layers.',
    howItWorks: [
      {
        step: 'Compute exponentials',
        explanation: 'For each logit z_i, compute exp(z_i). This makes all values positive.',
      },
      {
        step: 'Normalize',
        explanation: 'Divide each exp(z_i) by sum of all exponentials: softmax(z_i) = exp(z_i) / Σexp(z_j). This ensures outputs sum to 1.',
      },
      {
        step: 'Interpret as probabilities',
        explanation: 'Each output represents probability of that class. Highest probability is predicted class.',
      },
    ],
    intuition: 'Softmax is like converting test scores to percentages. If you score 90, 80, 70 on three tests, softmax converts them to probabilities that sum to 100%. Higher scores get higher probabilities, but all are represented.',
    whenToUse: [
      'Multi-class classification output layer',
      'Attention mechanisms (attention weights)',
      'When you need probability distribution',
      'Language modeling (next token prediction)',
    ],
    tradeoffs: {
      pros: [
        'Outputs valid probability distribution',
        'Differentiable (good for backprop)',
        'Amplifies differences (high scores get higher probability)',
        'Interpretable as probabilities',
      ],
      cons: [
        'Computationally expensive (exponentials)',
        'Can overflow/underflow (need numerical stability)',
        'Sensitive to outliers',
        'Not suitable for multi-label (use sigmoid)',
      ],
    },
    visualAnalogy: 'Softmax is like a popularity contest. Everyone gets votes (logits), but we convert to percentages. The most popular person gets the highest percentage, but everyone gets some representation. Total is always 100%.',
    interviewQuestions: [
      {
        question: 'Why use softmax instead of just normalizing logits?',
        answer: 'Simple normalization: divide by sum. Problem: negative values, doesn\'t emphasize differences. Softmax: exp() makes all positive, amplifies differences (exp is convex). Example: logits [1, 2, 3] → simple norm [0.17, 0.33, 0.50], softmax [0.09, 0.24, 0.67]. Softmax gives more confident predictions. Also, exp() has nice mathematical properties for cross-entropy loss.',
      },
      {
        question: 'What is the temperature parameter in softmax?',
        answer: 'Temperature T: softmax(z_i/T). T=1: standard softmax. T>1: softer distribution (more uniform). T<1: sharper distribution (more confident). T→∞: uniform distribution. T→0: one-hot (argmax). Used in: knowledge distillation (T>1 reveals teacher uncertainty), sampling (T controls randomness), calibration. Higher T = more exploration, lower T = more exploitation.',
      },
      {
        question: 'How to implement softmax numerically stable?',
        answer: 'Problem: exp(large number) overflows. Solution: subtract max before exp. softmax(z_i) = exp(z_i - max(z)) / Σexp(z_j - max(z)). This shifts all values down, preventing overflow. Mathematically equivalent (max cancels out). Always use this in practice. PyTorch/TensorFlow do this automatically. Also combine with log for log-softmax (more stable for cross-entropy).',
      },
    ],
    commonMistakes: [
      'Using softmax for multi-label classification (use sigmoid)',
      'Not using numerical stability trick',
      'Applying softmax before CrossEntropyLoss (it\'s included)',
      'Confusing softmax with sigmoid',
    ],
    relatedTopics: ['Cross-Entropy Loss', 'Sigmoid', 'Temperature Scaling', 'Log-Softmax'],
  },
  {
    id: 'finetune-2',
    title: 'Prompt Tuning',
    category: 'Fine-Tuning',
    difficulty: 'Advanced',
    concept: 'Prompt tuning learns continuous prompt embeddings while keeping the model frozen. It\'s parameter-efficient fine-tuning that adds learnable "soft prompts" to the input, achieving competitive performance with <0.01% trainable parameters.',
    howItWorks: [
      {
        step: 'Freeze model',
        explanation: 'Keep all model parameters frozen. No gradients for model weights.',
      },
      {
        step: 'Add soft prompts',
        explanation: 'Prepend k learnable embedding vectors to input. These are "soft prompts" (continuous, not discrete tokens). Typically k=20-100.',
      },
      {
        step: 'Forward pass',
        explanation: 'Input: [soft_prompt_1, ..., soft_prompt_k, token_1, ..., token_n]. Model processes combined sequence.',
      },
      {
        step: 'Train prompts',
        explanation: 'Only update soft prompt embeddings via backprop. Model weights stay frozen. Very few parameters to train.',
      },
    ],
    intuition: 'Prompt tuning is like giving instructions to a frozen expert. You can\'t change the expert (model), but you can craft perfect instructions (soft prompts) to get desired behavior. The instructions are learned, not hand-written.',
    whenToUse: [
      'Fine-tuning very large models (>10B parameters)',
      'Multi-task learning (different prompts per task)',
      'When you have limited compute',
      'When you want to preserve pre-trained knowledge',
    ],
    tradeoffs: {
      pros: [
        'Extremely parameter-efficient (<0.01%)',
        'Fast training',
        'Easy to swap prompts for different tasks',
        'Preserves pre-trained model',
      ],
      cons: [
        'Lower performance than full fine-tuning',
        'Requires large models (works better at scale)',
        'Harder to interpret than discrete prompts',
        'Requires choosing prompt length',
      ],
    },
    visualAnalogy: 'Prompt tuning is like training a dog with a frozen brain. You can\'t change how the dog thinks, but you can learn the perfect whistle (soft prompt) to trigger desired behavior. Different whistles for different tricks.',
    interviewQuestions: [
      {
        question: 'Prompt tuning vs prompt engineering - what\'s the difference?',
        answer: 'Prompt engineering: Manually craft discrete text prompts ("Translate English to French:"). Trial and error, no training. Prompt tuning: Learn continuous prompt embeddings via gradient descent. Automatic, optimized for task. Prompt tuning often outperforms manual prompts. Trade-off: prompt tuning requires training data and compute, prompt engineering is zero-shot.',
      },
      {
        question: 'Why does prompt tuning work better on larger models?',
        answer: 'Small models (<1B): Prompt tuning underperforms full fine-tuning significantly. Large models (>10B): Prompt tuning approaches full fine-tuning performance. Hypothesis: Larger models have more "knowledge" in frozen weights, just need right prompt to access it. Small models need weight updates to learn task. Empirically, prompt tuning scales better than expected.',
      },
      {
        question: 'How does prompt tuning compare to LoRA?',
        answer: 'Prompt tuning: Add learnable embeddings to input, freeze all weights. ~0.01% parameters. LoRA: Add low-rank matrices to attention layers, freeze base weights. ~0.1-1% parameters. LoRA typically better performance but more parameters. Prompt tuning simpler, easier to swap. Can combine both. Choice depends on model size and performance requirements.',
      },
    ],
    commonMistakes: [
      'Using prompt tuning on small models (doesn\'t work well)',
      'Not initializing prompts properly (random is okay, but task-specific better)',
      'Using too few or too many prompt tokens',
      'Expecting same performance as full fine-tuning',
    ],
    relatedTopics: ['LoRA', 'Prefix Tuning', 'P-Tuning', 'PEFT', 'Prompt Engineering'],
  },
];