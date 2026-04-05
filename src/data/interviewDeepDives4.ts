// Interview Deep Dives - Part 4
// Optimization & Loss Functions

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART4: DeepDiveTopic[] = [
  {
    id: 'opt-1',
    title: 'Adam Optimizer',
    category: 'Optimization',
    difficulty: 'Intermediate',
    concept: 'Adam (Adaptive Moment Estimation) combines momentum and RMSProp, maintaining per-parameter adaptive learning rates. It\'s the most popular optimizer for deep learning due to its robustness and efficiency.',
    howItWorks: [
      {
        step: 'Compute gradient',
        explanation: 'Calculate gradient g_t = ∇L(θ_t) for current parameters using backpropagation.',
      },
      {
        step: 'Update first moment (momentum)',
        explanation: 'm_t = β₁ × m_{t-1} + (1-β₁) × g_t. This is exponential moving average of gradients. β₁ typically 0.9. Provides momentum.',
      },
      {
        step: 'Update second moment (variance)',
        explanation: 'v_t = β₂ × v_{t-1} + (1-β₂) × g_t². This is exponential moving average of squared gradients. β₂ typically 0.999. Adapts learning rate.',
      },
      {
        step: 'Bias correction',
        explanation: 'm̂_t = m_t / (1-β₁^t), v̂_t = v_t / (1-β₂^t). Corrects initialization bias (m_0 = v_0 = 0). Important in early training.',
      },
      {
        step: 'Update parameters',
        explanation: 'θ_t = θ_{t-1} - α × m̂_t / (√v̂_t + ε). α is learning rate (typically 0.001), ε prevents division by zero (typically 1e-8).',
      },
    ],
    intuition: 'Adam is like a smart hiker descending a mountain. Momentum (first moment) helps maintain direction and speed through flat areas. Adaptive learning rates (second moment) take smaller steps in steep areas, larger steps in gentle slopes. It automatically adjusts to the terrain.',
    whenToUse: [
      'Default choice for most deep learning tasks',
      'When you want robust performance without tuning',
      'For sparse gradients (NLP, recommender systems)',
      'When training transformers and large models',
    ],
    tradeoffs: {
      pros: [
        'Works well with default hyperparameters',
        'Adaptive learning rates per parameter',
        'Handles sparse gradients well',
        'Computationally efficient',
      ],
      cons: [
        'Can generalize worse than SGD on some tasks',
        'Requires more memory (stores m and v)',
        'May not converge to optimal solution',
        'Can be unstable with large learning rates',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn

# Simple Adam implementation
class SimpleAdam:
    def __init__(self, params, lr=0.001, betas=(0.9, 0.999), eps=1e-8):
        self.params = list(params)
        self.lr = lr
        self.beta1, self.beta2 = betas
        self.eps = eps
        self.t = 0
        
        # Initialize moment estimates
        self.m = [torch.zeros_like(p) for p in self.params]
        self.v = [torch.zeros_like(p) for p in self.params]
    
    def step(self):
        self.t += 1
        
        for i, param in enumerate(self.params):
            if param.grad is None:
                continue
            
            grad = param.grad.data
            
            # Update biased first moment estimate
            self.m[i] = self.beta1 * self.m[i] + (1 - self.beta1) * grad
            
            # Update biased second moment estimate
            self.v[i] = self.beta2 * self.v[i] + (1 - self.beta2) * grad**2
            
            # Bias correction
            m_hat = self.m[i] / (1 - self.beta1**self.t)
            v_hat = self.v[i] / (1 - self.beta2**self.t)
            
            # Update parameters
            param.data -= self.lr * m_hat / (torch.sqrt(v_hat) + self.eps)

# Usage with PyTorch
model = nn.Linear(10, 1)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(100):
    optimizer.zero_grad()
    output = model(torch.randn(32, 10))
    loss = output.mean()
    loss.backward()
    optimizer.step()
    
    if epoch % 20 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`,
      explanation: 'This shows Adam\'s core algorithm. PyTorch\'s implementation includes additional features like weight decay and AMSGrad. The bias correction is crucial in early training when moment estimates are close to zero.',
    },
    visualAnalogy: 'Think of Adam like a car with cruise control and automatic braking. Momentum (cruise control) maintains speed on highways. Adaptive learning rates (automatic braking) slow down on curves. You don\'t need to constantly adjust - it adapts automatically.',
    interviewQuestions: [
      {
        question: 'Why does Adam need bias correction?',
        answer: 'Moment estimates are initialized to zero (m_0 = v_0 = 0). With exponential moving averages, early estimates are biased toward zero. For example, m_1 = (1-β₁)g_1, which is much smaller than g_1 when β₁=0.9. Bias correction divides by (1-β^t), which starts near 1 and approaches 0 as t increases, correcting this bias.',
      },
      {
        question: 'Adam vs SGD - when to use which?',
        answer: 'Adam: Better for most tasks, especially with default hyperparameters. Good for sparse gradients, transformers, quick prototyping. SGD with momentum: Can achieve better generalization on vision tasks (ResNet, etc.) but requires careful learning rate tuning. SGD is simpler and uses less memory. Rule of thumb: start with Adam, try SGD if you have time to tune.',
      },
      {
        question: 'What is the AdamW variant?',
        answer: 'AdamW decouples weight decay from gradient-based optimization. Standard Adam applies weight decay to gradients (L2 regularization), which interacts poorly with adaptive learning rates. AdamW applies weight decay directly to parameters: θ_t = θ_{t-1} - α×m̂_t/√v̂_t - λ×θ_{t-1}. This improves generalization, especially for transformers. Now the default in many libraries.',
      },
    ],
    commonMistakes: [
      'Using too large learning rate (Adam is sensitive)',
      'Not using bias correction (especially for short training)',
      'Forgetting to zero gradients between batches',
      'Not trying SGD for computer vision tasks',
      'Using Adam with L2 regularization instead of AdamW',
    ],
    relatedTopics: ['SGD', 'RMSProp', 'AdamW', 'Learning Rate Schedules', 'Momentum'],
  },
  {
    id: 'opt-2',
    title: 'Learning Rate Schedules',
    category: 'Optimization',
    difficulty: 'Intermediate',
    concept: 'Learning rate schedules adjust the learning rate during training to improve convergence and generalization. Common strategies include step decay, cosine annealing, and warmup.',
    howItWorks: [
      {
        step: 'Start with initial learning rate',
        explanation: 'Begin training with a chosen initial learning rate (e.g., 0.001 for Adam, 0.1 for SGD).',
      },
      {
        step: 'Monitor training progress',
        explanation: 'Track metrics like loss, validation accuracy, or number of epochs/steps.',
      },
      {
        step: 'Adjust learning rate',
        explanation: 'Apply schedule: Step decay (reduce by factor every N epochs), Cosine annealing (follow cosine curve), Exponential decay (multiply by constant), etc.',
      },
      {
        step: 'Optional: Warmup',
        explanation: 'Gradually increase learning rate from small value to target over first few epochs. Stabilizes training, especially for large models.',
      },
    ],
    intuition: 'Learning rate scheduling is like driving. Start slow (warmup), speed up on highway (high LR), slow down approaching destination (decay). Large steps early for fast progress, small steps later for fine-tuning.',
    whenToUse: [
      'Training deep networks (almost always beneficial)',
      'When training plateaus or oscillates',
      'For transformers (warmup + cosine annealing)',
      'Long training runs (>100 epochs)',
    ],
    tradeoffs: {
      pros: [
        'Improves convergence and final performance',
        'Helps escape local minima',
        'Reduces oscillation near convergence',
        'Warmup stabilizes large model training',
      ],
      cons: [
        'Adds hyperparameters to tune',
        'Wrong schedule can hurt performance',
        'Requires knowing training duration',
        'Can be task-specific',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR, StepLR, OneCycleLR
import math

# 1. Step Decay
optimizer = optim.Adam(model.parameters(), lr=0.001)
scheduler = StepLR(optimizer, step_size=30, gamma=0.1)  # Reduce by 10x every 30 epochs

# 2. Cosine Annealing
scheduler = CosineAnnealingLR(optimizer, T_max=100, eta_min=1e-6)

# 3. One Cycle (warmup + cosine)
scheduler = OneCycleLR(
    optimizer,
    max_lr=0.01,
    epochs=100,
    steps_per_epoch=len(train_loader)
)

# 4. Custom: Warmup + Cosine
class WarmupCosineSchedule:
    def __init__(self, optimizer, warmup_steps, total_steps):
        self.optimizer = optimizer
        self.warmup_steps = warmup_steps
        self.total_steps = total_steps
        self.base_lr = optimizer.defaults['lr']
    
    def step(self, step):
        if step < self.warmup_steps:
            # Linear warmup
            lr = self.base_lr * step / self.warmup_steps
        else:
            # Cosine decay
            progress = (step - self.warmup_steps) / (self.total_steps - self.warmup_steps)
            lr = self.base_lr * 0.5 * (1 + math.cos(math.pi * progress))
        
        for param_group in self.optimizer.param_groups:
            param_group['lr'] = lr

# Training loop
for epoch in range(100):
    for batch in train_loader:
        optimizer.zero_grad()
        loss = model(batch)
        loss.backward()
        optimizer.step()
        scheduler.step()  # Update learning rate
    
    print(f"Epoch {epoch}, LR: {optimizer.param_groups[0]['lr']:.6f}")`,
      explanation: 'This shows common schedules. OneCycleLR is popular for fast training. Warmup + Cosine is standard for transformers (BERT, GPT). Step decay is simple and effective for CNNs.',
    },
    visualAnalogy: 'Learning rate scheduling is like cooking. Start with high heat to quickly bring water to boil (high LR for fast initial progress), then reduce to simmer for perfect results (low LR for fine-tuning). Warmup is like preheating the oven.',
    interviewQuestions: [
      {
        question: 'Why use warmup for transformer training?',
        answer: 'Transformers are sensitive to large learning rates early in training when parameters are randomly initialized. Warmup gradually increases LR from near-zero to target over first few thousand steps. This prevents gradient explosion and allows Adam\'s adaptive learning rates to stabilize. Without warmup, training often diverges. Typically warmup for 4000-10000 steps.',
      },
      {
        question: 'Explain cosine annealing',
        answer: 'Cosine annealing follows a cosine curve from max LR to min LR: lr = lr_min + 0.5×(lr_max - lr_min)×(1 + cos(π×t/T)). Starts high, smoothly decreases, ends near zero. Benefits: smooth decay (no sudden drops), spends more time at higher LRs (faster learning), gradual approach to minimum. Popular for transformers and vision models.',
      },
      {
        question: 'What is the One Cycle policy?',
        answer: 'One Cycle: 1) Warmup LR from low to high (first 30% of training), 2) Decay from high to low (remaining 70%), 3) Simultaneously adjust momentum inversely (high when LR low, low when LR high). Enables training with very high learning rates, achieving better results in fewer epochs. Popularized by fast.ai, works well for CNNs.',
      },
    ],
    commonMistakes: [
      'Not using warmup for transformers (training diverges)',
      'Decaying learning rate too early (underfitting)',
      'Using same schedule for all tasks (task-specific)',
      'Forgetting to call scheduler.step()',
      'Not considering total training steps when designing schedule',
    ],
    relatedTopics: ['Adam Optimizer', 'SGD', 'Gradient Descent', 'Hyperparameter Tuning'],
  },
  {
    id: 'loss-1',
    title: 'Cross-Entropy Loss',
    category: 'Loss Functions',
    difficulty: 'Beginner',
    concept: 'Cross-entropy measures the difference between predicted probability distribution and true distribution. It\'s the standard loss for classification tasks, penalizing confident wrong predictions heavily.',
    howItWorks: [
      {
        step: 'Model outputs logits',
        explanation: 'Neural network produces raw scores (logits) for each class. Shape: (batch_size, num_classes).',
      },
      {
        step: 'Apply softmax',
        explanation: 'Convert logits to probabilities: p_i = exp(logit_i) / Σexp(logit_j). Probabilities sum to 1.',
      },
      {
        step: 'Compute cross-entropy',
        explanation: 'For true class c: Loss = -log(p_c). If prediction is confident and correct (p_c ≈ 1), loss ≈ 0. If confident and wrong (p_c ≈ 0), loss → ∞.',
      },
      {
        step: 'Average over batch',
        explanation: 'Final loss = mean of individual losses across batch. This is what we minimize during training.',
      },
    ],
    intuition: 'Cross-entropy is like a harsh grading system. If you\'re 99% confident in the right answer, you get almost full credit. If you\'re 99% confident in the WRONG answer, you fail spectacularly. It heavily penalizes confident mistakes.',
    whenToUse: [
      'Multi-class classification (image classification, NLP)',
      'Binary classification (use BCELoss)',
      'Language modeling (predict next token)',
      'Any task with mutually exclusive classes',
    ],
    tradeoffs: {
      pros: [
        'Probabilistic interpretation',
        'Penalizes confident wrong predictions',
        'Smooth gradients (better than accuracy)',
        'Works well with softmax',
      ],
      cons: [
        'Sensitive to class imbalance',
        'Can be overconfident',
        'Requires one-hot encoded labels',
        'Not robust to noisy labels',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

# PyTorch CrossEntropyLoss (combines softmax + log + NLL)
criterion = nn.CrossEntropyLoss()

# Example: 3-class classification, batch size 4
logits = torch.randn(4, 3)  # Model outputs (raw scores)
labels = torch.tensor([0, 1, 2, 1])  # True classes

loss = criterion(logits, labels)
print(f"Loss: {loss.item():.4f}")

# Manual implementation
def cross_entropy_manual(logits, labels):
    # Apply softmax
    probs = F.softmax(logits, dim=1)
    
    # Get probability of true class for each sample
    batch_size = logits.size(0)
    true_class_probs = probs[range(batch_size), labels]
    
    # Compute negative log likelihood
    loss = -torch.log(true_class_probs)
    
    return loss.mean()

manual_loss = cross_entropy_manual(logits, labels)
print(f"Manual loss: {manual_loss.item():.4f}")

# Binary classification (BCEWithLogitsLoss)
bce_criterion = nn.BCEWithLogitsLoss()
binary_logits = torch.randn(4, 1)
binary_labels = torch.tensor([[1.], [0.], [1.], [0.]])
bce_loss = bce_criterion(binary_logits, binary_labels)
print(f"Binary CE loss: {bce_loss.item():.4f}")`,
      explanation: 'PyTorch\'s CrossEntropyLoss combines LogSoftmax and NLLLoss for numerical stability. It expects raw logits (not probabilities) and integer labels (not one-hot). BCEWithLogitsLoss is for binary classification.',
    },
    visualAnalogy: 'Cross-entropy is like a confidence penalty in a quiz show. If you\'re 90% sure and correct, small penalty. If you\'re 90% sure and wrong, huge penalty. If you\'re 50-50, moderate penalty. It encourages both correctness AND appropriate confidence.',
    interviewQuestions: [
      {
        question: 'Why use cross-entropy instead of MSE for classification?',
        answer: 'MSE treats class labels as continuous values, which doesn\'t match the categorical nature of classification. Cross-entropy: 1) Has probabilistic interpretation, 2) Provides stronger gradients for wrong predictions (MSE gradients vanish when using sigmoid), 3) Naturally works with softmax, 4) Penalizes confident mistakes heavily. MSE would treat predicting class 0 as 2 the same as predicting 1, which is wrong.',
      },
      {
        question: 'What is the relationship between cross-entropy and KL divergence?',
        answer: 'Cross-entropy H(p,q) = H(p) + KL(p||q), where p is true distribution, q is predicted. For classification, true distribution is one-hot (entropy H(p)=0), so minimizing cross-entropy = minimizing KL divergence. KL divergence measures how much predicted distribution differs from true distribution.',
      },
      {
        question: 'How to handle class imbalance with cross-entropy?',
        answer: 'Solutions: 1) Weighted cross-entropy: assign higher weights to minority classes (nn.CrossEntropyLoss(weight=class_weights)), 2) Focal loss: down-weight easy examples, focus on hard ones, 3) Oversampling minority class or undersampling majority, 4) Use balanced accuracy metric. Weighted CE is simplest and often effective.',
      },
    ],
    commonMistakes: [
      'Applying softmax before CrossEntropyLoss (it\'s included)',
      'Using one-hot labels instead of class indices',
      'Not handling class imbalance',
      'Confusing with binary cross-entropy (different formula)',
      'Not using log-sum-exp trick for numerical stability',
    ],
    relatedTopics: ['Softmax', 'Focal Loss', 'Label Smoothing', 'KL Divergence', 'Negative Log Likelihood'],
  },
  {
    id: 'opt-3',
    title: 'SGD with Momentum',
    category: 'Optimization',
    difficulty: 'Beginner',
    concept: 'SGD with momentum accelerates gradient descent by accumulating a velocity vector in directions of persistent gradient reduction. It dampens oscillations and speeds up convergence.',
    howItWorks: [
      {
        step: 'Initialize velocity',
        explanation: 'v_0 = 0. Velocity accumulates gradients over time.',
      },
      {
        step: 'Compute gradient',
        explanation: 'g_t = ∇L(θ_t). Standard gradient computation.',
      },
      {
        step: 'Update velocity',
        explanation: 'v_t = β × v_{t-1} + g_t. β (typically 0.9) controls momentum. Velocity is exponential moving average of gradients.',
      },
      {
        step: 'Update parameters',
        explanation: 'θ_t = θ_{t-1} - α × v_t. α is learning rate. Move in direction of velocity, not just current gradient.',
      },
    ],
    intuition: 'Momentum is like pushing a ball downhill. It builds up speed (velocity) in consistent directions. If gradient changes direction, momentum smooths it out. This helps escape local minima and speeds up convergence.',
    whenToUse: [
      'Training CNNs (very common)',
      'When loss surface has ravines',
      'When you want faster convergence than vanilla SGD',
      'Computer vision tasks',
    ],
    tradeoffs: {
      pros: [
        'Faster convergence than vanilla SGD',
        'Dampens oscillations',
        'Can escape shallow local minima',
        'Simple to implement',
      ],
      cons: [
        'Adds hyperparameter β',
        'Can overshoot minima',
        'Not adaptive (same LR for all parameters)',
        'Adam often works better out-of-the-box',
      ],
    },
    visualAnalogy: 'Momentum is like a heavy ball rolling downhill. It doesn\'t stop immediately when slope changes - it has inertia. This helps it roll through small bumps (local minima) and move faster in consistent directions.',
    interviewQuestions: [
      {
        question: 'What is Nesterov momentum?',
        answer: 'Nesterov (NAG): "Look ahead" before computing gradient. Standard momentum: compute gradient at current position, then move. Nesterov: move with momentum first, then compute gradient. Formula: v_t = β×v_{t-1} + ∇L(θ_t - β×v_{t-1}). Benefits: more responsive to changes, often converges faster. Used in many optimizers. Slightly more complex but better performance.',
      },
      {
        question: 'Why does momentum help with ravines?',
        answer: 'Ravines: steep in one direction, gentle in another. Vanilla SGD oscillates across ravine, slow progress along it. Momentum: accumulates velocity along ravine (consistent gradient), dampens oscillations across it (alternating gradients cancel). Result: faster progress toward minimum. Common in high-dimensional optimization.',
      },
      {
        question: 'How to choose momentum coefficient β?',
        answer: 'Typical values: 0.9 (default), 0.95, 0.99. Higher β = more momentum, smoother trajectory, but slower to respond to changes. Lower β = less momentum, more responsive. Start with 0.9. Increase if training is noisy or oscillating. Decrease if overshooting. Often less sensitive than learning rate.',
      },
    ],
    commonMistakes: [
      'Not using momentum with SGD (missing easy improvement)',
      'Setting β too high (overshooting)',
      'Confusing momentum with learning rate',
      'Not trying Nesterov variant',
    ],
    relatedTopics: ['SGD', 'Nesterov Momentum', 'Adam', 'RMSProp'],
  },
  {
    id: 'loss-2',
    title: 'Focal Loss',
    category: 'Loss Functions',
    difficulty: 'Intermediate',
    concept: 'Focal loss down-weights easy examples and focuses on hard examples by adding a modulating factor to cross-entropy. It addresses class imbalance in object detection by preventing easy negatives from dominating training.',
    howItWorks: [
      {
        step: 'Standard cross-entropy',
        explanation: 'CE = -log(p_t), where p_t is probability of correct class.',
      },
      {
        step: 'Add modulating factor',
        explanation: 'FL = -(1-p_t)^γ × log(p_t). γ (typically 2) controls focusing. When p_t is high (easy example), (1-p_t)^γ is small, down-weighting loss.',
      },
      {
        step: 'Optional: class weighting',
        explanation: 'FL = -α_t × (1-p_t)^γ × log(p_t). α_t balances class frequencies.',
      },
      {
        step: 'Training',
        explanation: 'Model focuses on hard examples (low p_t) where loss is high. Easy examples (high p_t) contribute little.',
      },
    ],
    intuition: 'Focal loss is like a teacher focusing on struggling students. Students who understand (easy examples) need less attention. Students who struggle (hard examples) get more focus. This prevents the class from being dominated by easy questions.',
    whenToUse: [
      'Object detection (RetinaNet)',
      'Severe class imbalance (1:1000 ratio)',
      'When easy negatives dominate training',
      'Dense prediction tasks',
    ],
    tradeoffs: {
      pros: [
        'Handles extreme class imbalance',
        'Focuses on hard examples',
        'No need for hard negative mining',
        'Improves rare class detection',
      ],
      cons: [
        'Adds hyperparameter γ',
        'Can be sensitive to γ choice',
        'May hurt performance on balanced data',
        'Requires tuning',
      ],
    },
    visualAnalogy: 'Focal loss is like grading on a curve that helps struggling students. If you score 95% (easy example), your grade barely changes. If you score 50% (hard example), small improvements significantly boost your grade. This motivates focus on weak areas.',
    interviewQuestions: [
      {
        question: 'How does focal loss differ from weighted cross-entropy?',
        answer: 'Weighted CE: Fixed weight per class (e.g., 10x weight for minority class). Treats all minority examples equally. Focal loss: Dynamic weight per example based on prediction confidence. Easy minority examples get low weight, hard ones get high weight. Focal loss is more fine-grained. Can combine both: α for class balance, γ for hard example focus.',
      },
      {
        question: 'Why was focal loss developed for object detection?',
        answer: 'Object detection: extreme imbalance (1 object, 10000 background). Easy negatives (clear background) dominate loss, overwhelming rare positives. Hard negative mining helps but is complex. Focal loss automatically down-weights easy negatives, no mining needed. Enabled one-stage detectors (RetinaNet) to match two-stage (Faster R-CNN) accuracy. Now standard in detection.',
      },
      {
        question: 'How to choose focusing parameter γ?',
        answer: 'γ controls focusing strength. γ=0: standard CE. γ=2: default, works well. Higher γ: more aggressive focusing on hard examples. Start with γ=2. Increase if easy examples dominate. Decrease if model struggles to learn. Typical range: 1-5. Also tune α (class weight) jointly. Validation performance guides tuning.',
      },
    ],
    commonMistakes: [
      'Using focal loss on balanced data (not needed)',
      'Not tuning γ (default may not be optimal)',
      'Forgetting class weights α when needed',
      'Applying to tasks without class imbalance',
    ],
    relatedTopics: ['Cross-Entropy Loss', 'Class Imbalance', 'Hard Negative Mining', 'RetinaNet'],
  },
  {
    id: 'loss-3',
    title: 'Contrastive Loss',
    category: 'Loss Functions',
    difficulty: 'Intermediate',
    concept: 'Contrastive loss trains models to pull similar examples together and push dissimilar examples apart in embedding space. It\'s fundamental for self-supervised learning and metric learning.',
    howItWorks: [
      {
        step: 'Create pairs',
        explanation: 'Positive pairs: similar examples (same class, augmented versions). Negative pairs: dissimilar examples (different classes).',
      },
      {
        step: 'Compute embeddings',
        explanation: 'Pass examples through encoder to get embeddings. f(x_i), f(x_j).',
      },
      {
        step: 'Compute distance',
        explanation: 'Calculate distance between embeddings: d = ||f(x_i) - f(x_j)||. Euclidean distance common.',
      },
      {
        step: 'Contrastive loss',
        explanation: 'L = y × d² + (1-y) × max(margin - d, 0)². y=1 for positive pairs (minimize distance), y=0 for negative pairs (maximize distance up to margin).',
      },
    ],
    intuition: 'Contrastive loss is like organizing a library. Put similar books together (positive pairs), separate different books (negative pairs). The "margin" is minimum distance between different categories. This creates organized, meaningful embeddings.',
    whenToUse: [
      'Self-supervised learning (SimCLR, MoCo)',
      'Face recognition and verification',
      'Metric learning',
      'When you have pairs but not explicit labels',
    ],
    tradeoffs: {
      pros: [
        'Learns meaningful embeddings',
        'Works with unlabeled data (self-supervised)',
        'Flexible - many variants',
        'Foundation for modern SSL',
      ],
      cons: [
        'Requires careful pair sampling',
        'Sensitive to margin hyperparameter',
        'Can be slow (many pairs)',
        'Hard negative mining often needed',
      ],
    },
    visualAnalogy: 'Contrastive loss is like learning to recognize faces. You learn that photos of the same person (positive pairs) should look similar, photos of different people (negative pairs) should look different. The margin ensures clear separation.',
    interviewQuestions: [
      {
        question: 'What is the difference between contrastive loss and triplet loss?',
        answer: 'Contrastive: Pairs (positive or negative). Loss for each pair independently. Triplet: Triplets (anchor, positive, negative). Loss ensures d(anchor, positive) + margin < d(anchor, negative). Triplet is more efficient (one comparison per triplet vs two pairs). Triplet directly optimizes relative distances. Both used for metric learning, triplet more common now.',
      },
      {
        question: 'How is contrastive loss used in self-supervised learning?',
        answer: 'Self-supervised (SimCLR, MoCo): Create positive pairs via augmentation (same image, different crops/colors). Negative pairs: different images. No labels needed. Model learns invariances to augmentations. InfoNCE loss (variant): maximize agreement between positive pair, minimize with negatives. This pre-training learns representations useful for downstream tasks.',
      },
      {
        question: 'What is hard negative mining in contrastive learning?',
        answer: 'Hard negatives: dissimilar examples that are close in embedding space (model confuses them). Easy negatives: clearly different, don\'t help learning. Hard negative mining: sample negatives that are hard for current model. Improves learning efficiency. Methods: semi-hard mining (negatives within margin), hardest negative per batch. Critical for good performance.',
      },
    ],
    commonMistakes: [
      'Not balancing positive and negative pairs',
      'Using random negatives (too easy)',
      'Wrong margin value',
      'Not normalizing embeddings',
    ],
    relatedTopics: ['Triplet Loss', 'SimCLR', 'Self-Supervised Learning', 'Metric Learning'],
  },
];