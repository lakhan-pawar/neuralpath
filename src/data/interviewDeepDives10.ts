// Interview Deep Dives - Part 10
// Data Augmentation, Regularization, Practical ML

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART10: DeepDiveTopic[] = [
  {
    id: 'aug-1',
    title: 'Data Augmentation',
    category: 'Training Techniques',
    difficulty: 'Beginner',
    concept: 'Data augmentation artificially increases training data by applying transformations that preserve labels. It improves generalization by exposing the model to variations, acting as regularization.',
    howItWorks: [
      {
        step: 'Choose transformations',
        explanation: 'Select label-preserving transformations: rotation, flip, crop, color jitter for images; synonym replacement, back-translation for text.',
      },
      {
        step: 'Apply during training',
        explanation: 'Apply random transformations to each training sample on-the-fly. Different augmentation each epoch.',
      },
      {
        step: 'Train model',
        explanation: 'Model learns invariances from augmented data. Sees same image rotated, flipped, cropped - learns these don\'t change the label.',
      },
      {
        step: 'No augmentation at test',
        explanation: 'Use original data for validation and testing. Augmentation only during training.',
      },
    ],
    intuition: 'Data augmentation is like practicing with variations. If learning to recognize cats, you practice with cats in different poses, lighting, angles. This makes you better at recognizing cats in new situations, not just memorizing training examples.',
    whenToUse: [
      'Limited training data',
      'To improve generalization',
      'Computer vision (very common)',
      'NLP tasks (with appropriate augmentations)',
    ],
    tradeoffs: {
      pros: [
        'Increases effective dataset size',
        'Improves generalization',
        'Acts as regularization',
        'Often significant performance boost',
      ],
      cons: [
        'Increases training time',
        'Wrong augmentations can hurt performance',
        'May not preserve labels if done incorrectly',
        'Requires domain knowledge',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
from torchvision import transforms
from PIL import Image
import albumentations as A
from albumentations.pytorch import ToTensorV2

# PyTorch transforms for images
train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# No augmentation for validation
val_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Albumentations (more advanced)
train_aug = A.Compose([
    A.RandomResizedCrop(224, 224),
    A.HorizontalFlip(p=0.5),
    A.ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, rotate_limit=15, p=0.5),
    A.OneOf([
        A.GaussNoise(),
        A.GaussianBlur(),
        A.MotionBlur(),
    ], p=0.3),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2()
])

# NLP augmentation
import nlpaug.augmenter.word as naw

# Synonym replacement
aug = naw.SynonymAug(aug_src='wordnet')
text = "The movie was fantastic"
augmented = aug.augment(text)
print(f"Original: {text}")
print(f"Augmented: {augmented}")

# Back-translation
from transformers import MarianMTModel, MarianTokenizer

def back_translate(text, src_lang='en', pivot_lang='fr'):
    # Translate to pivot language and back
    model_name_forward = f'Helsinki-NLP/opus-mt-{src_lang}-{pivot_lang}'
    model_name_back = f'Helsinki-NLP/opus-mt-{pivot_lang}-{src_lang}'
    
    # Forward translation
    tokenizer = MarianTokenizer.from_pretrained(model_name_forward)
    model = MarianMTModel.from_pretrained(model_name_forward)
    translated = model.generate(**tokenizer(text, return_tensors="pt"))
    pivot_text = tokenizer.decode(translated[0], skip_special_tokens=True)
    
    # Back translation
    tokenizer = MarianTokenizer.from_pretrained(model_name_back)
    model = MarianMTModel.from_pretrained(model_name_back)
    back_translated = model.generate(**tokenizer(pivot_text, return_tensors="pt"))
    return tokenizer.decode(back_translated[0], skip_special_tokens=True)

# MixUp augmentation
def mixup_data(x, y, alpha=1.0):
    """MixUp: mix two samples"""
    lam = np.random.beta(alpha, alpha)
    batch_size = x.size(0)
    index = torch.randperm(batch_size)
    
    mixed_x = lam * x + (1 - lam) * x[index]
    y_a, y_b = y, y[index]
    return mixed_x, y_a, y_b, lam`,
      explanation: 'PyTorch and Albumentations provide image augmentation. For NLP, use synonym replacement, back-translation, or paraphrasing. MixUp mixes samples for stronger regularization. Choose augmentations that preserve labels.',
    },
    visualAnalogy: 'Data augmentation is like learning to drive. You don\'t just practice on one road in perfect weather. You practice in rain, at night, on different roads. This makes you a better driver in all conditions, not just the ones you practiced.',
    interviewQuestions: [
      {
        question: 'What augmentations are appropriate for different tasks?',
        answer: 'Images: rotation, flip, crop, color jitter (general), cutout/mixup (advanced). Text: synonym replacement, back-translation, paraphrasing. Time series: jittering, scaling, window slicing. Audio: time stretch, pitch shift, noise. Key: preserve labels. Don\'t flip digits (6→9), don\'t rotate text, don\'t change sentiment. Domain knowledge crucial.',
      },
      {
        question: 'What is MixUp and how does it work?',
        answer: 'MixUp: Create virtual training examples by mixing pairs. x_mixed = λx_i + (1-λ)x_j, y_mixed = λy_i + (1-λ)y_j, where λ ~ Beta(α,α). Example: mix cat (λ=0.7) and dog (0.3) images, label is 70% cat, 30% dog. Benefits: smoother decision boundaries, better calibration, regularization. Works surprisingly well despite creating unrealistic samples. Used in vision and audio.',
      },
      {
        question: 'When can data augmentation hurt performance?',
        answer: 'Wrong augmentations: flipping medical images (left/right matters), rotating text, changing sentiment. Too aggressive: extreme distortions make samples unrecognizable. Task-specific: augmentation for classification may not work for detection (bounding boxes need adjustment). Small models: may not have capacity to learn invariances. Always validate that augmentations improve performance.',
      },
    ],
    commonMistakes: [
      'Using same augmentation for train and validation',
      'Augmentations that change labels',
      'Too aggressive augmentation (unrecognizable samples)',
      'Not considering task-specific constraints',
      'Applying augmentation after normalization (wrong order)',
    ],
    relatedTopics: ['MixUp', 'CutMix', 'AutoAugment', 'RandAugment', 'Regularization'],
  },
  {
    id: 'reg-1',
    title: 'L1 and L2 Regularization',
    category: 'Regularization',
    difficulty: 'Beginner',
    concept: 'L1 and L2 regularization add penalty terms to the loss function to discourage large weights. L2 (weight decay) penalizes squared weights, L1 (Lasso) penalizes absolute weights, promoting sparsity.',
    howItWorks: [
      {
        step: 'Add penalty to loss',
        explanation: 'L2: Loss = Task_Loss + λ × Σw². L1: Loss = Task_Loss + λ × Σ|w|. λ controls regularization strength.',
      },
      {
        step: 'Gradient computation',
        explanation: 'L2 gradient: ∂Loss/∂w = ∂Task_Loss/∂w + 2λw. L1 gradient: ∂Loss/∂w = ∂Task_Loss/∂w + λ × sign(w).',
      },
      {
        step: 'Weight update',
        explanation: 'L2: w = w - lr × (gradient + 2λw) = (1-2λlr)w - lr×gradient. This shrinks weights. L1: Pushes weights toward zero.',
      },
      {
        step: 'Effect on model',
        explanation: 'L2: All weights shrink proportionally. L1: Some weights become exactly zero (sparsity).',
      },
    ],
    intuition: 'Regularization is like a budget constraint. L2 says "keep all expenses small". L1 says "eliminate unnecessary expenses entirely". L2 spreads the budget, L1 focuses it on important items.',
    whenToUse: [
      'When model is overfitting',
      'L2: Default choice, works for most tasks',
      'L1: When you want feature selection (sparse weights)',
      'Elastic Net: Combine L1 and L2',
    ],
    tradeoffs: {
      pros: [
        'Reduces overfitting',
        'Simple to implement',
        'L1 provides feature selection',
        'Widely understood',
      ],
      cons: [
        'Adds hyperparameter λ to tune',
        'May underfit if λ too large',
        'L1 can be unstable (non-differentiable at 0)',
        'Not as effective as dropout for deep networks',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(10, 1)

# L2 regularization (weight decay)
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=0.01)  # λ=0.01

# Manual L2 regularization
def l2_regularization(model, lambda_l2=0.01):
    l2_loss = 0
    for param in model.parameters():
        l2_loss += torch.sum(param ** 2)
    return lambda_l2 * l2_loss

# Training with L2
for batch in dataloader:
    x, y = batch
    
    optimizer.zero_grad()
    output = model(x)
    task_loss = nn.functional.mse_loss(output, y)
    
    # Option 1: Use weight_decay in optimizer (recommended)
    loss = task_loss
    
    # Option 2: Manual L2 (equivalent)
    # loss = task_loss + l2_regularization(model, lambda_l2=0.01)
    
    loss.backward()
    optimizer.step()

# L1 regularization (manual)
def l1_regularization(model, lambda_l1=0.01):
    l1_loss = 0
    for param in model.parameters():
        l1_loss += torch.sum(torch.abs(param))
    return lambda_l1 * l1_loss

# Training with L1
optimizer = optim.Adam(model.parameters(), lr=0.001)  # No weight_decay

for batch in dataloader:
    x, y = batch
    
    optimizer.zero_grad()
    output = model(x)
    task_loss = nn.functional.mse_loss(output, y)
    
    # Add L1 penalty
    loss = task_loss + l1_regularization(model, lambda_l1=0.01)
    
    loss.backward()
    optimizer.step()

# Elastic Net (L1 + L2)
def elastic_net_regularization(model, lambda_l1=0.01, lambda_l2=0.01):
    l1_loss = sum(torch.sum(torch.abs(param)) for param in model.parameters())
    l2_loss = sum(torch.sum(param ** 2) for param in model.parameters())
    return lambda_l1 * l1_loss + lambda_l2 * l2_loss

# Check sparsity after L1 training
total_params = sum(p.numel() for p in model.parameters())
zero_params = sum((p.abs() < 1e-6).sum().item() for p in model.parameters())
print(f"Sparsity: {zero_params/total_params:.2%}")`,
      explanation: 'PyTorch\'s weight_decay implements L2 regularization efficiently. L1 requires manual implementation. Elastic Net combines both. L1 creates sparse weights (many exactly zero), useful for feature selection.',
    },
    visualAnalogy: 'L1 and L2 are like two approaches to decluttering. L2: make everything smaller (shrink all items). L1: throw away unnecessary items (set to zero). L2 keeps everything but smaller, L1 eliminates clutter entirely.',
    interviewQuestions: [
      {
        question: 'Why does L1 create sparse weights but L2 doesn\'t?',
        answer: 'L2 gradient: 2λw (proportional to weight). Large weights shrink more, small weights shrink less, but never reach exactly zero. L1 gradient: λ × sign(w) (constant). All weights shrink by same amount regardless of size. Small weights can reach zero and stay there. Geometrically: L1 has corners at axes (sparse solutions), L2 is smooth (no sparsity).',
      },
      {
        question: 'What is weight decay and how does it relate to L2?',
        answer: 'Weight decay: multiply weights by (1-λ) each step, equivalent to w = w - λw. L2 regularization: add λΣw² to loss, gradient is 2λw. With learning rate α: w = w - α(gradient + 2λw) = (1-2αλ)w - α×gradient. Weight decay and L2 are equivalent for SGD. For Adam, they differ slightly - AdamW decouples them for better performance.',
      },
      {
        question: 'When would you use L1 vs L2 vs Elastic Net?',
        answer: 'L2: Default choice, works well for most tasks, all features contribute. L1: Want feature selection (sparse model), interpretability, many irrelevant features. Elastic Net: Combine benefits, when features are correlated (L1 picks one, L2 averages). Deep learning: L2 (weight decay) is standard, dropout often more effective than L1. Linear models: L1/Elastic Net useful for feature selection.',
      },
    ],
    commonMistakes: [
      'Using weight_decay with Adam (use AdamW instead)',
      'Setting λ too high (underfitting)',
      'Not tuning λ (it\'s important hyperparameter)',
      'Applying regularization to bias terms (usually not needed)',
      'Confusing L1/L2 regularization with L1/L2 loss',
    ],
    relatedTopics: ['Dropout', 'Early Stopping', 'Elastic Net', 'AdamW', 'Feature Selection'],
  },
  {
    id: 'practical-1',
    title: 'Learning Rate Warmup',
    category: 'Training Techniques',
    difficulty: 'Intermediate',
    concept: 'Learning rate warmup gradually increases the learning rate from a small value to the target value over the first few epochs or steps. It stabilizes training, especially for large models and large batch sizes.',
    howItWorks: [
      {
        step: 'Start with small learning rate',
        explanation: 'Begin with LR much smaller than target (e.g., 1e-7 if target is 1e-4).',
      },
      {
        step: 'Gradually increase',
        explanation: 'Linearly or exponentially increase LR over warmup period (e.g., 4000 steps or 5 epochs).',
      },
      {
        step: 'Reach target LR',
        explanation: 'After warmup, LR reaches target value. Then apply normal schedule (constant, decay, cosine).',
      },
      {
        step: 'Continue training',
        explanation: 'Train with target LR and chosen schedule for remaining epochs.',
      },
    ],
    intuition: 'Warmup is like warming up before exercise. You don\'t sprint immediately - you start slow and gradually increase intensity. This prevents injury (training instability). Once warmed up, you can go full speed.',
    whenToUse: [
      'Training transformers (BERT, GPT)',
      'Large batch sizes (>1024)',
      'When training is unstable early on',
      'Adam optimizer with large models',
    ],
    tradeoffs: {
      pros: [
        'Stabilizes training',
        'Prevents early divergence',
        'Allows higher learning rates',
        'Standard for transformers',
      ],
      cons: [
        'Adds hyperparameter (warmup steps)',
        'Slightly slower initial progress',
        'May not be needed for small models',
      ],
    },
    visualAnalogy: 'Warmup is like starting a car in winter. You don\'t immediately drive at highway speed - you let the engine warm up first. This prevents damage and ensures smooth operation. Once warm, you can drive normally.',
    interviewQuestions: [
      {
        question: 'Why is warmup important for transformers?',
        answer: 'Transformers are sensitive to large LR early in training when parameters are randomly initialized. Adam\'s adaptive learning rates can amplify this. Large LR early → gradient explosion → NaN loss. Warmup allows Adam\'s statistics (momentum, variance) to stabilize before using full LR. Typically warmup for 4000-10000 steps. Without warmup, training often diverges.',
      },
      {
        question: 'How does warmup help with large batch sizes?',
        answer: 'Large batches (>1024) have less noisy gradients but can converge to sharp minima (poor generalization). Warmup with large batches: 1) Prevents early overfitting to initial batches, 2) Allows model to explore loss landscape, 3) Enables using higher LR (linear scaling rule: LR × batch_size). Without warmup, large batch training often fails or generalizes poorly.',
      },
      {
        question: 'What are common warmup schedules?',
        answer: 'Linear: LR = (step/warmup_steps) × target_LR. Simple, most common. Exponential: LR = target_LR × (step/warmup_steps)^k. Faster initial increase. Constant then linear: Stay at low LR, then linear increase. After warmup: constant, linear decay, cosine annealing, or inverse sqrt (Transformer paper). Typical warmup: 1-10% of total training steps.',
      },
    ],
    commonMistakes: [
      'Not using warmup for transformers (training diverges)',
      'Warmup period too short or too long',
      'Not adjusting warmup for different batch sizes',
      'Using warmup when not needed (small models, small batches)',
    ],
    relatedTopics: ['Learning Rate Schedules', 'Adam Optimizer', 'Large Batch Training', 'Gradient Clipping'],
  },
  {
    id: 'reg-2',
    title: 'Early Stopping',
    category: 'Regularization',
    difficulty: 'Beginner',
    concept: 'Early stopping halts training when validation performance stops improving, preventing overfitting. It monitors validation loss/accuracy and stops after patience epochs without improvement.',
    howItWorks: [
      {
        step: 'Split data',
        explanation: 'Create train, validation, test sets. Validation used for early stopping.',
      },
      {
        step: 'Train and monitor',
        explanation: 'Train model, evaluate on validation set each epoch. Track best validation performance.',
      },
      {
        step: 'Check patience',
        explanation: 'If validation doesn\'t improve for patience epochs (e.g., 10), stop training.',
      },
      {
        step: 'Restore best model',
        explanation: 'Load model weights from epoch with best validation performance.',
      },
    ],
    intuition: 'Early stopping is like knowing when to stop studying. Initially, more study helps (training improves validation). Eventually, you memorize specific examples (overfitting). Stop when you\'re at peak understanding.',
    whenToUse: [
      'Almost all deep learning training',
      'When you don\'t know optimal number of epochs',
      'To prevent overfitting',
      'When validation set is available',
    ],
    tradeoffs: {
      pros: [
        'Simple and effective',
        'No hyperparameters (except patience)',
        'Prevents overfitting',
        'Saves training time',
      ],
      cons: [
        'Requires validation set',
        'May stop too early (noisy validation)',
        'Doesn\'t work if validation not representative',
        'Can be sensitive to patience value',
      ],
    },
    visualAnalogy: 'Early stopping is like baking cookies. You check them periodically (validation). When they stop improving and start burning (overfitting), you take them out. You don\'t wait for the timer (max epochs).',
    interviewQuestions: [
      {
        question: 'How to choose patience value?',
        answer: 'Patience: number of epochs to wait without improvement. Too small: stop too early (underfitting). Too large: overfit before stopping. Typical: 5-20 epochs. Depends on: 1) Validation noise (higher noise = more patience), 2) Training speed (fast convergence = less patience), 3) Dataset size (small data = less patience). Start with 10, adjust based on learning curves.',
      },
      {
        question: 'Should you use early stopping with learning rate schedules?',
        answer: 'Yes, but be careful. LR schedules (step decay, cosine) can cause validation to plateau then improve. Solution: 1) Use patience > schedule period, 2) Monitor for longer, 3) Use ReduceLROnPlateau (reduces LR when validation plateaus). Early stopping works well with warmup + cosine. Don\'t stop during warmup or right after LR drop.',
      },
      {
        question: 'What if validation loss increases but test performance is good?',
        answer: 'Possible causes: 1) Validation set not representative, 2) Validation too small (noisy), 3) Distribution shift. Solutions: 1) Use larger validation set, 2) Use k-fold cross-validation, 3) Monitor multiple metrics, 4) Check if validation and test distributions match. If validation unreliable, use other regularization (dropout, weight decay) and train for fixed epochs.',
      },
    ],
    commonMistakes: [
      'Not saving best model (using last epoch)',
      'Patience too small (stops too early)',
      'Using test set for early stopping (data leakage)',
      'Not considering learning rate schedule interactions',
    ],
    relatedTopics: ['Overfitting', 'Validation Set', 'Learning Rate Schedules', 'Model Selection'],
  },
  {
    id: 'practical-2',
    title: 'Gradient Clipping',
    category: 'Training Techniques',
    difficulty: 'Beginner',
    concept: 'Gradient clipping limits gradient magnitude to prevent exploding gradients. It clips gradients by norm (scale down if too large) or by value (cap at threshold), stabilizing training of deep networks and RNNs.',
    howItWorks: [
      {
        step: 'Compute gradients',
        explanation: 'Standard backpropagation computes gradients for all parameters.',
      },
      {
        step: 'Compute gradient norm',
        explanation: 'Calculate L2 norm of all gradients: ||g|| = √(Σg_i²).',
      },
      {
        step: 'Clip if necessary',
        explanation: 'If ||g|| > threshold, scale down: g = g × (threshold / ||g||). Otherwise, keep original.',
      },
      {
        step: 'Update weights',
        explanation: 'Use clipped gradients for weight update.',
      },
    ],
    intuition: 'Gradient clipping is like a speed limit. If gradients are too large (speeding), slow them down to safe level. This prevents crashes (exploding gradients) while still making progress.',
    whenToUse: [
      'Training RNNs/LSTMs (prone to exploding gradients)',
      'Very deep networks',
      'When you see NaN losses',
      'Reinforcement learning',
    ],
    tradeoffs: {
      pros: [
        'Prevents exploding gradients',
        'Stabilizes training',
        'Simple to implement',
        'Minimal computational overhead',
      ],
      cons: [
        'Adds hyperparameter (threshold)',
        'Can slow convergence if threshold too small',
        'Doesn\'t solve vanishing gradients',
        'May mask underlying issues',
      ],
    },
    visualAnalogy: 'Gradient clipping is like a surge protector. When electrical current (gradients) spikes too high, it limits the surge to safe levels. This protects your equipment (model) from damage (NaN/inf).',
    interviewQuestions: [
      {
        question: 'Clip by norm vs clip by value - what\'s the difference?',
        answer: 'Clip by norm: Scale entire gradient vector if norm exceeds threshold. Preserves gradient direction. Formula: g = g × min(1, threshold/||g||). Clip by value: Cap each gradient element independently at [-threshold, threshold]. Changes direction. Clip by norm is preferred - preserves gradient direction, more principled. Clip by value simpler but can distort gradients.',
      },
      {
        question: 'How to choose clipping threshold?',
        answer: 'Typical values: 1.0-10.0 for clip by norm. Start with 5.0. Monitor gradient norms during training. If gradients regularly hit threshold, may be too small. If NaN losses, threshold too large. Can use adaptive clipping (percentile of gradient norms). For RNNs: 1.0-5.0. For transformers: often not needed or 1.0. Tune based on training stability.',
      },
      {
        question: 'Why do RNNs need gradient clipping more than CNNs?',
        answer: 'RNNs: Gradients backpropagate through time (many steps). Gradient = product of many terms. If terms >1, gradient explodes exponentially. CNNs: Gradients backpropagate through layers, but skip connections (ResNet) and batch norm stabilize. RNNs more prone to exploding gradients. LSTM/GRU help but don\'t eliminate problem. Gradient clipping essential for RNN training.',
      },
    ],
    commonMistakes: [
      'Not using gradient clipping for RNNs',
      'Threshold too small (slow convergence)',
      'Using clip by value instead of clip by norm',
      'Not monitoring gradient norms',
    ],
    relatedTopics: ['Exploding Gradients', 'RNN Training', 'Gradient Descent', 'Training Stability'],
  },
  {
    id: 'practical-3',
    title: 'Batch Size Selection',
    category: 'Training Techniques',
    difficulty: 'Intermediate',
    concept: 'Batch size affects training dynamics, generalization, and computational efficiency. Small batches provide noisy gradients (regularization), large batches are efficient but may generalize worse. Optimal batch size balances these trade-offs.',
    howItWorks: [
      {
        step: 'Small batch (8-32)',
        explanation: 'Noisy gradients, more updates per epoch, better generalization, slower per-epoch.',
      },
      {
        step: 'Medium batch (32-256)',
        explanation: 'Balanced noise and efficiency. Common default.',
      },
      {
        step: 'Large batch (256-4096)',
        explanation: 'Stable gradients, fewer updates, faster per-epoch, may generalize worse.',
      },
      {
        step: 'Adjust learning rate',
        explanation: 'Linear scaling rule: LR × (batch_size / base_batch_size). Larger batches need higher LR.',
      },
    ],
    intuition: 'Batch size is like sample size in polling. Small sample (small batch): noisy but diverse opinions. Large sample (large batch): stable but may miss nuances. Medium sample often best balance.',
    whenToUse: [
      'Start with 32 (good default)',
      'Increase for faster training (if memory allows)',
      'Decrease if overfitting or for better generalization',
      'Adjust based on task and dataset',
    ],
    tradeoffs: {
      pros: [
        'Large: Faster training, better GPU utilization',
        'Small: Better generalization, regularization effect',
        'Medium: Balanced',
      ],
      cons: [
        'Large: May generalize worse, needs LR tuning',
        'Small: Slower training, noisy gradients',
        'Memory constraints limit choices',
      ],
    },
    visualAnalogy: 'Batch size is like group size for decision-making. Small group (small batch): diverse opinions, creative but chaotic. Large group (large batch): consensus but groupthink. Medium group: balanced discussion.',
    interviewQuestions: [
      {
        question: 'Why do large batches sometimes generalize worse?',
        answer: 'Large batch problem: Converge to sharp minima (poor generalization). Small batches: Noise helps escape sharp minima, find flat minima (better generalization). Theories: 1) Large batches reduce gradient noise (less exploration), 2) Fewer parameter updates (less regularization), 3) Sharp vs flat minima. Solutions: Increase LR, use warmup, longer training, or use small batches if possible.',
      },
      {
        question: 'What is the linear scaling rule for learning rate?',
        answer: 'Linear scaling: When increasing batch size by k, increase LR by k. Intuition: Larger batch = more stable gradient = can take larger steps. Example: batch 32 with LR 0.001 → batch 256 with LR 0.008. Works well in practice. Requires warmup for very large batches. Alternative: square root scaling (LR × √k). Linear scaling more common.',
      },
      {
        question: 'How does batch size interact with batch normalization?',
        answer: 'Batch norm computes statistics over batch. Small batches: Noisy statistics, can hurt performance. Very small (<8): Batch norm unreliable. Solutions: 1) Use larger batches (32+), 2) Use group norm or layer norm (don\'t depend on batch), 3) Sync batch norm across GPUs (distributed training). For small batches, layer norm often better than batch norm.',
      },
    ],
    commonMistakes: [
      'Using batch size 1 (too noisy, batch norm fails)',
      'Not adjusting LR when changing batch size',
      'Always using largest batch that fits (may hurt generalization)',
      'Not considering batch norm interaction',
    ],
    relatedTopics: ['Learning Rate', 'Batch Normalization', 'Generalization', 'Training Dynamics'],
  },
];