// Part 2: Interview-focused "How It Works" explanations
// Continuing from Part 1

export const HOW_IT_WORKS_PART2: Record<string, string> = {
  // AMAZON/AWS SYSTEMS
  'amazon-1': `**Overview**: Amazon.com is an e-commerce platform handling millions of orders with personalized recommendations.

**How it works**:
1. **Browse**: Users search/browse products, recommendations shown via collaborative filtering
2. **Cart**: Items added to cart, stored in DynamoDB for persistence
3. **Checkout**: Payment processed, order sent to fulfillment centers
4. **Delivery**: Routing algorithms optimize delivery routes

**Scale**: 300+ million customers, billions of items.

**Key Tech**: Collaborative filtering for recommendations, DynamoDB for cart, microservices architecture.

**Interview Tip**: The recommendation engine drives 35% of sales - it's a massive graph problem matching users to products.`,

  'amazon-2': `**Overview**: AWS EC2 provides virtual machines on-demand with flexible compute, storage, and networking.

**How it works**:
1. **Launch**: User selects instance type, AMI, and launches VM
2. **Provisioning**: Hypervisor allocates resources and boots VM
3. **Networking**: VPC provides isolated network with security groups
4. **Billing**: Charged per-second for compute time

**Scale**: Millions of VMs running globally.

**Key Tech**: Xen/Nitro hypervisor, EBS for block storage, VPC for networking.

**Interview Tip**: EC2 is IaaS - you get raw VMs and manage everything above the hypervisor.`,

  'amazon-3': `**Overview**: AWS S3 is object storage with 99.999999999% durability and unlimited scalability.

**How it works**:
1. **Upload**: Objects are uploaded to buckets via REST API
2. **Replication**: Data is replicated across multiple availability zones
3. **Versioning**: Optional versioning keeps all object versions
4. **Access**: Objects accessed via HTTP with signed URLs or IAM policies

**Scale**: Trillions of objects, exabytes of data.

**Key Tech**: Erasure coding for durability, eventual consistency, lifecycle policies.

**Interview Tip**: S3 is eventually consistent for overwrites - read after write might return old version briefly.`,

  'amazon-4': `**Overview**: AWS Lambda runs code without servers, scaling automatically and charging per-execution.

**How it works**:
1. **Trigger**: Event (API Gateway, S3, DynamoDB) invokes function
2. **Cold Start**: If no warm container, new one is initialized
3. **Execution**: Function runs with allocated memory/CPU
4. **Billing**: Charged for execution time in 1ms increments

**Scale**: Trillions of invocations per month.

**Key Tech**: Firecracker microVMs for isolation, event-driven architecture.

**Interview Tip**: Cold starts are the tradeoff - first invocation is slow, subsequent ones are fast if container is warm.`,

  'amazon-5': `**Overview**: AWS DynamoDB is a NoSQL database with single-digit millisecond latency at any scale.

**How it works**:
1. **Partitioning**: Data is partitioned by partition key across nodes
2. **Replication**: Each partition replicated 3x across AZs
3. **Indexing**: GSI/LSI provide additional query patterns
4. **Scaling**: Auto-scaling adjusts capacity based on traffic

**Scale**: Trillions of requests per day, petabytes of data.

**Key Tech**: Consistent hashing for partitioning, Paxos for replication, SSD storage.

**Interview Tip**: Choose partition key carefully - hot partitions cause throttling. Aim for uniform distribution.`,

  'amazon-6': `**Overview**: Amazon Prime Video streams video content with adaptive bitrate and offline downloads.

**How it works**:
1. **Encoding**: Videos transcoded into multiple bitrates/resolutions
2. **CDN**: Content distributed to CloudFront edge locations
3. **Streaming**: HLS/DASH protocols adapt quality based on bandwidth
4. **DRM**: Widevine/FairPlay protect content from piracy

**Scale**: 200+ million subscribers, petabytes of video.

**Key Tech**: H.264/H.265 codecs, CloudFront CDN, adaptive bitrate streaming.

**Interview Tip**: Adaptive streaming is key - client switches quality seamlessly based on network conditions.`,

  'amazon-7': `**Overview**: AWS RDS is managed relational database supporting MySQL, PostgreSQL, SQL Server, Oracle.

**How it works**:
1. **Provisioning**: Database instance created with specified engine and size
2. **Replication**: Multi-AZ deployment replicates to standby for HA
3. **Backups**: Automated backups with point-in-time recovery
4. **Scaling**: Read replicas scale read traffic

**Scale**: Millions of databases, petabytes of data.

**Key Tech**: Database engines, synchronous replication, automated backups.

**Interview Tip**: Multi-AZ is for HA (failover), read replicas are for scaling reads. Different purposes.`,

  'amazon-8': `**Overview**: Amazon Alexa is a voice assistant using NLP to understand commands and control smart devices.

**How it works**:
1. **Wake Word**: Device detects "Alexa" using on-device ML
2. **Speech-to-Text**: Audio sent to cloud, converted to text
3. **Intent Recognition**: NLP determines user's intent
4. **Action**: Skill executes action (play music, control lights, etc.)

**Scale**: 100+ million devices, thousands of skills.

**Key Tech**: Deep learning for wake word detection, NLP for intent recognition, Lambda for skills.

**Interview Tip**: Skills are like apps - third-party developers extend Alexa's capabilities via Lambda functions.`,

  'amazon-9': `**Overview**: AWS CloudFront is a CDN that caches content at edge locations for low-latency delivery.

**How it works**:
1. **Request**: User requests content, DNS routes to nearest edge
2. **Cache Check**: Edge checks if content is cached
3. **Origin Fetch**: If miss, content fetched from origin (S3, EC2)
4. **Serve**: Content served from edge, cached for future requests

**Scale**: 400+ edge locations globally.

**Key Tech**: Anycast routing, HTTP/2, Lambda@Edge for edge compute.

**Interview Tip**: CDN reduces latency by serving from nearby edge - also reduces load on origin servers.`,

  'amazon-10': `**Overview**: AWS ECS is a container orchestration service for running Docker containers at scale.

**How it works**:
1. **Task Definition**: Define container image, CPU, memory, networking
2. **Cluster**: ECS cluster manages EC2 instances or Fargate
3. **Scheduling**: ECS scheduler places tasks on instances
4. **Load Balancing**: ALB distributes traffic across tasks

**Scale**: Millions of containers running.

**Key Tech**: Docker for containers, Fargate for serverless, ALB for load balancing.

**Interview Tip**: ECS vs EKS - ECS is AWS-native and simpler, EKS is standard Kubernetes.`,

  // META/FACEBOOK SYSTEMS
  'meta-1': `**Overview**: Facebook News Feed is a personalized content ranking system showing posts from friends and pages.

**How it works**:
1. **Content Generation**: Users create posts, stored in distributed database
2. **Fan-out**: Posts are pushed to followers' feeds (write fan-out)
3. **Ranking**: ML model ranks posts by predicted engagement
4. **Serving**: Top-ranked posts are shown in feed

**Scale**: 3+ billion users, billions of posts daily.

**Key Tech**: TAO graph database, ML ranking models, memcached for caching.

**Interview Tip**: Write fan-out vs read fan-out tradeoff - celebrities use read fan-out to avoid overwhelming followers.`,

  'meta-2': `**Overview**: WhatsApp is an end-to-end encrypted messaging app handling 100+ billion messages daily.

**How it works**:
1. **Encryption**: Messages encrypted on sender's device using Signal protocol
2. **Routing**: Encrypted message sent to WhatsApp servers, routed to recipient
3. **Delivery**: Message delivered when recipient is online
4. **Storage**: Messages stored temporarily until delivered, then deleted

**Scale**: 2+ billion users, 100+ billion messages daily.

**Key Tech**: Signal protocol for E2E encryption, Erlang for server infrastructure.

**Interview Tip**: E2E encryption means WhatsApp can't read messages - only sender and recipient have keys.`,

  'meta-3': `**Overview**: Instagram is a photo/video sharing platform with filters, stories, and algorithmic feed.

**How it works**:
1. **Upload**: Photos/videos uploaded, resized, and stored in CDN
2. **Processing**: Filters applied, thumbnails generated
3. **Feed**: ML model ranks posts by predicted engagement
4. **Stories**: 24-hour ephemeral content stored separately

**Scale**: 2+ billion users, 95+ million photos/videos shared daily.

**Key Tech**: Cassandra for storage, ML for ranking, CDN for media delivery.

**Interview Tip**: Stories are ephemeral - they're deleted after 24 hours, reducing storage costs significantly.`,

  'meta-4': `**Overview**: Facebook Messenger is a real-time messaging platform with chat, video calls, and bots.

**How it works**:
1. **Messaging**: Messages sent via WebSocket, stored in distributed database
2. **Delivery**: Messages delivered when recipient is online, queued if offline
3. **Video**: WebRTC for peer-to-peer video calls
4. **Bots**: Businesses integrate bots via Messenger API

**Scale**: 1+ billion users, billions of messages daily.

**Key Tech**: WebSocket for real-time messaging, WebRTC for video, TAO for social graph.

**Interview Tip**: Messenger uses write fan-out for group chats - message is written to each member's inbox.`,

  'meta-5': `**Overview**: Facebook Live is a live video streaming platform with real-time comments and reactions.

**How it works**:
1. **Capture**: Video captured on device, encoded with H.264
2. **Ingest**: Video sent to Facebook servers via RTMP
3. **Transcoding**: Video transcoded into multiple bitrates
4. **Distribution**: Video distributed via CDN to viewers

**Scale**: Millions of live streams daily.

**Key Tech**: RTMP for ingest, HLS for delivery, CDN for distribution.

**Interview Tip**: Live streaming is harder than VOD - you need low latency and can't buffer much.`,

  'meta-6': `**Overview**: Facebook Ads is a targeted advertising platform using user data for precise ad targeting.

**How it works**:
1. **Targeting**: Advertisers select audience based on demographics, interests, behavior
2. **Auction**: Ad auction determines which ads to show based on bid and relevance
3. **Serving**: Ads shown in feed, stories, or sidebar
4. **Tracking**: Pixel tracks conversions on advertiser's website

**Scale**: $100+ billion annual revenue, billions of ad impressions daily.

**Key Tech**: ML for targeting, real-time bidding, conversion tracking.

**Interview Tip**: Facebook's advantage is data - they know users' interests, behaviors, and social connections.`,

  'meta-7': `**Overview**: Facebook Groups is a community platform for discussions, events, and file sharing.

**How it works**:
1. **Creation**: Users create groups with privacy settings (public, private, secret)
2. **Posts**: Members post content, visible to group members
3. **Moderation**: Admins/moderators approve posts, ban users
4. **Notifications**: Members notified of new posts based on preferences

**Scale**: 1.8+ billion group members.

**Key Tech**: TAO for social graph, memcached for caching, ML for content moderation.

**Interview Tip**: Groups use read fan-out - posts are read from group feed, not written to each member's inbox.`,

  'meta-8': `**Overview**: Facebook Marketplace is a peer-to-peer marketplace for buying/selling items locally.

**How it works**:
1. **Listing**: Sellers create listings with photos, price, location
2. **Discovery**: Buyers search/browse listings, filtered by location
3. **Messaging**: Buyers contact sellers via Messenger
4. **Transaction**: Payment/delivery handled outside Facebook

**Scale**: 1+ billion users, millions of listings.

**Key Tech**: Elasticsearch for search, geospatial indexing for location, Messenger for communication.

**Interview Tip**: Marketplace is local-first - listings are shown to nearby users using geospatial queries.`,

  'meta-9': `**Overview**: Facebook Events is a platform for creating, discovering, and RSVPing to events.

**How it works**:
1. **Creation**: Users create events with date, location, description
2. **Invitations**: Invites sent to friends, who can RSVP
3. **Discovery**: Events shown in feed based on interests and location
4. **Reminders**: Notifications sent before event starts

**Scale**: Millions of events created monthly.

**Key Tech**: TAO for social graph, geospatial indexing, push notifications.

**Interview Tip**: Events use social graph - you're more likely to see events your friends are attending.`,

  'meta-10': `**Overview**: Facebook Watch is a video platform with original shows, live sports, and user-generated content.

**How it works**:
1. **Upload**: Videos uploaded, transcoded into multiple formats
2. **Recommendation**: ML model recommends videos based on watch history
3. **Streaming**: Adaptive bitrate streaming adjusts quality
4. **Monetization**: Ads shown before/during videos, revenue shared with creators

**Scale**: Billions of video views daily.

**Key Tech**: Video transcoding, ML for recommendations, CDN for delivery.

**Interview Tip**: Watch competes with YouTube - the challenge is getting users to watch long-form content on Facebook.`,

  // NETFLIX SYSTEMS
  'netflix-1': `**Overview**: Netflix streaming platform delivers personalized video content to 200+ million subscribers globally.

**How it works**:
1. **Encoding**: Videos encoded into multiple bitrates/resolutions
2. **CDN**: Content pre-positioned at ISP edge servers (Open Connect)
3. **Playback**: Client selects optimal bitrate based on bandwidth
4. **Recommendation**: ML model suggests content based on viewing history

**Scale**: 200+ million subscribers, 1+ billion hours watched weekly.

**Key Tech**: Open Connect CDN, adaptive bitrate streaming, ML for recommendations.

**Interview Tip**: Netflix's CDN is inside ISPs - they put servers at ISPs to reduce transit costs and improve quality.`,

  'netflix-2': `**Overview**: Netflix recommendation engine uses collaborative filtering and deep learning to personalize content.

**How it works**:
1. **Data Collection**: User interactions (views, ratings, searches) are logged
2. **Model Training**: ML models trained on viewing patterns
3. **Prediction**: Models predict which content user will enjoy
4. **Ranking**: Content ranked by predicted engagement

**Scale**: 80% of watched content comes from recommendations.

**Key Tech**: Collaborative filtering, deep learning, A/B testing.

**Interview Tip**: Netflix doesn't just recommend popular content - it finds niche content you'll love based on similar users.`,

  'netflix-3': `**Overview**: Netflix Chaos Engineering (Chaos Monkey) randomly terminates instances to test resilience.

**How it works**:
1. **Random Termination**: Chaos Monkey randomly kills instances in production
2. **Monitoring**: System monitors for failures and alerts
3. **Recovery**: Auto-scaling and redundancy ensure service continues
4. **Learning**: Teams fix weaknesses exposed by failures

**Scale**: Runs continuously in production.

**Key Tech**: Auto-scaling, circuit breakers, bulkheads for isolation.

**Interview Tip**: Chaos Engineering is proactive - find failures before customers do by intentionally breaking things.`,

  'netflix-4': `**Overview**: Netflix API Gateway (Zuul) routes requests to microservices with dynamic routing and filtering.

**How it works**:
1. **Request**: Client sends request to API Gateway
2. **Routing**: Zuul routes to appropriate microservice
3. **Filtering**: Pre/post filters handle auth, logging, rate limiting
4. **Response**: Response aggregated and returned to client

**Scale**: Billions of requests daily.

**Key Tech**: Zuul for gateway, Eureka for service discovery, Hystrix for circuit breaking.

**Interview Tip**: API Gateway is the front door - it handles cross-cutting concerns so microservices can focus on business logic.`,

  'netflix-5': `**Overview**: Netflix uses microservices architecture with 1000+ services for scalability and resilience.

**How it works**:
1. **Decomposition**: Monolith broken into small, independent services
2. **Communication**: Services communicate via REST APIs
3. **Discovery**: Eureka service registry tracks service instances
4. **Resilience**: Circuit breakers prevent cascading failures

**Scale**: 1000+ microservices, millions of requests per second.

**Key Tech**: Spring Boot for services, Eureka for discovery, Hystrix for resilience.

**Interview Tip**: Microservices enable independent deployment - teams can ship features without coordinating releases.`,
};
