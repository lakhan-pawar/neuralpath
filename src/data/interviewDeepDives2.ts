// Interview Deep Dives - Part 2
// Training Techniques & Optimization

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART2: DeepDiveTopic[] = [
  // TRAINING TECHNIQUES
  {
    id: 'training-1',
    title: 'Backpropagation',
    category: 'Training Techniques',
    difficulty: 'Intermediate',
    concept: 'Backpropagation is the algorithm for computing gradients in neural networks using the chain rule. It efficiently calculates how much each weight contributed to the error, enabling gradient descent optimization.',
    howItWorks: [
      {
        step: 'Forward pass',
        explanation: 'Compute predictions by passing input through network layers. Store intermediate activations (needed for backward pass). Calculate loss by comparing predictions with targets.',
      },
      {
        step: 'Compute output gradient',
        explanation: 'Calculate gradient of loss with respect to output: ∂L/∂y. This tells us how loss changes with output.',
      },
      {
        step: 'Backward pass through layers',
        explanation: 'For each layer (from output to input), compute gradients using chain rule: ∂L/∂W = ∂L/∂y × ∂y/∂W. Pass gradient backward to previous layer.',
      },
      {
        step: 'Update weights',
        explanation: 'Use computed gradients to update weights: W_new = W_old - learning_rate × ∂L/∂W. This moves weights in direction that reduces loss.',
      },
    ],
    intuition: 'Imagine hiking down a mountain in fog. You can only see your immediate surroundings (local gradient). Backpropagation is like retracing your steps to figure out which direction led you downhill. Each step back tells you how much that decision contributed to your descent.',
    whenToUse: [
      'Training any neural network (it\'s the standard algorithm)',
      'When you need efficient gradient computation',
      'For models with differentiable operations',
      'When automatic differentiation is available (PyTorch, TensorFlow)',
    ],
    tradeoffs: {
      pros: [
        'Efficient - computes all gradients in one backward pass',
        'Exact gradients (not approximations)',
        'Works for any network architecture',
        'Enables deep learning at scale',
      ],
      cons: [
        'Requires storing activations (memory intensive)',
        'Can suffer from vanishing/exploding gradients',
        'Needs differentiable operations',
        'Sequential computation (can\'t fully parallelize)',
      ],
    },
    visualAnalogy: 'Think of backpropagation like debugging code. When your program crashes, you trace back through the call stack to find where the error originated. Each function call (layer) tells you how it contributed to the final error. You then fix (update) each function based on its contribution.',
    interviewQuestions: [
      {
        question: 'Explain backpropagation in simple terms',
        answer: 'Backpropagation calculates how much each weight in the network contributed to the error. It works backward from the output, using the chain rule to compute gradients layer by layer. These gradients tell us how to adjust weights to reduce the error.',
      },
      {
        question: 'What is the vanishing gradient problem?',
        answer: 'In deep networks, gradients can become extremely small as they propagate backward through many layers. This happens when activation functions (like sigmoid) have derivatives <1, which get multiplied together. Result: early layers learn very slowly or not at all. Solutions: ReLU activation, residual connections, batch normalization.',
      },
      {
        question: 'Why do we need to store activations during forward pass?',
        answer: 'Backpropagation needs activation values to compute gradients. For example, to compute ∂L/∂W for a layer, we need the input to that layer (from forward pass). Storing activations trades memory for computation speed. Gradient checkpointing can reduce memory by recomputing some activations.',
      },
    ],
    commonMistakes: [
      'Forgetting to zero gradients between batches (gradients accumulate)',
      'Not detaching tensors when needed (creates unnecessary computation graph)',
      'Modifying tensors in-place during forward pass (breaks gradient computation)',
      'Not understanding that backprop is just chain rule applied systematically',
    ],
    relatedTopics: ['Gradient Descent', 'Chain Rule', 'Automatic Differentiation', 'Gradient Checkpointing'],
  },
  {
    id: 'training-2',
    title: 'Batch Normalization',
    category: 'Training Techniques',
    difficulty: 'Intermediate',
    concept: 'Batch Normalization normalizes layer inputs across a mini-batch, reducing internal covariate shift. It stabilizes training, allows higher learning rates, and acts as regularization.',
    howItWorks: [
      {
        step: 'Compute batch statistics',
        explanation: 'For each feature, calculate mean μ and variance σ² across the batch. These are the batch statistics.',
      },
      {
        step: 'Normalize',
        explanation: 'Normalize each feature: x_norm = (x - μ) / √(σ² + ε). This centers data at 0 with unit variance. ε prevents division by zero.',
      },
      {
        step: 'Scale and shift',
        explanation: 'Apply learned parameters γ (scale) and β (shift): y = γ × x_norm + β. This allows the network to undo normalization if needed.',
      },
      {
        step: 'Update running statistics',
        explanation: 'During training, maintain running mean and variance using exponential moving average. Used during inference when batch statistics aren\'t available.',
      },
    ],
    intuition: 'Imagine students taking exams from different teachers with different grading scales. Batch normalization is like converting all grades to the same scale (z-scores) so they\'re comparable. The network can then learn from normalized, consistent inputs.',
    whenToUse: [
      'Training deep networks (>10 layers)',
      'When training is unstable or slow',
      'To enable higher learning rates',
      'For convolutional networks (very common)',
    ],
    tradeoffs: {
      pros: [
        'Faster training (can use higher learning rates)',
        'Reduces sensitivity to initialization',
        'Acts as regularization (slight noise from batch statistics)',
        'Reduces internal covariate shift',
      ],
      cons: [
        'Adds computation overhead',
        'Behavior differs between training and inference',
        'Doesn\'t work well with small batches',
        'Can hurt performance in some cases (RNNs, GANs)',
      ],
    },
    interviewQuestions: [
      {
        question: 'Why does batch normalization help training?',
        answer: 'It reduces internal covariate shift - the change in distribution of layer inputs during training. By normalizing, each layer receives inputs with consistent statistics, making optimization easier. It also smooths the loss landscape, allowing higher learning rates. The slight noise from batch statistics acts as regularization.',
      },
      {
        question: 'What happens during inference when there\'s no batch?',
        answer: 'During inference, we use running statistics (mean and variance) computed during training via exponential moving average. We don\'t compute batch statistics because: 1) batch size might be 1, 2) we want deterministic outputs. The running statistics approximate population statistics.',
      },
      {
        question: 'Where should you place batch normalization in a layer?',
        answer: 'Typically after linear/conv layer, before activation: Conv → BatchNorm → ReLU. Original paper suggested before activation, but after works better in practice. For residual networks, it\'s often placed after addition. Placement affects training dynamics.',
      },
    ],
    commonMistakes: [
      'Using batch norm with very small batches (<8) - statistics unreliable',
      'Forgetting to set model.eval() during inference - uses wrong statistics',
      'Not understanding train vs eval mode differences',
      'Using batch norm in RNNs (layer norm is better)',
    ],
    visualAnalogy: 'Batch normalization is like grading on a curve. Instead of absolute scores (which vary by teacher/test difficulty), you convert to percentiles or z-scores. This makes scores comparable across different contexts. The network learns from normalized, consistent inputs.',
    relatedTopics: ['Layer Normalization', 'Group Normalization', 'Instance Normalization', 'Weight Normalization'],
  },
  {
    id: 'training-3',
    title: 'Dropout',
    category: 'Training Techniques',
    difficulty: 'Beginner',
    concept: 'Dropout randomly sets a fraction of neurons to zero during training, preventing co-adaptation and reducing overfitting. It\'s like training an ensemble of networks that share weights.',
    howItWorks: [
      {
        step: 'During training: randomly drop neurons',
        explanation: 'For each training batch, randomly set p% of neurons to zero (typically p=0.5). Different neurons dropped each batch. Remaining neurons scaled by 1/(1-p) to maintain expected output.',
      },
      {
        step: 'Forward pass with dropped neurons',
        explanation: 'Compute forward pass with reduced network. Dropped neurons don\'t contribute to output or gradients.',
      },
      {
        step: 'Backward pass',
        explanation: 'Gradients only flow through active neurons. Dropped neurons don\'t receive gradient updates.',
      },
      {
        step: 'During inference: use all neurons',
        explanation: 'At test time, use all neurons (no dropout). Outputs are already scaled correctly from training.',
      },
    ],
    intuition: 'Imagine a sports team where random players sit out each game. The team learns to not rely on any single player - everyone must contribute. This makes the team more robust. Similarly, dropout prevents the network from relying too heavily on specific neurons.',
    whenToUse: [
      'When model is overfitting (train accuracy >> test accuracy)',
      'In fully connected layers (less common in conv layers)',
      'For medium to large networks with sufficient capacity',
      'When you have limited training data',
    ],
    tradeoffs: {
      pros: [
        'Effective regularization - reduces overfitting',
        'Simple to implement',
        'Acts like training ensemble of networks',
        'No additional parameters',
      ],
      cons: [
        'Increases training time (need more epochs)',
        'Adds noise to training',
        'Not as effective for small networks',
        'Can hurt performance if used incorrectly',
      ],
    },
    interviewQuestions: [
      {
        question: 'Why does dropout reduce overfitting?',
        answer: 'Dropout prevents co-adaptation - neurons can\'t rely on specific other neurons being present. This forces the network to learn more robust features that work with different subsets of neurons. It\'s like training an ensemble of 2^n networks (where n is number of neurons) that share weights, which reduces variance.',
      },
      {
        question: 'Why do we scale activations during training?',
        answer: 'With dropout rate p, only (1-p) fraction of neurons are active. To maintain the same expected output, we scale by 1/(1-p). For example, with p=0.5, we scale by 2. This ensures the output magnitude is similar with and without dropout, making inference consistent with training.',
      },
      {
        question: 'When should you NOT use dropout?',
        answer: 'Don\'t use dropout: 1) In batch normalization layers (they already regularize), 2) In convolutional layers (spatial dropout is better), 3) In small networks (reduces capacity too much), 4) In output layer, 5) When model is underfitting. Also, modern architectures often use other regularization methods.',
      },
    ],
    commonMistakes: [
      'Using dropout during inference (should be disabled)',
      'Not scaling activations properly',
      'Using too high dropout rate (>0.5) - loses too much information',
      'Applying dropout to every layer (usually only fully connected)',
      'Forgetting model.eval() in PyTorch (dropout stays active)',
    ],
    visualAnalogy: 'Dropout is like a sports team where random players sit out each game. The team learns to not rely on any single player - everyone must contribute. This makes the team more robust. Similarly, dropout prevents the network from relying too heavily on specific neurons.',
    relatedTopics: ['Regularization', 'DropConnect', 'Spatial Dropout', 'Stochastic Depth'],
  },
];
