// Interview Deep Dives - Part 1
// Comprehensive explanations of ML/AI concepts for interview preparation

export interface DeepDiveTopic {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concept: string;
  howItWorks: {
    step: string;
    explanation: string;
  }[];
  intuition: string;
  whenToUse: string[];
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
  codeExample?: {
    language: string;
    code: string;
    explanation: string;
  };
  visualAnalogy: string;
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  commonMistakes: string[];
  relatedTopics: string[];
}

export const DEEP_DIVE_TOPICS_PART1: DeepDiveTopic[] = [
  // TRANSFORMERS & ATTENTION
  {
    id: 'attention-1',
    title: 'Self-Attention Mechanism',
    category: 'Transformers & Attention',
    difficulty: 'Intermediate',
    concept: 'Self-attention allows each position in a sequence to attend to all positions in the same sequence, computing a weighted sum based on relevance. It\'s the core mechanism in Transformers that enables parallel processing and long-range dependencies.',
    howItWorks: [
      {
        step: 'Create Query, Key, Value matrices',
        explanation: 'For each input token, create three vectors by multiplying with learned weight matrices WQ, WK, WV. Query = "what am I looking for?", Key = "what do I contain?", Value = "what information do I have?"',
      },
      {
        step: 'Calculate attention scores',
        explanation: 'Compute dot product between Query and all Keys: score = Q · K^T. This measures similarity between tokens. Higher score = more relevant.',
      },
      {
        step: 'Scale the scores',
        explanation: 'Divide scores by √d_k (square root of key dimension). This prevents gradients from becoming too small when d_k is large. Formula: scores / √d_k',
      },
      {
        step: 'Apply softmax',
        explanation: 'Convert scores to probabilities using softmax. This ensures attention weights sum to 1. Softmax(scores) gives attention distribution.',
      },
      {
        step: 'Weighted sum of Values',
        explanation: 'Multiply attention weights with Value vectors and sum. Output = Σ(attention_weight_i × Value_i). This creates context-aware representation.',
      },
    ],
    intuition: 'Think of self-attention like a group discussion where each person (token) decides how much to listen to every other person (including themselves). The Query is "what I want to know", Keys are "what others are talking about", and Values are "the actual information". You pay more attention to people discussing relevant topics.',
    whenToUse: [
      'When you need to capture long-range dependencies in sequences (e.g., understanding "it" refers to "cat" 50 words earlier)',
      'When parallel processing is important (unlike RNNs, attention can process all tokens simultaneously)',
      'For tasks requiring understanding of relationships between all elements (translation, summarization)',
      'When you want interpretability (attention weights show which tokens are important)',
    ],
    tradeoffs: {
      pros: [
        'Captures long-range dependencies without vanishing gradients',
        'Fully parallelizable - much faster training than RNNs',
        'Interpretable - can visualize attention weights',
        'No fixed context window - can attend to entire sequence',
      ],
      cons: [
        'O(n²) complexity in sequence length - expensive for long sequences',
        'Requires more memory than RNNs',
        'No inherent notion of position (needs positional encoding)',
        'Can be harder to train than simpler models',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn.functional as F

def self_attention(x, d_k):
    """
    Simple self-attention implementation
    x: input tensor of shape (batch, seq_len, d_model)
    d_k: dimension of key/query
    """
    batch_size, seq_len, d_model = x.shape
    
    # Linear projections (simplified - normally separate weights)
    Q = x  # Query: (batch, seq_len, d_model)
    K = x  # Key: (batch, seq_len, d_model)
    V = x  # Value: (batch, seq_len, d_model)
    
    # Calculate attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1))  # (batch, seq_len, seq_len)
    
    # Scale by sqrt(d_k)
    scores = scores / torch.sqrt(torch.tensor(d_k, dtype=torch.float32))
    
    # Apply softmax to get attention weights
    attention_weights = F.softmax(scores, dim=-1)  # (batch, seq_len, seq_len)
    
    # Weighted sum of values
    output = torch.matmul(attention_weights, V)  # (batch, seq_len, d_model)
    
    return output, attention_weights

# Example usage
batch_size, seq_len, d_model = 2, 5, 64
x = torch.randn(batch_size, seq_len, d_model)
output, weights = self_attention(x, d_k=64)

print(f"Input shape: {x.shape}")
print(f"Output shape: {output.shape}")
print(f"Attention weights shape: {weights.shape}")
print(f"Attention weights for first sequence:\\n{weights[0]}")`,
      explanation: 'This code shows the core self-attention computation. In practice, you\'d have separate learned weight matrices for Q, K, V projections. The attention weights matrix shows how much each token attends to every other token.',
    },
    visualAnalogy: 'Imagine a classroom where students are working on a group project. Each student (token) looks around the room and decides how much to pay attention to each classmate based on relevance. The Query is their question, Keys are what each classmate knows about, and Values are the actual knowledge. Students naturally pay more attention to classmates with relevant expertise (high attention weights).',
    interviewQuestions: [
      {
        question: 'Why do we scale attention scores by √d_k?',
        answer: 'When d_k is large, dot products grow large in magnitude, pushing softmax into regions with extremely small gradients. Scaling by √d_k keeps the variance of scores around 1, preventing gradient vanishing. Without scaling, softmax would output near-one-hot distributions, making training difficult.',
      },
      {
        question: 'What\'s the difference between self-attention and cross-attention?',
        answer: 'Self-attention: Q, K, V all come from the same sequence (e.g., encoder attending to itself). Cross-attention: Q comes from one sequence, K and V from another (e.g., decoder attending to encoder outputs). Self-attention captures intra-sequence relationships, cross-attention captures inter-sequence relationships.',
      },
      {
        question: 'How does attention complexity scale with sequence length?',
        answer: 'O(n²) in both time and memory, where n is sequence length. Computing attention scores requires n×n matrix (each token attends to all tokens). This becomes prohibitive for long sequences (>10K tokens). Solutions: sparse attention, linear attention, or chunking.',
      },
      {
        question: 'Can you explain attention in one sentence?',
        answer: 'Attention is a weighted average of values, where weights are computed from the similarity between queries and keys, allowing the model to focus on relevant parts of the input.',
      },
    ],
    commonMistakes: [
      'Forgetting to scale by √d_k - leads to vanishing gradients',
      'Not masking future tokens in decoder (causal attention) - causes information leakage',
      'Confusing attention weights with importance - high attention doesn\'t always mean important',
      'Thinking attention replaces all other mechanisms - it\'s one tool, not a silver bullet',
      'Not considering memory constraints for long sequences',
    ],
    relatedTopics: ['Multi-Head Attention', 'Positional Encoding', 'Transformer Architecture', 'Cross-Attention', 'Masked Attention'],
  },
  {
    id: 'attention-2',
    title: 'Multi-Head Attention',
    category: 'Transformers & Attention',
    difficulty: 'Intermediate',
    concept: 'Multi-head attention runs multiple attention mechanisms in parallel, each learning different aspects of relationships. It\'s like having multiple experts, each focusing on different patterns (syntax, semantics, long-range, short-range dependencies).',
    howItWorks: [
      {
        step: 'Create multiple sets of Q, K, V projections',
        explanation: 'Instead of one set of weight matrices, create h sets (typically 8 or 16). Each head has its own WQ_i, WK_i, WV_i matrices with smaller dimensions (d_model/h).',
      },
      {
        step: 'Run attention in parallel',
        explanation: 'Compute self-attention independently for each head. Each head learns to attend to different aspects. Head 1 might focus on syntax, Head 2 on semantics, etc.',
      },
      {
        step: 'Concatenate head outputs',
        explanation: 'Combine outputs from all heads: Concat(head_1, head_2, ..., head_h). This creates a vector of size d_model.',
      },
      {
        step: 'Final linear projection',
        explanation: 'Apply learned weight matrix WO to concatenated output. This allows heads to interact and combine their information.',
      },
    ],
    intuition: 'Think of multi-head attention like consulting multiple experts for a complex problem. One expert focuses on grammar, another on meaning, another on context. Each expert (head) provides their perspective, then you combine all insights for a comprehensive understanding.',
    whenToUse: [
      'In Transformer models (BERT, GPT, T5) - it\'s a core component',
      'When you want to capture different types of relationships simultaneously',
      'For complex tasks requiring multiple perspectives (translation, reasoning)',
      'When you have enough data to train multiple attention heads',
    ],
    tradeoffs: {
      pros: [
        'Captures different relationship types simultaneously',
        'More expressive than single-head attention',
        'Heads can specialize (syntax, semantics, position)',
        'Improves model robustness',
      ],
      cons: [
        'More parameters to train (h times more)',
        'Increased computational cost',
        'Harder to interpret (which head does what?)',
        'Diminishing returns beyond 16-32 heads',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        # Linear projections for Q, K, V
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        
        # Output projection
        self.W_o = nn.Linear(d_model, d_model)
        
    def split_heads(self, x):
        """Split into multiple heads"""
        batch_size, seq_len, d_model = x.shape
        # Reshape to (batch, seq_len, num_heads, d_k)
        x = x.view(batch_size, seq_len, self.num_heads, self.d_k)
        # Transpose to (batch, num_heads, seq_len, d_k)
        return x.transpose(1, 2)
    
    def forward(self, x):
        batch_size = x.shape[0]
        
        # Linear projections
        Q = self.W_q(x)  # (batch, seq_len, d_model)
        K = self.W_k(x)
        V = self.W_v(x)
        
        # Split into multiple heads
        Q = self.split_heads(Q)  # (batch, num_heads, seq_len, d_k)
        K = self.split_heads(K)
        V = self.split_heads(V)
        
        # Scaled dot-product attention for each head
        scores = torch.matmul(Q, K.transpose(-2, -1)) / torch.sqrt(torch.tensor(self.d_k))
        attention_weights = torch.softmax(scores, dim=-1)
        attention_output = torch.matmul(attention_weights, V)
        
        # Concatenate heads
        attention_output = attention_output.transpose(1, 2).contiguous()
        attention_output = attention_output.view(batch_size, -1, self.d_model)
        
        # Final linear projection
        output = self.W_o(attention_output)
        
        return output, attention_weights

# Example usage
d_model, num_heads = 512, 8
mha = MultiHeadAttention(d_model, num_heads)
x = torch.randn(2, 10, d_model)  # (batch, seq_len, d_model)
output, weights = mha(x)

print(f"Input shape: {x.shape}")
print(f"Output shape: {output.shape}")
print(f"Attention weights shape: {weights.shape}")  # (batch, num_heads, seq_len, seq_len)`,
      explanation: 'This implementation shows how multi-head attention splits the d_model dimension across heads, computes attention in parallel, then concatenates and projects. Each head operates on d_k = d_model/num_heads dimensions.',
    },
    visualAnalogy: 'Imagine reading a complex legal document. You might read it multiple times with different focuses: once for legal terms, once for dates and deadlines, once for parties involved, once for obligations. Each reading (head) extracts different information. Finally, you combine all insights for complete understanding.',
    interviewQuestions: [
      {
        question: 'Why use multiple heads instead of one large head?',
        answer: 'Multiple heads allow the model to attend to different representation subspaces simultaneously. One head might focus on syntactic relationships, another on semantic similarity, another on positional patterns. A single large head would need to learn all these patterns in one space, which is harder. It\'s like having specialized experts vs one generalist.',
      },
      {
        question: 'How many heads should you use?',
        answer: 'Typically 8-16 heads for most models. BERT uses 12, GPT-3 uses 96 (for very large d_model). More heads = more expressiveness but also more parameters and computation. Diminishing returns beyond 16-32 heads for typical models. Rule of thumb: num_heads should divide d_model evenly.',
      },
      {
        question: 'Do different heads learn different patterns?',
        answer: 'Yes, empirically heads specialize. Some focus on positional patterns (attending to adjacent tokens), others on syntactic relationships (subject-verb), others on semantic similarity. However, this specialization emerges during training - it\'s not explicitly programmed. Visualization of attention weights reveals these patterns.',
      },
    ],
    commonMistakes: [
      'd_model not divisible by num_heads - causes dimension mismatch',
      'Forgetting to transpose when splitting/concatenating heads',
      'Not scaling attention scores in each head',
      'Thinking more heads always = better (diminishing returns)',
      'Not using separate projections for each head',
    ],
    relatedTopics: ['Self-Attention', 'Transformer Architecture', 'Attention Visualization', 'Grouped-Query Attention'],
  },
  {
    id: 'attention-3',
    title: 'Positional Encoding',
    category: 'Transformers & Attention',
    difficulty: 'Intermediate',
    concept: 'Positional encoding adds information about token positions to embeddings, since attention has no inherent notion of order. It uses sinusoidal functions to create unique, learnable position representations that generalize to unseen sequence lengths.',
    howItWorks: [
      {
        step: 'Generate position indices',
        explanation: 'For sequence length n, create position indices [0, 1, 2, ..., n-1]. Each position gets a unique encoding.',
      },
      {
        step: 'Apply sinusoidal functions',
        explanation: 'For each position pos and dimension i: PE(pos, 2i) = sin(pos / 10000^(2i/d_model)), PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model)). Even dimensions use sine, odd use cosine.',
      },
      {
        step: 'Add to token embeddings',
        explanation: 'Add positional encoding to token embeddings: final_embedding = token_embedding + positional_encoding. This injects position information.',
      },
    ],
    intuition: 'Imagine reading a book where all pages are shuffled. You need page numbers to understand the story order. Positional encoding is like adding page numbers to each word, but in a clever way that the model can learn from. The sinusoidal pattern creates a unique "fingerprint" for each position.',
    whenToUse: [
      'In Transformer models (required for attention to understand order)',
      'When sequence order matters (language, time series)',
      'For tasks requiring positional awareness (question answering, translation)',
      'When you want to generalize to longer sequences than seen in training',
    ],
    tradeoffs: {
      pros: [
        'Generalizes to unseen sequence lengths',
        'No additional parameters to learn',
        'Smooth, continuous representation',
        'Relative positions can be computed (sin/cos properties)',
      ],
      cons: [
        'Fixed formula - not adaptive to data',
        'May not be optimal for all tasks',
        'Learned positional embeddings sometimes work better',
        'Adds to input, potentially interfering with token embeddings',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import math

def positional_encoding(seq_len, d_model):
    """
    Generate sinusoidal positional encoding
    seq_len: sequence length
    d_model: embedding dimension
    """
    # Create position indices [0, 1, 2, ..., seq_len-1]
    position = torch.arange(seq_len).unsqueeze(1)  # (seq_len, 1)
    
    # Create dimension indices [0, 2, 4, ..., d_model-2]
    div_term = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))
    
    # Initialize positional encoding matrix
    pe = torch.zeros(seq_len, d_model)
    
    # Apply sine to even dimensions
    pe[:, 0::2] = torch.sin(position * div_term)
    
    # Apply cosine to odd dimensions
    pe[:, 1::2] = torch.cos(position * div_term)
    
    return pe

# Example usage
seq_len, d_model = 100, 512
pe = positional_encoding(seq_len, d_model)

print(f"Positional encoding shape: {pe.shape}")
print(f"First position encoding: {pe[0, :10]}")
print(f"Last position encoding: {pe[-1, :10]}")

# Visualize pattern
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 6))
plt.imshow(pe[:50, :50].numpy(), cmap='RdBu', aspect='auto')
plt.xlabel('Embedding Dimension')
plt.ylabel('Position')
plt.title('Positional Encoding Pattern')
plt.colorbar()
plt.show()`,
      explanation: 'This code generates sinusoidal positional encodings. The pattern creates unique encodings for each position, with smooth transitions. Lower dimensions change slowly (capture long-range patterns), higher dimensions change quickly (capture local patterns).',
    },
    visualAnalogy: 'Think of positional encoding like a barcode. Each position has a unique pattern of lines (sine/cosine waves). Just like a barcode scanner can identify products, the model can identify positions. The clever part: nearby positions have similar barcodes, so the model learns that position 5 is close to position 6.',
    interviewQuestions: [
      {
        question: 'Why use sine and cosine instead of simple position numbers?',
        answer: 'Simple numbers (0, 1, 2, ...) don\'t work well because: 1) They grow unbounded (position 1000 >> position 1), 2) No notion of relative distance, 3) Don\'t generalize to unseen lengths. Sine/cosine are bounded [-1, 1], periodic, and their mathematical properties allow computing relative positions: PE(pos+k) can be expressed as linear function of PE(pos).',
      },
      {
        question: 'What\'s the difference between positional encoding and positional embedding?',
        answer: 'Positional encoding: Fixed sinusoidal functions, no learnable parameters, generalizes to any length. Positional embedding: Learned vectors for each position, requires training, limited to max length seen in training. BERT uses learned embeddings (max 512), GPT uses sinusoidal encoding. Trade-off: learned can be more task-specific, sinusoidal more general.',
      },
      {
        question: 'Why add positional encoding to embeddings instead of concatenating?',
        answer: 'Adding preserves dimensionality (d_model stays same), while concatenating doubles it (2×d_model). Addition is simpler and works well in practice. The model learns to separate positional and semantic information through training. Some models (like T5) use relative positional encodings in attention instead.',
      },
    ],
    commonMistakes: [
      'Using learned embeddings for variable-length sequences',
      'Not normalizing positional encodings properly',
      'Forgetting to add positional encoding in decoder',
      'Thinking positional encoding alone solves order - attention still needed',
      'Not considering alternative approaches (relative, rotary)',
    ],
    relatedTopics: ['Transformer Architecture', 'Rotary Position Embedding (RoPE)', 'Relative Positional Encoding', 'ALiBi'],
  },
];
