// Interview Deep Dives - Part 3
// Model Architectures

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART3: DeepDiveTopic[] = [
  {
    id: 'arch-1',
    title: 'BERT (Bidirectional Encoder Representations from Transformers)',
    category: 'Model Architectures',
    difficulty: 'Advanced',
    concept: 'BERT is a bidirectional transformer encoder that learns contextualized word representations by predicting masked tokens and next sentence relationships. Unlike GPT, it sees the entire context (left and right) simultaneously.',
    howItWorks: [
      {
        step: 'Tokenization with special tokens',
        explanation: '[CLS] token at start (used for classification), [SEP] between sentences, [MASK] for masked tokens. WordPiece tokenization breaks words into subwords.',
      },
      {
        step: 'Embeddings: Token + Position + Segment',
        explanation: 'Combine three embeddings: token embeddings (vocabulary), positional embeddings (learned, max 512), segment embeddings (distinguish sentence A vs B).',
      },
      {
        step: 'Bidirectional transformer encoder',
        explanation: 'Stack of 12 (base) or 24 (large) transformer encoder layers. Each token attends to ALL other tokens (no masking), capturing full context.',
      },
      {
        step: 'Pre-training tasks',
        explanation: 'MLM (Masked Language Model): predict 15% masked tokens. NSP (Next Sentence Prediction): predict if sentence B follows A. Trained on BooksCorpus + Wikipedia.',
      },
      {
        step: 'Fine-tuning for downstream tasks',
        explanation: 'Add task-specific head on top of [CLS] token or token representations. Fine-tune entire model on labeled data for classification, QA, NER, etc.',
      },
    ],
    intuition: 'BERT is like reading a sentence with some words blanked out, then using context from BOTH sides to guess the missing words. Unlike reading left-to-right (GPT), you see the full picture, making it great for understanding tasks.',
    whenToUse: [
      'Text classification (sentiment, topic, intent)',
      'Named Entity Recognition (NER)',
      'Question Answering (SQuAD)',
      'Sentence similarity and semantic search',
      'When you need understanding, not generation',
    ],
    tradeoffs: {
      pros: [
        'Bidirectional context - better understanding',
        'State-of-the-art on many NLU benchmarks',
        'Transfer learning - pre-trained on massive data',
        'Relatively small (110M base, 340M large)',
      ],
      cons: [
        'Cannot generate text (encoder-only)',
        'Fixed max length (512 tokens)',
        'Slower inference than distilled versions',
        'NSP task later found less useful',
      ],
    },
    codeExample: {
      language: 'python',
      code: `from transformers import BertTokenizer, BertForSequenceClassification
import torch

# Load pre-trained BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=2  # Binary classification
)

# Example: Sentiment classification
text = "This movie was absolutely fantastic!"
inputs = tokenizer(
    text,
    return_tensors='pt',
    padding=True,
    truncation=True,
    max_length=512
)

# Forward pass
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    prediction = torch.argmax(logits, dim=1)

print(f"Input IDs shape: {inputs['input_ids'].shape}")
print(f"Logits: {logits}")
print(f"Prediction: {'Positive' if prediction == 1 else 'Negative'}")

# Fine-tuning example
model.train()
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)

# Training loop (simplified)
for epoch in range(3):
    outputs = model(**inputs, labels=torch.tensor([1]))  # Positive label
    loss = outputs.loss
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`,
      explanation: 'This shows loading pre-trained BERT and fine-tuning for classification. The [CLS] token representation is used for classification. In practice, use a proper dataset and training loop.',
    },
    visualAnalogy: 'BERT is like a fill-in-the-blank test where you can see words before AND after the blank. GPT is like writing a story where you only see what came before. BERT excels at understanding, GPT at generation.',
    interviewQuestions: [
      {
        question: 'What makes BERT bidirectional?',
        answer: 'BERT uses a standard transformer encoder without causal masking, so each token can attend to all other tokens (past and future). During pre-training, it predicts masked tokens using full context. GPT is unidirectional - tokens only see previous tokens due to causal masking.',
      },
      {
        question: 'Explain BERT\'s pre-training objectives',
        answer: 'MLM (Masked Language Model): Randomly mask 15% of tokens, predict them using bidirectional context. Of masked tokens: 80% replaced with [MASK], 10% random token, 10% unchanged (prevents overfitting to [MASK]). NSP (Next Sentence Prediction): Given sentence pairs, predict if B follows A (50% do, 50% random). NSP later found less critical.',
      },
      {
        question: 'How do you use BERT for different tasks?',
        answer: 'Classification: Use [CLS] token representation + linear layer. Token classification (NER): Use each token\'s representation + linear layer. QA: Two linear layers predict start/end positions. Sentence similarity: Use [CLS] or mean pooling. The key is BERT provides contextualized representations, you add task-specific heads.',
      },
      {
        question: 'BERT vs RoBERTa - what changed?',
        answer: 'RoBERTa improved BERT by: 1) Removing NSP task, 2) Dynamic masking (different masks each epoch), 3) Larger batches and more data, 4) Longer training, 5) Byte-level BPE tokenization. Result: better performance on downstream tasks. Shows pre-training details matter significantly.',
      },
    ],
    commonMistakes: [
      'Using BERT for text generation (it\'s encoder-only)',
      'Not fine-tuning - just using pre-trained embeddings (loses task-specific learning)',
      'Exceeding 512 token limit without chunking',
      'Not using [CLS] token for classification tasks',
      'Forgetting to add segment embeddings for sentence pairs',
    ],
    relatedTopics: ['RoBERTa', 'ALBERT', 'DistilBERT', 'Transformer Encoder', 'Masked Language Modeling'],
  },
  {
    id: 'arch-2',
    title: 'GPT (Generative Pre-trained Transformer)',
    category: 'Model Architectures',
    difficulty: 'Advanced',
    concept: 'GPT is a unidirectional (left-to-right) transformer decoder trained to predict the next token. It excels at text generation and few-shot learning through in-context learning.',
    howItWorks: [
      {
        step: 'Tokenization',
        explanation: 'BPE (Byte Pair Encoding) tokenization breaks text into subword units. GPT-3 uses 50K vocabulary. Each token gets an embedding.',
      },
      {
        step: 'Causal self-attention',
        explanation: 'Transformer decoder with causal masking - each token only attends to previous tokens (and itself). This enables autoregressive generation.',
      },
      {
        step: 'Pre-training: Next token prediction',
        explanation: 'Train on massive text corpus to predict next token given previous tokens. Loss = cross-entropy between predicted and actual next token. Simple but powerful objective.',
      },
      {
        step: 'In-context learning',
        explanation: 'At inference, provide examples in the prompt (few-shot) or just instructions (zero-shot). Model learns the task from context without parameter updates.',
      },
      {
        step: 'Autoregressive generation',
        explanation: 'Generate text token-by-token. Each generated token is fed back as input for next prediction. Use sampling strategies (temperature, top-k, top-p) for diversity.',
      },
    ],
    intuition: 'GPT is like a very sophisticated autocomplete. Given "The cat sat on the", it predicts "mat" by learning patterns from billions of text examples. Scale it up massively (GPT-3: 175B parameters), and it can do tasks just from examples in the prompt.',
    whenToUse: [
      'Text generation (stories, articles, code)',
      'Few-shot learning (learn from examples in prompt)',
      'Conversational AI and chatbots',
      'Code generation and completion',
      'When you need generation, not just understanding',
    ],
    tradeoffs: {
      pros: [
        'Excellent text generation quality',
        'Few-shot learning without fine-tuning',
        'Scales well (larger = better)',
        'Versatile - many tasks from prompting',
      ],
      cons: [
        'Unidirectional - no future context',
        'Expensive inference (autoregressive)',
        'Can hallucinate facts',
        'Requires careful prompt engineering',
      ],
    },
    visualAnalogy: 'GPT is like writing a story one word at a time, only seeing what you\'ve written so far. You can\'t peek ahead. This makes it great for generation but limits understanding compared to BERT which sees the full sentence.',
    interviewQuestions: [
      {
        question: 'What is causal masking and why is it needed?',
        answer: 'Causal masking prevents tokens from attending to future tokens in the sequence. In the attention matrix, we mask (set to -inf before softmax) positions where j > i. This ensures autoregressive property - token i only depends on tokens 0 to i. Without it, the model would "cheat" during training by seeing future tokens.',
      },
      {
        question: 'Explain in-context learning in GPT-3',
        answer: 'In-context learning: GPT-3 learns tasks from examples in the prompt without gradient updates. Few-shot: provide examples (e.g., "translate: hello -> hola, goodbye -> adios, thank you -> ?"). Zero-shot: just instructions. One-shot: one example. The model recognizes patterns and applies them. Emergent ability at scale - GPT-2 couldn\'t do this well.',
      },
      {
        question: 'How does GPT generate text?',
        answer: 'Autoregressive generation: 1) Start with prompt tokens, 2) Forward pass produces logits for next token, 3) Sample next token (using temperature, top-k, or top-p), 4) Append to sequence, 5) Repeat until stopping condition (max length, EOS token). Each step conditions on all previous tokens. Slow but high quality.',
      },
    ],
    commonMistakes: [
      'Confusing GPT (decoder) with BERT (encoder) - different architectures',
      'Not using causal masking in decoder',
      'Thinking GPT-3 is fine-tuned (it\'s few-shot learning)',
      'Ignoring prompt engineering importance',
      'Not considering inference cost (autoregressive is slow)',
    ],
    relatedTopics: ['Transformer Decoder', 'Causal Attention', 'In-Context Learning', 'Autoregressive Models', 'Prompt Engineering'],
  },
  {
    id: 'arch-4',
    title: 'T5 (Text-to-Text Transfer Transformer)',
    category: 'Model Architectures',
    difficulty: 'Advanced',
    concept: 'T5 frames all NLP tasks as text-to-text: input is text, output is text. It uses encoder-decoder transformer architecture and is pre-trained on massive C4 dataset with span corruption objective.',
    howItWorks: [
      {
        step: 'Text-to-text framework',
        explanation: 'Convert every task to text-to-text format. Translation: "translate English to German: Hello" → "Hallo". Classification: "sentiment: This movie is great" → "positive". QA: "question: What is AI? context: ..." → "answer".',
      },
      {
        step: 'Encoder-decoder architecture',
        explanation: 'Full transformer with encoder (bidirectional) and decoder (causal). Unlike BERT (encoder-only) or GPT (decoder-only). Encoder processes input, decoder generates output.',
      },
      {
        step: 'Span corruption pre-training',
        explanation: 'Mask spans of tokens (not individual tokens). Replace with sentinel tokens <X>, <Y>. Model predicts masked spans. Example: "Thank you <X> me to <Y> party" → "<X> for inviting <Y> your <Z>".',
      },
      {
        step: 'Fine-tuning',
        explanation: 'Fine-tune on downstream tasks using same text-to-text format. Single model handles multiple tasks.',
      },
    ],
    intuition: 'T5 is like a universal translator. Every problem is phrased as "given this text, produce that text". Translation, summarization, classification - all become text generation. This unified framework simplifies training and deployment.',
    whenToUse: [
      'Multi-task learning (one model, many tasks)',
      'Text generation tasks (summarization, translation)',
      'When you want encoder-decoder architecture',
      'Transfer learning for NLP',
    ],
    tradeoffs: {
      pros: [
        'Unified framework for all NLP tasks',
        'Encoder-decoder captures bidirectional context',
        'Strong performance across tasks',
        'Flexible - easy to add new tasks',
      ],
      cons: [
        'Larger than encoder-only models (BERT)',
        'Slower inference than decoder-only (GPT)',
        'Requires more memory',
        'Text-to-text format can be verbose',
      ],
    },
    visualAnalogy: 'T5 is like a Swiss Army knife. Instead of separate tools for each task (BERT for classification, GPT for generation), you have one tool that adapts to any task by framing it as text-to-text. Versatile and unified.',
    interviewQuestions: [
      {
        question: 'Why use encoder-decoder instead of decoder-only?',
        answer: 'Encoder-decoder: Encoder sees full input bidirectionally (better understanding), decoder generates output autoregressively. Good for tasks with clear input/output (translation, summarization). Decoder-only (GPT): Simpler, faster, better for generation and few-shot learning. Encoder-only (BERT): Best for understanding tasks (classification). T5 chose encoder-decoder for flexibility across tasks.',
      },
      {
        question: 'What is span corruption and why use it?',
        answer: 'Span corruption: Mask contiguous spans (e.g., 3 tokens) instead of individual tokens. Predict entire spans. Benefits: 1) More challenging than single token prediction, 2) Learns to generate longer sequences, 3) Better for generation tasks. BERT masks 15% individual tokens, T5 masks 15% in spans. Span corruption better prepares model for text generation.',
      },
      {
        question: 'How does T5 handle classification tasks?',
        answer: 'Convert to text generation. Sentiment: "sentiment: I love this movie" → generate "positive". NER: "ner: John lives in Paris" → generate "John: PERSON, Paris: LOCATION". Multi-class: generate class name as text. This is less efficient than classification head but enables unified framework. Can also use likelihood scoring for classification.',
      },
    ],
    commonMistakes: [
      'Not formatting inputs correctly (need task prefix)',
      'Using T5 when encoder-only (BERT) or decoder-only (GPT) is better',
      'Not considering inference cost (encoder-decoder is slower)',
      'Forgetting to add task-specific prefixes',
    ],
    relatedTopics: ['BERT', 'GPT', 'BART', 'Encoder-Decoder Architecture', 'Multi-Task Learning'],
  },
  {
    id: 'arch-5',
    title: 'U-Net',
    category: 'Model Architectures',
    difficulty: 'Intermediate',
    concept: 'U-Net is a convolutional architecture for image segmentation with encoder-decoder structure and skip connections. It excels at pixel-level predictions with limited training data.',
    howItWorks: [
      {
        step: 'Contracting path (encoder)',
        explanation: 'Series of conv layers + pooling. Progressively downsample image while increasing channels. Captures context. Example: 256×256×3 → 128×128×64 → 64×64×128 → 32×32×256.',
      },
      {
        step: 'Bottleneck',
        explanation: 'Lowest resolution, highest channels. Captures most abstract features. Example: 16×16×512.',
      },
      {
        step: 'Expanding path (decoder)',
        explanation: 'Series of upsampling + conv layers. Progressively upsample while decreasing channels. Reconstructs spatial resolution.',
      },
      {
        step: 'Skip connections',
        explanation: 'Concatenate encoder features with decoder features at same resolution. Combines low-level details with high-level semantics. Key innovation of U-Net.',
      },
      {
        step: 'Output',
        explanation: 'Final conv layer produces segmentation map. Same resolution as input. Each pixel classified.',
      },
    ],
    intuition: 'U-Net is like zooming out to see the big picture, then zooming back in with that context. Skip connections are like keeping notes while zooming out, so you remember details when zooming back in.',
    whenToUse: [
      'Image segmentation (medical, satellite)',
      'Image-to-image translation',
      'Denoising and super-resolution',
      'When you need pixel-level predictions',
    ],
    tradeoffs: {
      pros: [
        'Works with small datasets',
        'Precise localization via skip connections',
        'Fast inference',
        'Simple and effective',
      ],
      cons: [
        'Memory intensive (stores encoder features)',
        'Fixed input size (or requires padding)',
        'Not as good as transformers for some tasks',
      ],
    },
    visualAnalogy: 'U-Net is like creating a detailed map. First, you fly high to see the overall layout (encoder). Then you zoom back down to add details (decoder). Skip connections are like taking photos at each altitude so you don\'t lose details.',
    interviewQuestions: [
      {
        question: 'Why are skip connections important in U-Net?',
        answer: 'Encoder loses spatial information through pooling. Decoder must reconstruct it from low-resolution features. Skip connections provide high-resolution features directly from encoder, enabling precise localization. Without them, decoder struggles to recover fine details. Similar to ResNet but for spatial information, not gradients.',
      },
      {
        question: 'U-Net vs FCN (Fully Convolutional Network)?',
        answer: 'FCN: First segmentation architecture, uses encoder (VGG) + decoder with skip connections. U-Net: Symmetric encoder-decoder, more skip connections, designed for small datasets. U-Net has more parameters in decoder and concatenates features (FCN adds them). U-Net generally better for medical imaging, FCN for natural images with large datasets.',
      },
      {
        question: 'How is U-Net used in diffusion models?',
        answer: 'Diffusion models (Stable Diffusion, DALL-E 2) use U-Net as denoising network. Input: noisy image + timestep. Output: predicted noise. U-Net\'s encoder-decoder structure with skip connections is perfect for this: encoder extracts features, decoder reconstructs noise, skip connections preserve spatial details. Often add attention layers for better quality.',
      },
    ],
    commonMistakes: [
      'Not using skip connections (defeats purpose)',
      'Concatenating instead of adding (or vice versa)',
      'Not handling input size properly',
      'Forgetting to normalize inputs',
    ],
    relatedTopics: ['Image Segmentation', 'Encoder-Decoder', 'Skip Connections', 'Diffusion Models'],
  },
];