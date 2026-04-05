// Interview Deep Dives - Part 7
// Distributed Training, Model Compression, Evaluation Metrics

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART7: DeepDiveTopic[] = [
  {
    id: 'dist-1',
    title: 'Data Parallelism',
    category: 'Distributed Training',
    difficulty: 'Advanced',
    concept: 'Data parallelism splits data across multiple GPUs, each with a full model copy. Gradients are synchronized and averaged across GPUs after each batch, enabling faster training on large datasets.',
    howItWorks: [
      {
        step: 'Replicate model',
        explanation: 'Copy full model to each GPU. All GPUs have identical model weights initially.',
      },
      {
        step: 'Split batch',
        explanation: 'Divide mini-batch across GPUs. If batch size is 256 and 4 GPUs, each GPU gets 64 samples.',
      },
      {
        step: 'Forward and backward pass',
        explanation: 'Each GPU independently computes forward pass, loss, and gradients on its data subset. No communication during this phase.',
      },
      {
        step: 'All-reduce gradients',
        explanation: 'Synchronize gradients across GPUs using all-reduce operation. Each GPU ends up with average gradient across all GPUs.',
      },
      {
        step: 'Update weights',
        explanation: 'Each GPU updates its model copy with averaged gradients. All models stay synchronized.',
      },
    ],
    intuition: 'Data parallelism is like a team of chefs cooking the same recipe. Each chef (GPU) cooks different ingredients (data), then they share notes (gradients) to improve the recipe together. Everyone ends up with the same improved recipe (model).',
    whenToUse: [
      'Training on large datasets',
      'When model fits on single GPU but training is slow',
      'When you have multiple GPUs available',
      'For most deep learning tasks (default parallelism strategy)',
    ],
    tradeoffs: {
      pros: [
        'Simple to implement (PyTorch DDP)',
        'Linear speedup with number of GPUs (ideally)',
        'Works for most models',
        'No model architecture changes needed',
      ],
      cons: [
        'Communication overhead (gradient synchronization)',
        'Requires model to fit on single GPU',
        'Batch size scales with GPUs (can hurt convergence)',
        'Inefficient for small models or slow networks',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler

# Initialize process group
def setup(rank, world_size):
    dist.init_process_group(
        backend='nccl',  # NCCL for GPU
        init_method='env://',
        world_size=world_size,
        rank=rank
    )

# Training function
def train(rank, world_size):
    setup(rank, world_size)
    
    # Create model and move to GPU
    model = nn.Linear(10, 10).to(rank)
    
    # Wrap with DDP
    model = DDP(model, device_ids=[rank])
    
    # Create distributed sampler
    dataset = torch.randn(1000, 10)
    sampler = DistributedSampler(
        dataset,
        num_replicas=world_size,
        rank=rank
    )
    
    dataloader = torch.utils.data.DataLoader(
        dataset,
        batch_size=32,
        sampler=sampler
    )
    
    optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
    
    # Training loop
    for epoch in range(10):
        sampler.set_epoch(epoch)  # Shuffle differently each epoch
        
        for batch in dataloader:
            batch = batch.to(rank)
            
            optimizer.zero_grad()
            output = model(batch)
            loss = output.mean()
            loss.backward()  # Gradients automatically synchronized
            optimizer.step()
    
    dist.destroy_process_group()

# Launch with: torchrun --nproc_per_node=4 train.py

# Simple DataParallel (easier but slower)
model = nn.Linear(10, 10)
if torch.cuda.device_count() > 1:
    model = nn.DataParallel(model)  # Wraps model
model = model.cuda()

# Training works the same
output = model(input)  # Automatically splits across GPUs`,
      explanation: 'DistributedDataParallel (DDP) is recommended for multi-GPU training. It\'s more efficient than DataParallel. Each process runs on one GPU. Gradients are synchronized automatically via all-reduce. DistributedSampler ensures each GPU sees different data.',
    },
    visualAnalogy: 'Data parallelism is like grading exams. Multiple teachers (GPUs) grade different exams (data) using the same rubric (model). After grading, they meet to update the rubric based on all exams (gradient averaging). Next round, everyone uses the updated rubric.',
    interviewQuestions: [
      {
        question: 'DDP vs DataParallel - what\'s the difference?',
        answer: 'DataParallel (DP): Single-process, multi-thread. Master GPU gathers outputs and scatters inputs. Bottleneck at master GPU. GIL contention. DistributedDataParallel (DDP): Multi-process, one per GPU. All-reduce for gradient sync (no master). More efficient communication. Recommended for multi-GPU. DDP is 2-3x faster than DP. Use DDP unless you need single-process for debugging.',
      },
      {
        question: 'How does gradient synchronization work in DDP?',
        answer: 'DDP uses all-reduce operation during backward pass. When loss.backward() is called, gradients are computed locally. DDP hooks into autograd to trigger all-reduce on each parameter\'s gradient. All-reduce: each GPU sends its gradient, receives average from all GPUs. Uses ring-allreduce algorithm for efficiency. Happens asynchronously with computation. Result: all GPUs have identical averaged gradients.',
      },
      {
        question: 'What happens to batch size in data parallelism?',
        answer: 'Effective batch size = per_GPU_batch_size × num_GPUs. If each GPU processes 32 samples and you have 4 GPUs, effective batch size is 128. This can affect convergence - larger batches may need higher learning rate or more epochs. Solutions: 1) Linear scaling rule (LR × num_GPUs), 2) Gradual warmup, 3) Keep per-GPU batch size constant, adjust LR. Important to tune for your task.',
      },
    ],
    commonMistakes: [
      'Using DataParallel instead of DDP (slower)',
      'Not using DistributedSampler (GPUs see same data)',
      'Forgetting to call sampler.set_epoch() (same shuffle each epoch)',
      'Not adjusting learning rate for larger effective batch size',
      'Putting model on GPU before wrapping with DDP',
    ],
    relatedTopics: ['Model Parallelism', 'Pipeline Parallelism', 'ZeRO Optimizer', 'Gradient Accumulation'],
  },
  {
    id: 'compress-1',
    title: 'Knowledge Distillation',
    category: 'Model Compression',
    difficulty: 'Intermediate',
    concept: 'Knowledge distillation trains a small "student" model to mimic a large "teacher" model by matching soft probability distributions. The student learns from teacher\'s knowledge, achieving similar performance with fewer parameters.',
    howItWorks: [
      {
        step: 'Train teacher model',
        explanation: 'Train large, high-capacity model on task. This is your best-performing model (e.g., BERT-large).',
      },
      {
        step: 'Generate soft targets',
        explanation: 'Run teacher on training data. Use softmax with temperature T>1 to get "soft" probabilities. Higher temperature makes distribution smoother, revealing teacher\'s uncertainty.',
      },
      {
        step: 'Train student model',
        explanation: 'Small model (e.g., BERT-tiny) learns from: 1) Hard labels (ground truth), 2) Soft labels (teacher predictions). Loss = α×distillation_loss + (1-α)×task_loss.',
      },
      {
        step: 'Distillation loss',
        explanation: 'KL divergence between student and teacher soft predictions: KL(teacher_soft || student_soft). Both use same temperature T during training.',
      },
      {
        step: 'Inference',
        explanation: 'Use student model with temperature T=1 (standard softmax). Student is much faster than teacher but maintains performance.',
      },
    ],
    intuition: 'Knowledge distillation is like learning from an expert teacher. The teacher doesn\'t just say "this is correct" (hard labels), but explains "this is 70% likely, that is 20% likely" (soft labels). The student learns the teacher\'s reasoning, not just answers.',
    whenToUse: [
      'Deploying models to edge devices (mobile, IoT)',
      'When inference speed/cost is critical',
      'Compressing large models (BERT → DistilBERT)',
      'When you have a strong teacher model',
    ],
    tradeoffs: {
      pros: [
        'Student much smaller and faster than teacher',
        'Often outperforms training student from scratch',
        'Transfers "dark knowledge" from teacher',
        'Can use unlabeled data (teacher generates labels)',
      ],
      cons: [
        'Requires training teacher first (expensive)',
        'Student never quite matches teacher performance',
        'Requires tuning temperature and loss weights',
        'May not work if teacher and student too different',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class DistillationLoss(nn.Module):
    def __init__(self, temperature=3.0, alpha=0.5):
        super().__init__()
        self.temperature = temperature
        self.alpha = alpha
        self.ce_loss = nn.CrossEntropyLoss()
    
    def forward(self, student_logits, teacher_logits, labels):
        # Soft targets from teacher
        teacher_probs = F.softmax(teacher_logits / self.temperature, dim=1)
        student_log_probs = F.log_softmax(student_logits / self.temperature, dim=1)
        
        # Distillation loss (KL divergence)
        distill_loss = F.kl_div(
            student_log_probs,
            teacher_probs,
            reduction='batchmean'
        ) * (self.temperature ** 2)  # Scale by T^2
        
        # Task loss (hard labels)
        task_loss = self.ce_loss(student_logits, labels)
        
        # Combined loss
        loss = self.alpha * distill_loss + (1 - self.alpha) * task_loss
        return loss

# Example usage
teacher = LargeModel()  # Pre-trained
student = SmallModel()  # To be trained

teacher.eval()  # Teacher in eval mode
student.train()

criterion = DistillationLoss(temperature=3.0, alpha=0.7)
optimizer = torch.optim.Adam(student.parameters(), lr=1e-4)

for batch in dataloader:
    inputs, labels = batch
    
    # Get teacher predictions (no gradients)
    with torch.no_grad():
        teacher_logits = teacher(inputs)
    
    # Get student predictions
    student_logits = student(inputs)
    
    # Compute distillation loss
    loss = criterion(student_logits, teacher_logits, labels)
    
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()

# DistilBERT example
from transformers import DistilBertForSequenceClassification

# DistilBERT is 40% smaller, 60% faster than BERT
# Retains 97% of BERT's performance
model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased')`,
      explanation: 'Temperature T softens probability distributions. Higher T reveals more information about teacher\'s uncertainty. T^2 scaling balances gradient magnitudes. Alpha controls trade-off between distillation and task loss. DistilBERT is famous example.',
    },
    visualAnalogy: 'Knowledge distillation is like learning to cook from a master chef. The chef doesn\'t just say "add salt" (hard label), but explains "add a pinch, not too much, taste as you go" (soft labels). You learn the reasoning and intuition, not just the recipe.',
    interviewQuestions: [
      {
        question: 'Why use temperature in knowledge distillation?',
        answer: 'Temperature T softens probability distribution. With T=1 (standard), teacher might output [0.9, 0.05, 0.05] - very confident. With T=5, same logits become [0.5, 0.25, 0.25] - reveals relative confidences. This "dark knowledge" helps student learn: "class 2 is more likely than class 3". Without temperature, student only learns "class 1 is correct". Typical T: 2-10. Higher T for more knowledge transfer.',
      },
      {
        question: 'Can you distill without labeled data?',
        answer: 'Yes! Self-distillation or unlabeled distillation. Use teacher predictions as labels. Process: 1) Run teacher on unlabeled data, 2) Use teacher\'s soft predictions as targets, 3) Train student to match teacher. Useful when labeled data is scarce but unlabeled data is abundant. Can even use synthetic data. The teacher\'s knowledge is transferred without ground truth labels.',
      },
      {
        question: 'What is the difference between distillation and pruning?',
        answer: 'Distillation: Train new small model to mimic large model. Different architecture, trained from scratch. Pruning: Remove weights from existing model (set to zero), then fine-tune. Same architecture, modified. Distillation typically achieves better accuracy for given size. Pruning is simpler (no teacher needed). Can combine: prune teacher, then distill to student. Quantization is another compression technique (reduce precision).',
      },
    ],
    commonMistakes: [
      'Not using temperature (loses soft target benefits)',
      'Using temperature during inference (should be T=1)',
      'Wrong alpha balance (too much task loss or distillation loss)',
      'Student too small (can\'t learn teacher\'s knowledge)',
      'Not freezing teacher model (wastes compute)',
    ],
    relatedTopics: ['Model Pruning', 'Quantization', 'DistilBERT', 'TinyBERT', 'Model Compression'],
  },
  {
    id: 'metric-1',
    title: 'Precision, Recall, and F1 Score',
    category: 'Evaluation Metrics',
    difficulty: 'Beginner',
    concept: 'Precision measures accuracy of positive predictions (how many predicted positives are actually positive). Recall measures coverage (how many actual positives were found). F1 is their harmonic mean, balancing both.',
    howItWorks: [
      {
        step: 'Compute confusion matrix',
        explanation: 'True Positives (TP): correctly predicted positive. False Positives (FP): incorrectly predicted positive. True Negatives (TN): correctly predicted negative. False Negatives (FN): incorrectly predicted negative.',
      },
      {
        step: 'Calculate Precision',
        explanation: 'Precision = TP / (TP + FP). Of all positive predictions, how many were correct? High precision = few false alarms.',
      },
      {
        step: 'Calculate Recall',
        explanation: 'Recall = TP / (TP + FN). Of all actual positives, how many did we find? High recall = few missed cases.',
      },
      {
        step: 'Calculate F1 Score',
        explanation: 'F1 = 2 × (Precision × Recall) / (Precision + Recall). Harmonic mean balances precision and recall. Useful when you care about both.',
      },
    ],
    intuition: 'Precision is "when I say yes, am I usually right?" Recall is "of all the yeses, how many did I catch?" F1 balances both. Example: spam filter with high precision rarely marks good emails as spam (few false positives), high recall catches most spam (few false negatives).',
    whenToUse: [
      'Binary classification with class imbalance',
      'When false positives and false negatives have different costs',
      'Information retrieval (search engines)',
      'Medical diagnosis, fraud detection',
    ],
    tradeoffs: {
      pros: [
        'More informative than accuracy for imbalanced data',
        'Precision and recall show different aspects',
        'F1 provides single metric',
        'Widely understood and used',
      ],
      cons: [
        'F1 treats precision and recall equally (may not match business needs)',
        'Doesn\'t consider true negatives',
        'Can be misleading with severe imbalance',
        'Threshold-dependent',
      ],
    },
    codeExample: {
      language: 'python',
      code: `from sklearn.metrics import precision_score, recall_score, f1_score, classification_report
from sklearn.metrics import confusion_matrix
import numpy as np

# Example predictions
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 0, 1, 0])
y_pred = np.array([1, 0, 1, 0, 0, 1, 1, 0, 1, 0])

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:")
print(cm)
# [[5 1]   TN=5, FP=1
#  [1 3]]  FN=1, TP=3

# Calculate metrics
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"Precision: {precision:.3f}")  # 3/(3+1) = 0.75
print(f"Recall: {recall:.3f}")        # 3/(3+1) = 0.75
print(f"F1 Score: {f1:.3f}")          # 0.75

# Comprehensive report
print(classification_report(y_true, y_pred))

# Manual calculation
def calculate_metrics(y_true, y_pred):
    tp = np.sum((y_true == 1) & (y_pred == 1))
    fp = np.sum((y_true == 0) & (y_pred == 1))
    fn = np.sum((y_true == 1) & (y_pred == 0))
    tn = np.sum((y_true == 0) & (y_pred == 0))
    
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0
    
    return precision, recall, f1

# Multi-class: macro vs micro averaging
# Macro: average metrics across classes (treats classes equally)
# Micro: aggregate TP, FP, FN across classes (favors larger classes)
f1_macro = f1_score(y_true, y_pred, average='macro')
f1_micro = f1_score(y_true, y_pred, average='micro')`,
      explanation: 'Sklearn provides easy metric calculation. Confusion matrix shows TP, FP, TN, FN. Classification report gives comprehensive view. For multi-class, choose macro (equal class weight) or micro (proportional to class size) averaging.',
    },
    visualAnalogy: 'Precision and recall are like a fishing net. Precision: of fish you caught, how many are the right species? (few wrong fish = high precision). Recall: of all right species in the lake, how many did you catch? (few escaped = high recall). F1 balances both.',
    interviewQuestions: [
      {
        question: 'When would you optimize for precision vs recall?',
        answer: 'Optimize precision when false positives are costly: spam filter (don\'t want to block important emails), recommendation systems (don\'t recommend bad products). Optimize recall when false negatives are costly: cancer screening (don\'t miss cancer cases), fraud detection (catch all fraud). F1 when both matter equally. Often use F-beta score: F_β = (1+β²) × P×R / (β²×P + R), where β>1 favors recall, β<1 favors precision.',
      },
      {
        question: 'Why use F1 instead of accuracy?',
        answer: 'Accuracy fails with class imbalance. Example: 99% negative class. Predict all negative → 99% accuracy but useless. F1 focuses on positive class performance. Accuracy = (TP+TN)/(TP+TN+FP+FN) includes TN, which dominates in imbalanced data. F1 = 2PR/(P+R) ignores TN. For balanced data, accuracy is fine. For imbalanced, use F1, precision, recall, or AUC-ROC.',
      },
      {
        question: 'What is the difference between macro and micro F1?',
        answer: 'Macro F1: Calculate F1 for each class, then average. Treats all classes equally. Good when classes are equally important. Micro F1: Aggregate TP, FP, FN across all classes, then calculate F1. Weighted by class size. Good when larger classes are more important. Example: 3 classes with F1 [0.9, 0.8, 0.3]. Macro F1 = 0.67. If class 3 is tiny, micro F1 ≈ 0.85 (dominated by classes 1,2).',
      },
    ],
    commonMistakes: [
      'Using accuracy for imbalanced data',
      'Not considering business costs (precision vs recall trade-off)',
      'Confusing precision with accuracy',
      'Not checking confusion matrix (F1 alone can be misleading)',
      'Using wrong averaging (macro vs micro) for multi-class',
    ],
    relatedTopics: ['ROC-AUC', 'Confusion Matrix', 'Precision-Recall Curve', 'Matthews Correlation Coefficient'],
  },
  {
    id: 'dist-2',
    title: 'Gradient Accumulation',
    category: 'Distributed Training',
    difficulty: 'Intermediate',
    concept: 'Gradient accumulation simulates large batch training by accumulating gradients over multiple forward/backward passes before updating weights. It enables training with large effective batch sizes on limited memory.',
    howItWorks: [
      {
        step: 'Forward pass on mini-batch',
        explanation: 'Process small batch that fits in memory. Compute loss.',
      },
      {
        step: 'Backward pass',
        explanation: 'Compute gradients but don\'t update weights yet. Gradients accumulate in parameter.grad.',
      },
      {
        step: 'Repeat for N steps',
        explanation: 'Process N mini-batches, accumulating gradients. Effective batch size = mini_batch_size × N.',
      },
      {
        step: 'Update weights',
        explanation: 'After N steps, update weights with accumulated gradients. Zero gradients. Repeat.',
      },
    ],
    intuition: 'Gradient accumulation is like collecting donations. Instead of depositing each small donation immediately (expensive), you collect several and deposit once (efficient). Same total amount, fewer transactions.',
    whenToUse: [
      'Training large models with limited GPU memory',
      'When you need large batch sizes',
      'To simulate multi-GPU training on single GPU',
      'When batch size is limited by memory',
    ],
    tradeoffs: {
      pros: [
        'Enables large effective batch sizes',
        'No additional memory for activations',
        'Simple to implement',
        'Mathematically equivalent to large batch',
      ],
      cons: [
        'Slower training (more forward/backward passes)',
        'Batch norm statistics computed per mini-batch',
        'Delayed weight updates',
      ],
    },
    visualAnalogy: 'Gradient accumulation is like painting a wall in sections. You can\'t paint the whole wall at once (memory limit), so you paint sections, remember what you did, then step back and evaluate the whole wall before deciding next color.',
    interviewQuestions: [
      {
        question: 'How does gradient accumulation affect batch normalization?',
        answer: 'Problem: Batch norm computes statistics per mini-batch, not effective batch. With accumulation, each mini-batch has different statistics. Solutions: 1) Use layer norm or group norm instead, 2) Use larger mini-batches if possible, 3) Sync batch norm (compute statistics across accumulation steps). Most common: just accept the approximation or use layer norm. Important consideration for large models.',
      },
      {
        question: 'Is gradient accumulation exactly equivalent to large batch training?',
        answer: 'Almost, but not exactly. Differences: 1) Batch norm statistics (per mini-batch vs full batch), 2) Dropout masks (different per mini-batch), 3) Stochastic operations. For most purposes, it\'s equivalent enough. Gradients are averaged correctly. Main benefit: enables training that wouldn\'t fit in memory otherwise. Trade-off is training time.',
      },
      {
        question: 'How to implement gradient accumulation correctly?',
        answer: 'Key points: 1) Don\'t zero gradients between accumulation steps, 2) Scale loss by accumulation steps (or average gradients), 3) Update weights only after N steps, 4) Handle last batch if dataset size not divisible by effective batch size. PyTorch: loss.backward() accumulates automatically, just control when to call optimizer.step() and optimizer.zero_grad().',
      },
    ],
    commonMistakes: [
      'Zeroing gradients between accumulation steps',
      'Not scaling loss or gradients properly',
      'Forgetting about batch norm issues',
      'Not considering training time increase',
    ],
    relatedTopics: ['Data Parallelism', 'Batch Normalization', 'Large Batch Training', 'Memory Optimization'],
  },
  {
    id: 'compress-2',
    title: 'Model Pruning',
    category: 'Model Compression',
    difficulty: 'Intermediate',
    concept: 'Model pruning removes unnecessary weights or neurons from trained models, reducing size and computation while maintaining accuracy. It exploits redundancy in over-parameterized networks.',
    howItWorks: [
      {
        step: 'Train full model',
        explanation: 'Train large model to convergence. This is the teacher model.',
      },
      {
        step: 'Identify weights to prune',
        explanation: 'Magnitude-based: remove smallest weights. Structured: remove entire neurons/channels. Use importance scores.',
      },
      {
        step: 'Prune weights',
        explanation: 'Set selected weights to zero (unstructured) or remove neurons (structured). Typically prune 50-90%.',
      },
      {
        step: 'Fine-tune',
        explanation: 'Retrain remaining weights to recover accuracy. May need several prune-finetune cycles.',
      },
    ],
    intuition: 'Pruning is like editing a book. Remove unnecessary words (weights) while keeping the meaning (accuracy). The book becomes shorter and faster to read, but conveys the same information.',
    whenToUse: [
      'Deploying to edge devices',
      'When inference speed is critical',
      'To reduce model size',
      'When you have trained model to compress',
    ],
    tradeoffs: {
      pros: [
        'Reduces model size and computation',
        'Can prune 80-90% with minimal accuracy loss',
        'Works with existing models',
        'Structured pruning gives actual speedup',
      ],
      cons: [
        'Requires fine-tuning',
        'Unstructured pruning needs sparse libraries for speedup',
        'May not work well for all architectures',
        'Finding optimal pruning ratio requires experimentation',
      ],
    },
    visualAnalogy: 'Pruning is like trimming a tree. Remove dead branches (unimportant weights) to make it healthier and more manageable. The tree still grows and functions, just more efficiently.',
    interviewQuestions: [
      {
        question: 'What is the difference between structured and unstructured pruning?',
        answer: 'Unstructured: Remove individual weights anywhere. Creates sparse matrices. Higher compression but needs sparse libraries for speedup. Structured: Remove entire neurons, channels, or layers. Creates smaller dense matrices. Lower compression but immediate speedup on standard hardware. Unstructured: 90% sparsity possible. Structured: 50-70% typical. Choice depends on deployment target.',
      },
      {
        question: 'What is the Lottery Ticket Hypothesis?',
        answer: 'Lottery Ticket Hypothesis: Dense networks contain sparse subnetworks ("winning tickets") that can train to same accuracy when initialized correctly. Finding: pruned network with original initialization trains as well as full network. Implications: over-parameterization helps find good initialization, not just final model. Practical: iterative magnitude pruning can find these tickets. Controversial but influential.',
      },
      {
        question: 'How do you determine which weights to prune?',
        answer: 'Methods: 1) Magnitude-based: prune smallest weights (simple, effective), 2) Gradient-based: prune weights with small gradients, 3) Second-order: use Hessian information, 4) Learned: train pruning masks. Magnitude-based most common. For structured: prune channels with smallest L1/L2 norm. Can also use importance scores from training. Iterative pruning (prune-finetune-repeat) works better than one-shot.',
      },
    ],
    commonMistakes: [
      'Not fine-tuning after pruning (accuracy drops)',
      'Pruning too aggressively at once',
      'Using unstructured pruning without sparse support',
      'Not considering structured pruning for deployment',
    ],
    relatedTopics: ['Knowledge Distillation', 'Quantization', 'Model Compression', 'Lottery Ticket Hypothesis'],
  },
  {
    id: 'metric-2',
    title: 'ROC-AUC (Receiver Operating Characteristic - Area Under Curve)',
    category: 'Evaluation Metrics',
    difficulty: 'Intermediate',
    concept: 'ROC-AUC measures a classifier\'s ability to distinguish between classes across all classification thresholds. AUC of 1.0 is perfect, 0.5 is random. It\'s threshold-independent and handles class imbalance better than accuracy.',
    howItWorks: [
      {
        step: 'Compute predictions',
        explanation: 'Get probability scores for positive class (not binary predictions).',
      },
      {
        step: 'Vary threshold',
        explanation: 'For each possible threshold, compute TPR (True Positive Rate) and FPR (False Positive Rate). TPR = TP/(TP+FN), FPR = FP/(FP+TN).',
      },
      {
        step: 'Plot ROC curve',
        explanation: 'Plot TPR (y-axis) vs FPR (x-axis) for all thresholds. Curve shows trade-off between sensitivity and specificity.',
      },
      {
        step: 'Compute AUC',
        explanation: 'Calculate area under ROC curve. AUC = probability that model ranks random positive higher than random negative.',
      },
    ],
    intuition: 'ROC-AUC is like evaluating a security guard. How well can they distinguish threats (positives) from non-threats (negatives) at any alertness level (threshold)? Perfect guard (AUC=1) never mistakes them. Random guard (AUC=0.5) flips a coin.',
    whenToUse: [
      'Binary classification with class imbalance',
      'When you need threshold-independent metric',
      'Comparing models across different thresholds',
      'Medical diagnosis, fraud detection',
    ],
    tradeoffs: {
      pros: [
        'Threshold-independent',
        'Handles class imbalance well',
        'Single number summary',
        'Intuitive interpretation',
      ],
      cons: [
        'Only for binary classification',
        'Can be misleading with severe imbalance',
        'Doesn\'t show where model performs well',
        'Optimistic for imbalanced data',
      ],
    },
    visualAnalogy: 'ROC-AUC is like testing a metal detector at different sensitivity levels. High sensitivity catches all metal (high TPR) but many false alarms (high FPR). Low sensitivity misses some metal (low TPR) but fewer false alarms (low FPR). AUC measures overall detection ability.',
    interviewQuestions: [
      {
        question: 'What does AUC=0.7 mean?',
        answer: 'AUC=0.7 means: given a random positive and random negative example, the model assigns higher score to positive 70% of the time. Interpretation: 0.5=random, 0.7=fair, 0.8=good, 0.9=excellent, 1.0=perfect. Also: model can separate classes reasonably well. For imbalanced data, AUC>0.7 is often acceptable. Context matters - medical diagnosis needs higher AUC than ad click prediction.',
      },
      {
        question: 'ROC-AUC vs Precision-Recall AUC - when to use which?',
        answer: 'ROC-AUC: Uses FPR (includes TN). Good for balanced data. Can be optimistic for imbalanced data (many TN inflate FPR denominator). PR-AUC: Uses precision (no TN). Better for imbalanced data, focuses on positive class. Example: 1% positive class. ROC-AUC might be 0.95 (looks good), PR-AUC might be 0.3 (reveals poor positive class performance). Use PR-AUC for imbalanced data.',
      },
      {
        question: 'How do you interpret the ROC curve shape?',
        answer: 'Ideal: Curve hugs top-left corner (high TPR, low FPR). Random: Diagonal line (TPR=FPR). Below diagonal: Worse than random (flip predictions!). Steep initial rise: Good at high thresholds. Flat top: Poor at low thresholds. Can identify optimal threshold: point closest to top-left, or maximize Youden\'s J statistic (TPR-FPR). Different applications need different thresholds.',
      },
    ],
    commonMistakes: [
      'Using ROC-AUC for multi-class (need one-vs-rest or one-vs-one)',
      'Not considering PR-AUC for imbalanced data',
      'Thinking AUC alone is sufficient (check curve shape)',
      'Using AUC to select threshold (use business requirements)',
    ],
    relatedTopics: ['Precision-Recall Curve', 'Confusion Matrix', 'F1 Score', 'Class Imbalance'],
  },
];
