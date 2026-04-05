// Part 3: Interview-focused "How It Works" explanations
// Continuing from Part 2

export const HOW_IT_WORKS_PART3: Record<string, string> = {
  // ANTHROPIC/AI SYSTEMS
  'anthropic-1': `**Overview**: Claude is an AI assistant using large language models for conversation, analysis, and task completion.

**How it works**:
1. **Input**: User sends text prompt to API
2. **Processing**: Transformer model processes input, generates response token-by-token
3. **Safety**: Constitutional AI ensures responses are helpful, harmless, and honest
4. **Output**: Response streamed back to user

**Scale**: Billions of tokens processed daily.

**Key Tech**: Transformer architecture, Constitutional AI, RLHF for alignment.

**Interview Tip**: Constitutional AI trains the model to follow principles, not just maximize reward - it's self-supervised alignment.`,

  // ORACLE SYSTEMS
  'oracle-1': `**Overview**: Oracle Database is an enterprise RDBMS with ACID transactions, high availability, and advanced features.

**How it works**:
1. **Storage**: Data stored in tablespaces with B-tree indexes
2. **Transactions**: MVCC provides isolation without locking readers
3. **Replication**: Data Guard replicates to standby for DR
4. **Clustering**: RAC allows multiple instances to access same database

**Scale**: Petabytes of data, millions of transactions per second.

**Key Tech**: MVCC for concurrency, Data Guard for HA, RAC for clustering.

**Interview Tip**: Oracle's strength is enterprise features - partitioning, compression, advanced security.`,

  // OPENAI SYSTEMS
  'openai-1': `**Overview**: ChatGPT is a conversational AI using GPT models for natural language understanding and generation.

**How it works**:
1. **Input**: User sends message, conversation history included
2. **Processing**: GPT model generates response token-by-token
3. **Streaming**: Tokens streamed back as they're generated
4. **Memory**: Conversation stored for context in subsequent messages

**Scale**: 100+ million users, billions of tokens processed.

**Key Tech**: GPT-4 architecture, RLHF for alignment, streaming responses.

**Interview Tip**: The model is stateless - conversation history is sent with each request for context.`,

  'openai-2': `**Overview**: DALL-E generates images from text descriptions using diffusion models.

**How it works**:
1. **Input**: User provides text prompt describing desired image
2. **Encoding**: Text encoded into latent representation
3. **Diffusion**: Model iteratively denoises random noise into image
4. **Output**: Generated image returned to user

**Scale**: Millions of images generated daily.

**Key Tech**: Diffusion models, CLIP for text-image alignment, latent space manipulation.

**Interview Tip**: Diffusion works backwards - start with noise, gradually remove it to reveal image matching prompt.`,

  // UBER SYSTEMS
  'uber-1': `**Overview**: Uber ride-hailing platform matches riders with drivers using real-time location and routing.

**How it works**:
1. **Request**: Rider requests ride, location sent to server
2. **Matching**: Nearby drivers notified, first to accept gets ride
3. **Routing**: Optimal route calculated using traffic data
4. **Tracking**: Real-time location updates shown to rider

**Scale**: 100+ million users, 20+ million trips daily.

**Key Tech**: Geospatial indexing, graph algorithms for routing, WebSocket for real-time updates.

**Interview Tip**: Matching is a bipartite graph problem - minimize wait time while maximizing driver utilization.`,

  'uber-2': `**Overview**: Uber Eats is a food delivery platform connecting restaurants, delivery partners, and customers.

**How it works**:
1. **Order**: Customer orders food, payment processed
2. **Restaurant**: Order sent to restaurant, preparation begins
3. **Dispatch**: Delivery partner assigned using routing algorithm
4. **Delivery**: Partner picks up food, delivers to customer

**Scale**: 100+ million users, millions of deliveries daily.

**Key Tech**: Geospatial indexing, routing algorithms, real-time tracking.

**Interview Tip**: The challenge is three-way matching - customer, restaurant, and delivery partner must be coordinated.`,

  // AIRBNB SYSTEMS
  'airbnb-1': `**Overview**: Airbnb is a marketplace connecting hosts with guests for short-term rentals.

**How it works**:
1. **Search**: Guests search by location, dates, filters
2. **Ranking**: ML model ranks listings by predicted booking probability
3. **Booking**: Guest books, payment held in escrow
4. **Check-in**: Host provides access, payment released after check-in

**Scale**: 7+ million listings, 100+ million users.

**Key Tech**: Elasticsearch for search, ML for ranking, payment processing.

**Interview Tip**: Trust is key - reviews, verified photos, and identity verification build trust between strangers.`,

  // SPOTIFY SYSTEMS
  'spotify-1': `**Overview**: Spotify is a music streaming platform with personalized playlists and recommendations.

**How it works**:
1. **Streaming**: Audio streamed using Ogg Vorbis codec
2. **Caching**: Songs cached locally for offline playback
3. **Recommendation**: Collaborative filtering suggests songs based on listening history
4. **Playlists**: Discover Weekly uses ML to create personalized playlists

**Scale**: 500+ million users, 100+ million songs.

**Key Tech**: Collaborative filtering, audio fingerprinting, CDN for streaming.

**Interview Tip**: Spotify's recommendation is hybrid - collaborative filtering + content-based (audio features).`,

  // TWITTER/X SYSTEMS
  'twitter-1': `**Overview**: Twitter is a microblogging platform with real-time tweets, trending topics, and social graph.

**How it works**:
1. **Tweet**: User posts tweet, stored in distributed database
2. **Fan-out**: Tweet pushed to followers' timelines (write fan-out)
3. **Timeline**: Tweets ranked by recency and engagement
4. **Trending**: Trending topics calculated using spike detection

**Scale**: 500+ million users, 500+ million tweets daily.

**Key Tech**: Manhattan distributed database, write fan-out, real-time analytics.

**Interview Tip**: Celebrities use read fan-out - their tweets are read from their timeline, not written to millions of followers.`,

  // LINKEDIN SYSTEMS
  'linkedin-1': `**Overview**: LinkedIn is a professional networking platform with profiles, connections, and job postings.

**How it works**:
1. **Profile**: Users create profiles with work history, skills
2. **Connections**: Users connect, forming professional network
3. **Feed**: Posts from connections shown in feed, ranked by engagement
4. **Jobs**: Job recommendations based on profile and activity

**Scale**: 900+ million users, billions of connections.

**Key Tech**: Graph database for connections, ML for recommendations, Kafka for event streaming.

**Interview Tip**: LinkedIn's graph is sparse - most users have <500 connections, unlike Facebook's dense graph.`,

  // DROPBOX SYSTEMS
  'dropbox-1': `**Overview**: Dropbox is a cloud storage platform with file sync, sharing, and collaboration.

**How it works**:
1. **Upload**: Files chunked, deduplicated, and uploaded
2. **Sync**: Changes detected, delta sync uploads only changed chunks
3. **Sharing**: Files shared via links or folder permissions
4. **Versioning**: Previous versions stored for recovery

**Scale**: 700+ million users, exabytes of data.

**Key Tech**: Block-level deduplication, delta sync, S3 for storage.

**Interview Tip**: Deduplication saves space - if two users upload same file, only one copy is stored.`,

  // SLACK SYSTEMS
  'slack-1': `**Overview**: Slack is a team collaboration platform with channels, direct messages, and integrations.

**How it works**:
1. **Messaging**: Messages sent via WebSocket, stored in database
2. **Channels**: Messages organized into channels (public/private)
3. **Search**: Full-text search across all messages
4. **Integrations**: Bots and apps extend functionality via API

**Scale**: 20+ million users, billions of messages.

**Key Tech**: WebSocket for real-time messaging, Elasticsearch for search, MySQL for storage.

**Interview Tip**: Slack's challenge is search - indexing billions of messages for instant search across workspaces.`,

  // ZOOM SYSTEMS
  'zoom-1': `**Overview**: Zoom is a video conferencing platform with HD video, screen sharing, and recording.

**How it works**:
1. **Connection**: WebRTC establishes peer-to-peer or server-mediated connections
2. **Encoding**: Video encoded with H.264, audio with Opus
3. **Routing**: Media routed through Zoom's global network
4. **Features**: Screen sharing, virtual backgrounds, recording

**Scale**: 300+ million daily meeting participants.

**Key Tech**: WebRTC for real-time communication, H.264 codec, global network.

**Interview Tip**: For large meetings, Zoom uses SFU (Selective Forwarding Unit) to reduce bandwidth.`,

  // PINTEREST SYSTEMS
  'pinterest-1': `**Overview**: Pinterest is a visual discovery platform with pins, boards, and personalized recommendations.

**How it works**:
1. **Pinning**: Users save images (pins) to boards
2. **Discovery**: Home feed shows pins based on interests
3. **Search**: Visual search finds similar images
4. **Recommendation**: ML model suggests pins based on activity

**Scale**: 500+ million users, billions of pins.

**Key Tech**: Computer vision for visual search, collaborative filtering, HBase for storage.

**Interview Tip**: Pinterest's visual search uses CNNs to find similar images - search by uploading a photo.`,

  // REDDIT SYSTEMS
  'reddit-1': `**Overview**: Reddit is a social news platform with communities (subreddits), voting, and discussions.

**How it works**:
1. **Posting**: Users post content to subreddits
2. **Voting**: Upvotes/downvotes determine post ranking
3. **Ranking**: Hot algorithm ranks posts by votes and recency
4. **Comments**: Threaded comments with voting

**Scale**: 500+ million users, 100,000+ active subreddits.

**Key Tech**: Hot ranking algorithm, Cassandra for storage, memcached for caching.

**Interview Tip**: Reddit's ranking is time-decay - older posts decay in ranking even with upvotes.`,

  // TIKTOK SYSTEMS
  'tiktok-1': `**Overview**: TikTok is a short-form video platform with algorithmic feed and viral content discovery.

**How it works**:
1. **Upload**: Videos uploaded, transcoded into multiple formats
2. **Feed**: For You Page shows videos based on ML recommendations
3. **Engagement**: Likes, shares, watch time signal engagement
4. **Virality**: Algorithm promotes engaging content to wider audience

**Scale**: 1+ billion users, billions of videos.

**Key Tech**: ML for recommendations, video transcoding, CDN for delivery.

**Interview Tip**: TikTok's algorithm is engagement-driven - it shows you content you'll watch, not just what you follow.`,

  // STRIPE SYSTEMS
  'stripe-1': `**Overview**: Stripe is a payment processing platform handling billions in transactions with fraud detection.

**How it works**:
1. **Payment**: Customer enters card details, tokenized for security
2. **Processing**: Payment sent to card network (Visa, Mastercard)
3. **Fraud Detection**: ML model scores transaction for fraud risk
4. **Settlement**: Funds transferred to merchant account

**Scale**: Billions in transactions, millions of businesses.

**Key Tech**: Tokenization for security, ML for fraud detection, PCI compliance.

**Interview Tip**: Stripe abstracts payment complexity - merchants don't deal with card networks directly.`,

  // SHOPIFY SYSTEMS
  'shopify-1': `**Overview**: Shopify is an e-commerce platform powering online stores with payments, inventory, and shipping.

**How it works**:
1. **Store Setup**: Merchants create store, add products
2. **Checkout**: Customers add to cart, checkout with Shopify Payments
3. **Fulfillment**: Orders sent to fulfillment, shipping labels generated
4. **Analytics**: Sales data tracked and visualized

**Scale**: 2+ million merchants, billions in GMV.

**Key Tech**: Ruby on Rails, MySQL for storage, Redis for caching.

**Interview Tip**: Shopify is multi-tenant - millions of stores run on shared infrastructure with data isolation.`,

  // GITHUB SYSTEMS
  'github-1': `**Overview**: GitHub is a code hosting platform with version control, collaboration, and CI/CD.

**How it works**:
1. **Repository**: Code stored in Git repositories
2. **Collaboration**: Pull requests enable code review and merging
3. **CI/CD**: GitHub Actions run tests and deployments
4. **Social**: Stars, forks, and follows create social graph

**Scale**: 100+ million developers, 400+ million repositories.

**Key Tech**: Git for version control, MySQL for metadata, Actions for CI/CD.

**Interview Tip**: GitHub's challenge is scale - storing and serving 400M+ repos requires distributed storage.`,

  // TWITCH SYSTEMS
  'twitch-1': `**Overview**: Twitch is a live streaming platform for gaming, esports, and creative content.

**How it works**:
1. **Streaming**: Streamers broadcast via RTMP to Twitch servers
2. **Transcoding**: Video transcoded into multiple bitrates
3. **Distribution**: Video distributed via CDN to viewers
4. **Chat**: Real-time chat using WebSocket

**Scale**: 30+ million daily visitors, millions of streamers.

**Key Tech**: RTMP for ingest, HLS for delivery, WebSocket for chat.

**Interview Tip**: Live streaming requires low latency - Twitch aims for <5 seconds from streamer to viewer.`,

  // DISCORD SYSTEMS
  'discord-1': `**Overview**: Discord is a voice/text chat platform for communities with servers, channels, and bots.

**How it works**:
1. **Messaging**: Messages sent via WebSocket, stored in Cassandra
2. **Voice**: WebRTC for peer-to-peer or server-mediated voice
3. **Servers**: Communities organized into servers with channels
4. **Bots**: Bots extend functionality via Discord API

**Scale**: 150+ million users, billions of messages.

**Key Tech**: WebSocket for real-time messaging, WebRTC for voice, Cassandra for storage.

**Interview Tip**: Discord's voice is low-latency - they use Opus codec and optimize routing for gaming.`,

  // SNAPCHAT SYSTEMS
  'snapchat-1': `**Overview**: Snapchat is a messaging app with ephemeral content, stories, and AR filters.

**How it works**:
1. **Snap**: Photos/videos sent to friends, deleted after viewing
2. **Stories**: 24-hour content visible to friends
3. **AR**: Lenses use computer vision for face filters
4. **Discover**: Publisher content shown in Discover feed

**Scale**: 400+ million users, billions of snaps daily.

**Key Tech**: Computer vision for AR, ephemeral storage, CDN for media.

**Interview Tip**: Ephemeral content is the key - messages are deleted after viewing, reducing storage costs.`,

  // PAYPAL SYSTEMS
  'paypal-1': `**Overview**: PayPal is a digital payment platform for online transactions with buyer/seller protection.

**How it works**:
1. **Payment**: Buyer sends payment to seller's PayPal account
2. **Processing**: Payment processed, funds held in escrow
3. **Fraud Detection**: ML model scores transaction for fraud
4. **Settlement**: Funds released to seller after confirmation

**Scale**: 400+ million users, billions in transactions.

**Key Tech**: ML for fraud detection, encryption for security, PCI compliance.

**Interview Tip**: PayPal's advantage is buyer protection - disputes are resolved in buyer's favor by default.`,

  // VENMO SYSTEMS
  'venmo-1': `**Overview**: Venmo is a peer-to-peer payment app with social feed and instant transfers.

**How it works**:
1. **Transfer**: User sends money to friend via phone number or username
2. **Processing**: Payment processed instantly, funds available immediately
3. **Social Feed**: Transactions (without amounts) shown in social feed
4. **Settlement**: Funds transferred to bank account or kept in Venmo balance

**Scale**: 80+ million users, billions in transactions.

**Key Tech**: Real-time payment processing, social graph, mobile-first design.

**Interview Tip**: Venmo's social feed is unique - it makes payments social, encouraging usage.`,
};
