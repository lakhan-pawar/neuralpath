// Interview Deep Dives - Part 9
// NLP Techniques, Sequence Models, Attention Variants

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART9: DeepDiveTopic[] = [
  {
    id: 'nlp-1',
    title: 'Beam Search',
    category: 'NLP Techniques',
    difficulty: 'Intermediate',
    concept: 'Beam search is a heuristic search algorithm for sequence generation that maintains top-k most likely sequences at each step. It balances between greedy search (k=1) and exhaustive search (k=∞), improving generation quality.',
    howItWorks: [
      {
        step: 'Initialize with start token',
        explanation: 'Begin with k beams, all starting with <START> token. Each beam has a score (log probability).',
      },
      {
        step: 'Expand each beam',
        explanation: 'For each beam, generate all possible next tokens. Compute score for each extension: beam_score + log P(token|context).',
      },
      {
        step: 'Keep top-k beams',
        explanation: 'From all expanded beams, keep only k beams with highest scores. This prunes unlikely sequences.',
      },
      {
        step: 'Repeat until end',
        explanation: 'Continue expanding and pruning until all beams generate <END> token or reach max length.',
      },
      {
        step: 'Select best sequence',
        explanation: 'Return beam with highest score. Optionally normalize by length to avoid bias toward shorter sequences.',
      },
    ],
    intuition: 'Beam search is like exploring a maze with k friends. At each fork, everyone tries different paths. You keep only the k most promising paths and abandon the rest. This is more thorough than following one path (greedy) but faster than trying every path.',
    whenToUse: [
      'Machine translation',
      'Text summarization',
      'Image captioning',
      'When generation quality matters more than speed',
    ],
    tradeoffs: {
      pros: [
        'Better quality than greedy search',
        'More efficient than exhaustive search',
        'Tunable trade-off (beam width k)',
        'Widely used and understood',
      ],
      cons: [
        'Slower than greedy search (k times)',
        'Can still miss optimal sequence',
        'May generate generic/safe outputs',
        'Requires more memory (store k beams)',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn.functional as F
from transformers import GPT2LMHeadModel, GPT2Tokenizer

def beam_search(model, tokenizer, prompt, beam_width=5, max_length=50):
    """
    Simple beam search implementation
    """
    device = model.device
    input_ids = tokenizer.encode(prompt, return_tensors='pt').to(device)
    
    # Initialize beams: (sequence, score)
    beams = [(input_ids, 0.0)]
    
    for _ in range(max_length):
        all_candidates = []
        
        # Expand each beam
        for seq, score in beams:
            # Get next token probabilities
            with torch.no_grad():
                outputs = model(seq)
                logits = outputs.logits[:, -1, :]
                log_probs = F.log_softmax(logits, dim=-1)
            
            # Get top-k tokens
            top_log_probs, top_indices = torch.topk(log_probs, beam_width)
            
            # Create new candidates
            for log_prob, token_id in zip(top_log_probs[0], top_indices[0]):
                new_seq = torch.cat([seq, token_id.unsqueeze(0).unsqueeze(0)], dim=1)
                new_score = score + log_prob.item()
                all_candidates.append((new_seq, new_score))
        
        # Keep top-k beams
        beams = sorted(all_candidates, key=lambda x: x[1], reverse=True)[:beam_width]
        
        # Check if all beams ended
        if all(seq[0, -1].item() == tokenizer.eos_token_id for seq, _ in beams):
            break
    
    # Return best beam
    best_seq, best_score = beams[0]
    return tokenizer.decode(best_seq[0], skip_special_tokens=True)

# Example usage
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model.eval()

prompt = "The future of AI is"

# Greedy search (beam_width=1)
greedy_output = beam_search(model, tokenizer, prompt, beam_width=1, max_length=20)
print(f"Greedy: {greedy_output}")

# Beam search (beam_width=5)
beam_output = beam_search(model, tokenizer, prompt, beam_width=5, max_length=20)
print(f"Beam: {beam_output}")

# Using Hugging Face generate
output = model.generate(
    tokenizer.encode(prompt, return_tensors='pt'),
    max_length=50,
    num_beams=5,  # Beam width
    early_stopping=True,
    no_repeat_ngram_size=2  # Avoid repetition
)
print(f"HF Beam: {tokenizer.decode(output[0], skip_special_tokens=True)}")`,
      explanation: 'Beam search maintains k sequences, expands each, and keeps top-k. Hugging Face\'s generate() implements optimized beam search with additional features like length normalization and repetition penalty.',
    },
    visualAnalogy: 'Beam search is like planning a road trip with friends. At each city, you consider k different routes. You keep only the k most promising routes (shortest time, best scenery) and discard others. This is smarter than following one route blindly (greedy) but faster than checking every possible route.',
    interviewQuestions: [
      {
        question: 'Why does beam search sometimes produce generic outputs?',
        answer: 'Beam search maximizes probability, which favors safe, common sequences. Example: "I don\'t know" is high probability but boring. Solutions: 1) Sampling methods (top-k, nucleus), 2) Diverse beam search (penalize similar beams), 3) Length normalization (avoid short sequences), 4) Temperature scaling. For creative tasks, sampling often works better than beam search.',
      },
      {
        question: 'What is length normalization in beam search?',
        answer: 'Without normalization, beam search favors shorter sequences (fewer terms in product = higher probability). Length normalization: score = log_prob / length^α, where α ∈ [0,1]. α=0: no normalization, α=1: full normalization. Typical α=0.6-0.8. This encourages longer, more complete outputs. Essential for tasks like translation where length matters.',
      },
      {
        question: 'Beam search vs sampling - when to use which?',
        answer: 'Beam search: Deterministic, maximizes probability, good for tasks with "correct" answer (translation, summarization). Sampling (top-k, nucleus): Stochastic, explores diverse outputs, good for creative tasks (story generation, dialogue). Beam search can be repetitive and generic. Sampling adds variety but may be incoherent. Hybrid: use beam search with sampling (sample from top-k beams).',
      },
    ],
    commonMistakes: [
      'Using beam_width=1 (that\'s just greedy search)',
      'Not normalizing by length (favors short sequences)',
      'Using beam search for creative tasks (sampling is better)',
      'Not handling end-of-sequence tokens properly',
      'Setting beam_width too high (diminishing returns, slow)',
    ],
    relatedTopics: ['Greedy Search', 'Top-k Sampling', 'Nucleus Sampling', 'Diverse Beam Search'],
  },
  {
    id: 'seq-1',
    title: 'LSTM (Long Short-Term Memory)',
    category: 'Sequence Models',
    difficulty: 'Intermediate',
    concept: 'LSTM is a recurrent neural network architecture with gating mechanisms that selectively remember or forget information. It solves the vanishing gradient problem in vanilla RNNs, enabling learning of long-term dependencies.',
    howItWorks: [
      {
        step: 'Forget gate',
        explanation: 'Decides what information to discard from cell state. f_t = σ(W_f · [h_{t-1}, x_t] + b_f). Output between 0 (forget) and 1 (keep).',
      },
      {
        step: 'Input gate',
        explanation: 'Decides what new information to store. i_t = σ(W_i · [h_{t-1}, x_t] + b_i). Candidate values: C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C).',
      },
      {
        step: 'Update cell state',
        explanation: 'Combine forget and input: C_t = f_t * C_{t-1} + i_t * C̃_t. Forget old info, add new info.',
      },
      {
        step: 'Output gate',
        explanation: 'Decides what to output. o_t = σ(W_o · [h_{t-1}, x_t] + b_o). Hidden state: h_t = o_t * tanh(C_t).',
      },
    ],
    intuition: 'LSTM is like a smart notebook. Forget gate erases irrelevant notes. Input gate writes new notes. Cell state is the notebook content. Output gate decides what to share. This selective memory allows remembering important info from long ago while forgetting noise.',
    whenToUse: [
      'Time series forecasting',
      'Speech recognition',
      'Machine translation (before transformers)',
      'When you have sequential data with long-term dependencies',
    ],
    tradeoffs: {
      pros: [
        'Handles long-term dependencies',
        'Solves vanishing gradient problem',
        'Selective memory via gates',
        'Works well for many sequence tasks',
      ],
      cons: [
        'Sequential computation (slow, can\'t parallelize)',
        'More parameters than vanilla RNN',
        'Superseded by transformers for many tasks',
        'Still struggles with very long sequences (>1000 steps)',
      ],
    },
    codeExample: {
      language: 'python',
      code: `import torch
import torch.nn as nn

# PyTorch LSTM
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=0.2 if num_layers > 1 else 0
        )
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        # x: (batch, seq_len, input_size)
        lstm_out, (h_n, c_n) = self.lstm(x)
        # lstm_out: (batch, seq_len, hidden_size)
        # h_n: (num_layers, batch, hidden_size)
        # c_n: (num_layers, batch, hidden_size)
        
        # Use last time step
        out = self.fc(lstm_out[:, -1, :])
        return out

# Example: Time series prediction
model = LSTMModel(input_size=10, hidden_size=64, num_layers=2, output_size=1)

# Input: batch_size=32, sequence_length=50, features=10
x = torch.randn(32, 50, 10)
output = model(x)  # (32, 1)

# Manual LSTM cell implementation
class LSTMCell(nn.Module):
    def __init__(self, input_size, hidden_size):
        super().__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        
        # Gates: forget, input, output, cell
        self.W_f = nn.Linear(input_size + hidden_size, hidden_size)
        self.W_i = nn.Linear(input_size + hidden_size, hidden_size)
        self.W_o = nn.Linear(input_size + hidden_size, hidden_size)
        self.W_c = nn.Linear(input_size + hidden_size, hidden_size)
    
    def forward(self, x, h_prev, c_prev):
        # Concatenate input and previous hidden state
        combined = torch.cat([x, h_prev], dim=1)
        
        # Forget gate
        f_t = torch.sigmoid(self.W_f(combined))
        
        # Input gate
        i_t = torch.sigmoid(self.W_i(combined))
        
        # Candidate cell state
        c_tilde = torch.tanh(self.W_c(combined))
        
        # Update cell state
        c_t = f_t * c_prev + i_t * c_tilde
        
        # Output gate
        o_t = torch.sigmoid(self.W_o(combined))
        
        # Hidden state
        h_t = o_t * torch.tanh(c_t)
        
        return h_t, c_t

# Bidirectional LSTM
bilstm = nn.LSTM(input_size=10, hidden_size=64, num_layers=2, 
                 batch_first=True, bidirectional=True)
x = torch.randn(32, 50, 10)
output, (h_n, c_n) = bilstm(x)
# output: (32, 50, 128)  # 128 = 64*2 (forward + backward)`,
      explanation: 'PyTorch LSTM is easy to use. The manual implementation shows the gating mechanism. Bidirectional LSTM processes sequence in both directions, useful for tasks where future context helps (e.g., NER, not generation).',
    },
    visualAnalogy: 'LSTM is like a conveyor belt with quality control. Items (information) move along the belt (cell state). Inspectors (gates) decide: discard defective items (forget gate), add new items (input gate), and what to ship (output gate). This selective process maintains quality over long production runs.',
    interviewQuestions: [
      {
        question: 'How does LSTM solve the vanishing gradient problem?',
        answer: 'Vanilla RNN: gradient multiplied by weight matrix at each step, vanishes exponentially. LSTM: cell state has additive updates (C_t = f_t * C_{t-1} + i_t * C̃_t), not multiplicative. Gradient flows through addition, not multiplication. Forget gate can be close to 1, allowing gradient to flow unchanged. This creates "gradient highways" for long-term dependencies. However, LSTM doesn\'t completely solve it - still struggles with 1000+ steps.',
      },
      {
        question: 'What is the difference between LSTM and GRU?',
        answer: 'GRU (Gated Recurrent Unit): Simpler variant with 2 gates (reset, update) vs LSTM\'s 3 (forget, input, output). GRU has no separate cell state. Fewer parameters, faster training. Performance: similar on most tasks, GRU sometimes better on smaller datasets. LSTM more expressive, GRU more efficient. Rule of thumb: try GRU first (simpler), use LSTM if you need more capacity.',
      },
      {
        question: 'Why have transformers largely replaced LSTMs?',
        answer: 'Transformers: 1) Parallel computation (process all tokens simultaneously), 2) Better long-range dependencies via attention, 3) No vanishing gradients, 4) Scale better with data and compute. LSTMs: Sequential (slow), limited context window, still have gradient issues for very long sequences. For most NLP tasks, transformers are now standard. LSTMs still used for: streaming applications, very long sequences (>10K), resource-constrained environments.',
      },
    ],
    commonMistakes: [
      'Not initializing hidden and cell states properly',
      'Forgetting to detach hidden state between batches (memory leak)',
      'Using LSTM for tasks where transformers are better',
      'Not using bidirectional LSTM when future context is available',
      'Ignoring gradient clipping (can still explode)',
    ],
    relatedTopics: ['GRU', 'Vanilla RNN', 'Bidirectional LSTM', 'Attention Mechanism'],
  },
  {
    id: 'attn-1',
    title: 'Flash Attention',
    category: 'Attention Variants',
    difficulty: 'Advanced',
    concept: 'Flash Attention is an IO-aware exact attention algorithm that reduces memory access by fusing operations and using tiling. It achieves 2-4x speedup over standard attention without approximation, enabling longer context windows.',
    howItWorks: [
      {
        step: 'Identify bottleneck',
        explanation: 'Standard attention is memory-bound, not compute-bound. Most time spent moving data between HBM (slow) and SRAM (fast), not computing.',
      },
      {
        step: 'Tiling',
        explanation: 'Split Q, K, V into blocks that fit in SRAM. Process blocks incrementally instead of materializing full attention matrix.',
      },
      {
        step: 'Fused kernel',
        explanation: 'Fuse softmax, masking, and dropout into single CUDA kernel. Avoid writing intermediate results to HBM.',
      },
      {
        step: 'Online softmax',
        explanation: 'Compute softmax incrementally as blocks are processed. Use numerically stable algorithm with running max and sum.',
      },
      {
        step: 'Recomputation in backward',
        explanation: 'Don\'t store attention matrix for backward pass. Recompute it from Q, K, V (faster than loading from HBM).',
      },
    ],
    intuition: 'Flash Attention is like cooking efficiently. Instead of preparing all ingredients on the counter (materializing attention matrix in HBM), you work with small batches from the fridge (SRAM), cook them immediately (fused operations), and don\'t store intermediate dishes (recompute in backward). This reduces trips to the fridge (memory access).',
    whenToUse: [
      'Training large language models',
      'When you need long context windows (>2K tokens)',
      'To reduce memory usage',
      'When attention is the bottleneck',
    ],
    tradeoffs: {
      pros: [
        '2-4x faster than standard attention',
        'Exact (not approximate)',
        'Enables longer sequences',
        'Reduces memory usage',
      ],
      cons: [
        'Requires custom CUDA kernels',
        'More complex implementation',
        'Hardware-specific optimizations',
        'Not all frameworks support it yet',
      ],
    },
    visualAnalogy: 'Flash Attention is like assembly line optimization. Instead of building entire cars in one place (full attention matrix), you have stations that work on parts (tiles) and pass them along. This reduces warehouse space (memory) and transportation (IO), making production faster.',
    interviewQuestions: [
      {
        question: 'Why is standard attention memory-bound?',
        answer: 'Modern GPUs: compute is fast (TFLOPS), memory bandwidth is slow (GB/s). Standard attention: 1) Compute QK^T (fast), 2) Write to HBM (slow), 3) Read for softmax (slow), 4) Write back (slow), 5) Read for attention output (slow). Most time spent on memory IO, not computation. Flash Attention reduces IO by keeping data in SRAM and fusing operations.',
      },
      {
        question: 'What is the difference between Flash Attention and sparse attention?',
        answer: 'Sparse attention: Approximate attention by attending to subset of tokens (e.g., local window, strided). Reduces O(n²) to O(n√n) or O(n log n). Flash Attention: Exact attention with same O(n²) complexity but optimized IO. Sparse attention trades accuracy for speed, Flash Attention is exact but faster. Can combine both: Flash Attention with sparse patterns.',
      },
      {
        question: 'How does Flash Attention enable longer context windows?',
        answer: 'Standard attention: O(n²) memory for attention matrix. 2K tokens = 4M elements, 8K tokens = 64M elements (16x more). Flash Attention: O(n) memory by not materializing full matrix. Processes in tiles, discards intermediate results. This allows 8K-32K context windows on same hardware. Critical for long-document understanding, code generation.',
      },
    ],
    commonMistakes: [
      'Thinking Flash Attention is approximate (it\'s exact)',
      'Not using it when available (significant speedup)',
      'Confusing with sparse attention methods',
      'Not considering hardware requirements',
    ],
    relatedTopics: ['Sparse Attention', 'Linear Attention', 'Memory-Efficient Attention', 'CUDA Optimization'],
  },
  {
    id: 'nlp-2',
    title: 'BPE (Byte Pair Encoding) Tokenization',
    category: 'NLP Techniques',
    difficulty: 'Intermediate',
    concept: 'BPE is a subword tokenization algorithm that iteratively merges frequent character pairs to build vocabulary. It balances between character-level (flexible) and word-level (efficient) tokenization, handling rare words and typos.',
    howItWorks: [
      {
        step: 'Initialize with characters',
        explanation: 'Start with character vocabulary. Each character is a token.',
      },
      {
        step: 'Count pair frequencies',
        explanation: 'Count frequency of all adjacent token pairs in corpus.',
      },
      {
        step: 'Merge most frequent pair',
        explanation: 'Merge most frequent pair into new token. Add to vocabulary. Example: "e" + "r" → "er".',
      },
      {
        step: 'Repeat',
        explanation: 'Repeat merge process for desired vocabulary size (e.g., 50K merges).',
      },
      {
        step: 'Tokenize new text',
        explanation: 'Apply learned merges to segment text into subwords.',
      },
    ],
    intuition: 'BPE is like learning abbreviations. Common phrases get shortened ("do not" → "don\'t"). Rare words stay as characters. This creates efficient vocabulary that handles any text.',
    whenToUse: [
      'Modern NLP models (GPT, BERT variants)',
      'When vocabulary needs to handle rare words',
      'Multilingual models',
      'When you want balance between word and character level',
    ],
    tradeoffs: {
      pros: [
        'Handles rare words and typos',
        'Fixed vocabulary size',
        'Language-agnostic',
        'Efficient for common words',
      ],
      cons: [
        'Tokenization not linguistically motivated',
        'Can split words awkwardly',
        'Requires training on corpus',
        'Different from human word boundaries',
      ],
    },
    visualAnalogy: 'BPE is like learning shorthand. Frequently used phrases get symbols ("and" → "&"). Rare words spelled out letter by letter. Over time, you develop efficient shorthand that handles any text.',
    interviewQuestions: [
      {
        question: 'BPE vs WordPiece vs SentencePiece - what are the differences?',
        answer: 'BPE: Merge by frequency. Used in GPT. WordPiece: Merge by likelihood (maximize probability). Used in BERT. SentencePiece: Treats text as raw bytes, includes spaces. Language-agnostic. Used in T5, XLNet. All are subword methods. Differences are subtle - performance similar. SentencePiece most flexible (no pre-tokenization needed).',
      },
      {
        question: 'Why use subword tokenization instead of word-level?',
        answer: 'Word-level problems: 1) Huge vocabulary (millions of words), 2) OOV (out-of-vocabulary) words, 3) Rare words poorly represented, 4) Morphology ignored ("run", "running" separate). Subword benefits: 1) Fixed vocabulary (50K), 2) No OOV (can represent any text), 3) Shares representations ("run", "running" share "run"), 4) Handles typos. Trade-off: sequences longer.',
      },
      {
        question: 'How does BPE handle rare words?',
        answer: 'Rare words split into subwords or characters. Example: "unbelievable" might be ["un", "believ", "able"]. Very rare: ["u", "n", "b", "e", "l", "i", "e", "v", "a", "b", "l", "e"]. Model learns from subword components. Better than <UNK> token (no information). Allows generalization to unseen words. Key advantage over word-level tokenization.',
      },
    ],
    commonMistakes: [
      'Not training BPE on representative corpus',
      'Using wrong vocabulary size (too small or too large)',
      'Forgetting to handle special tokens',
      'Not considering tokenization in model design',
    ],
    relatedTopics: ['WordPiece', 'SentencePiece', 'Tokenization', 'Subword Units'],
  },
  {
    id: 'seq-2',
    title: 'GRU (Gated Recurrent Unit)',
    category: 'Sequence Models',
    difficulty: 'Intermediate',
    concept: 'GRU is a simplified LSTM variant with two gates (reset and update) instead of three. It achieves similar performance with fewer parameters and faster training.',
    howItWorks: [
      {
        step: 'Reset gate',
        explanation: 'r_t = σ(W_r · [h_{t-1}, x_t]). Controls how much past information to forget.',
      },
      {
        step: 'Update gate',
        explanation: 'z_t = σ(W_z · [h_{t-1}, x_t]). Controls how much to update hidden state.',
      },
      {
        step: 'Candidate hidden state',
        explanation: 'h̃_t = tanh(W · [r_t * h_{t-1}, x_t]). New information, modulated by reset gate.',
      },
      {
        step: 'Update hidden state',
        explanation: 'h_t = (1-z_t) * h_{t-1} + z_t * h̃_t. Interpolate between old and new state.',
      },
    ],
    intuition: 'GRU is like LSTM\'s simpler sibling. Reset gate decides what to forget, update gate decides how much to change. Fewer gates = fewer parameters = faster training. Often works as well as LSTM.',
    whenToUse: [
      'When LSTM is too slow or complex',
      'Smaller datasets (fewer parameters)',
      'When you want faster training',
      'As default RNN choice (try before LSTM)',
    ],
    tradeoffs: {
      pros: [
        'Fewer parameters than LSTM',
        'Faster training',
        'Often similar performance to LSTM',
        'Simpler architecture',
      ],
      cons: [
        'Less expressive than LSTM',
        'May underperform on complex tasks',
        'Still sequential (can\'t parallelize)',
        'Superseded by transformers for many tasks',
      ],
    },
    visualAnalogy: 'GRU is like a simplified memory system. Update gate is a dial: turn left to keep old memory, turn right to accept new memory. Reset gate clears irrelevant old memories. Simpler than LSTM\'s three-gate system.',
    interviewQuestions: [
      {
        question: 'When would you choose GRU over LSTM?',
        answer: 'Choose GRU when: 1) Smaller dataset (fewer parameters reduce overfitting), 2) Faster training needed, 3) Simpler model preferred, 4) LSTM and GRU perform similarly (try GRU first). Choose LSTM when: 1) Complex task needs more capacity, 2) Long sequences (LSTM\'s separate cell state helps), 3) GRU underperforms. Rule of thumb: start with GRU, use LSTM if needed.',
      },
      {
        question: 'How does GRU differ from LSTM architecturally?',
        answer: 'LSTM: 3 gates (forget, input, output), separate cell state and hidden state. GRU: 2 gates (reset, update), single hidden state (no cell state). GRU combines forget and input gates into update gate. Fewer parameters: GRU has 2 weight matrices per gate, LSTM has 3. GRU is essentially simplified LSTM. Performance often similar.',
      },
      {
        question: 'What is the update gate doing mathematically?',
        answer: 'Update gate z_t ∈ [0,1] controls interpolation: h_t = (1-z_t)h_{t-1} + z_t h̃_t. z_t=0: keep old state (h_t = h_{t-1}). z_t=1: use new state (h_t = h̃_t). z_t=0.5: average old and new. This is like LSTM\'s forget and input gates combined. Allows model to learn when to update memory.',
      },
    ],
    commonMistakes: [
      'Always using LSTM without trying GRU',
      'Not considering parameter count difference',
      'Expecting GRU to always match LSTM',
      'Using RNNs when transformers are better',
    ],
    relatedTopics: ['LSTM', 'RNN', 'Sequence Modeling', 'Gating Mechanisms'],
  },
  {
    id: 'attn-2',
    title: 'Sparse Attention',
    category: 'Attention Variants',
    difficulty: 'Advanced',
    concept: 'Sparse attention reduces O(n²) complexity by having each token attend to only a subset of tokens. Patterns include local windows, strided, and random attention. Enables longer context windows with less computation.',
    howItWorks: [
      {
        step: 'Define sparsity pattern',
        explanation: 'Local: attend to nearby tokens. Strided: attend to every k-th token. Random: attend to random subset. Hybrid: combine patterns.',
      },
      {
        step: 'Compute attention only for pattern',
        explanation: 'Instead of full n×n attention matrix, compute only for selected positions. Reduces computation.',
      },
      {
        step: 'Apply softmax',
        explanation: 'Softmax over selected positions only. Attention weights sum to 1 over subset.',
      },
      {
        step: 'Weighted sum',
        explanation: 'Compute output as weighted sum of selected values.',
      },
    ],
    intuition: 'Sparse attention is like reading a book by skimming. Instead of reading every word (full attention), you read key sections (sparse pattern). You still understand the story but much faster.',
    whenToUse: [
      'Very long sequences (>4K tokens)',
      'When full attention is too expensive',
      'Document understanding',
      'When you can define meaningful sparsity pattern',
    ],
    tradeoffs: {
      pros: [
        'Reduces complexity (O(n√n) or O(n log n))',
        'Enables longer context windows',
        'Less memory usage',
        'Faster training and inference',
      ],
      cons: [
        'Approximate (may miss important connections)',
        'Requires choosing sparsity pattern',
        'Implementation complexity',
        'May hurt performance on some tasks',
      ],
    },
    visualAnalogy: 'Sparse attention is like a social network where you only follow certain people (local friends, celebrities, random strangers) instead of everyone. You still get diverse information but with less overhead.',
    interviewQuestions: [
      {
        question: 'What are common sparse attention patterns?',
        answer: 'Local (sliding window): Attend to k nearest tokens. Good for local dependencies. Strided: Attend to every k-th token. Captures long-range patterns. Global: Some tokens attend to all (e.g., [CLS]). Random: Attend to random subset. Longformer: Local + global + dilated. BigBird: Local + global + random. Sparse Transformer: Strided + local. Choice depends on task and sequence structure.',
      },
      {
        question: 'How does sparse attention compare to linear attention?',
        answer: 'Sparse attention: Reduce n² by attending to subset. Still uses softmax. Approximate. O(n√n) or O(n log n). Linear attention: Reformulate attention to avoid n² entirely. Use kernel trick. Exact or approximate. O(n). Sparse: easier to implement, more interpretable patterns. Linear: more efficient, but different attention mechanism. Both enable long sequences.',
      },
      {
        question: 'What is Longformer and how does it work?',
        answer: 'Longformer: Sparse attention for long documents (4K-16K tokens). Pattern: 1) Local window (attend to nearby tokens), 2) Global attention (some tokens attend to all), 3) Dilated attention (attend to every k-th token). Combines local and global information efficiently. Used for document understanding. Achieves O(n) complexity. Pre-trained on long documents.',
      },
    ],
    commonMistakes: [
      'Using sparse attention when full attention fits',
      'Wrong sparsity pattern for task',
      'Not considering implementation complexity',
      'Expecting same performance as full attention',
    ],
    relatedTopics: ['Flash Attention', 'Linear Attention', 'Longformer', 'BigBird', 'Efficient Transformers'],
  },
];