// Part 1: Interview-focused "How It Works" explanations
// Concise, memorable explanations perfect for interviews

export const HOW_IT_WORKS_PART1: Record<string, string> = {
  // GOOGLE SYSTEMS
  'google-1': `**Overview**: Google Search is a distributed web crawler and indexing system that finds and ranks billions of web pages in milliseconds.

**How it works**:
1. **Crawling**: Googlebot continuously crawls the web, following links and discovering new pages
2. **Indexing**: Pages are analyzed and stored in massive distributed databases (Bigtable) with inverted indexes
3. **Query Processing**: When you search, the query is parsed and matched against the index using PageRank and BERT for relevance
4. **Ranking & Serving**: Results are ranked by 200+ factors, cached in CDN, and served in <200ms

**Scale**: 8.5 billion searches/day across 100+ petabytes of indexed data.

**Key Tech**: MapReduce processes massive datasets in parallel, Bigtable stores petabytes efficiently, PageRank ranks by link authority.

**Interview Tip**: Think of it like a library catalog system, but instead of one librarian, you have millions working in parallel to find the best books instantly.`,

  'google-2': `**Overview**: YouTube is a global video platform that transcodes, stores, and streams billions of hours of video using adaptive bitrate streaming.

**How it works**:
1. **Upload**: Videos are uploaded and queued for processing
2. **Transcoding**: Videos are converted into multiple formats/resolutions (360p, 720p, 1080p, 4K) using massive transcoding farms
3. **CDN Distribution**: Processed videos are distributed to edge servers worldwide for low-latency access
4. **Adaptive Streaming**: Client devices automatically switch quality based on bandwidth

**Scale**: 500 hours uploaded per minute, 2 billion users, 1 billion hours watched daily.

**Key Tech**: VP9/AV1 codecs for compression, global CDN for edge caching, ML recommendation engine.

**Interview Tip**: Like Netflix but user-generated - the challenge is handling unpredictable upload spikes while maintaining quality.`,

  'google-3': `**Overview**: Gmail is a distributed email system with smart filtering, search, and real-time sync across devices.

**How it works**:
1. **Receiving**: Emails arrive at SMTP servers and are immediately scanned for spam/malware
2. **Storage**: Messages stored in Bigtable with full-text indexing for instant search
3. **Filtering**: ML models classify emails (Primary, Social, Promotions) and detect spam
4. **Sync**: Real-time updates pushed to all devices via WebSocket connections

**Scale**: 1.8 billion users, 300+ billion emails sent daily.

**Key Tech**: Bigtable for storage, TensorFlow for spam detection, Protocol Buffers for efficient data serialization.

**Interview Tip**: The key innovation is treating email like search - every message is indexed and searchable instantly.`,

  'google-4': `**Overview**: Google Maps combines satellite imagery, street data, and real-time traffic to provide navigation and location services.

**How it works**:
1. **Data Collection**: Satellite imagery, Street View cars, and user data continuously update the map
2. **Routing**: Dijkstra's algorithm with real-time traffic data calculates optimal routes
3. **Rendering**: Map tiles are pre-rendered at multiple zoom levels and cached in CDN
4. **Real-time Updates**: Traffic data from Android devices updates routes dynamically

**Scale**: 1 billion monthly users, 25 million miles of roads mapped.

**Key Tech**: Spatial databases for geo data, graph algorithms for routing, WebGL for smooth rendering.

**Interview Tip**: It's essentially a massive graph problem - roads are edges, intersections are nodes, and traffic is edge weights.`,

  'google-5': `**Overview**: Google Drive is a cloud storage system with real-time collaboration, version control, and cross-device sync.

**How it works**:
1. **Upload**: Files are chunked, compressed, and encrypted before upload
2. **Storage**: Chunks stored across distributed file system (Colossus) with replication
3. **Sync**: Operational Transformation (OT) resolves concurrent edits in real-time
4. **Sharing**: Access control lists (ACLs) manage permissions at file/folder level

**Scale**: 1 billion users, exabytes of data stored.

**Key Tech**: Colossus distributed file system, Operational Transformation for conflict resolution, AES-256 encryption.

**Interview Tip**: The hard part is real-time collaboration - when two people edit the same doc, OT ensures both see consistent results.`,

  'google-6': `**Overview**: Google Ads is a real-time bidding system that matches ads to search queries in milliseconds using auction algorithms.

**How it works**:
1. **Query Analysis**: When a user searches, keywords are extracted and matched to advertiser bids
2. **Auction**: Ad auction runs using Quality Score × Bid to determine ad rank
3. **Selection**: Top ads are selected based on relevance and bid amount
4. **Serving**: Ads are rendered and tracked for clicks/conversions

**Scale**: $200+ billion annual revenue, billions of auctions per day.

**Key Tech**: Real-time bidding algorithms, ML for Quality Score, distributed auction system.

**Interview Tip**: It's a second-price auction - you pay just enough to beat the next highest bidder, encouraging truthful bidding.`,

  'google-7': `**Overview**: Google Photos uses ML to organize, search, and back up photos with unlimited storage and smart features.

**How it works**:
1. **Upload**: Photos are compressed, deduplicated, and uploaded to cloud storage
2. **Analysis**: Computer vision models detect faces, objects, scenes, and text
3. **Indexing**: Photos are indexed by content, making them searchable ("beach sunset")
4. **Features**: Auto-enhance, collages, and animations are generated using ML

**Scale**: 4 trillion photos stored, 28 billion photos uploaded weekly.

**Key Tech**: TensorFlow for image recognition, Colossus for storage, MobileNet for on-device processing.

**Interview Tip**: The magic is in the search - you can find "dog at beach" without ever tagging photos manually.`,

  'google-8': `**Overview**: Google Cloud Platform provides scalable infrastructure with compute, storage, and managed services.

**How it works**:
1. **Provisioning**: Users request resources (VMs, containers, databases) via API/console
2. **Orchestration**: Kubernetes manages container deployment and scaling
3. **Networking**: Global fiber network connects regions with low latency
4. **Billing**: Usage is metered per-second and billed automatically

**Scale**: 35+ regions, millions of VMs, petabytes of data processed daily.

**Key Tech**: Kubernetes for orchestration, Spanner for global database, Andromeda for networking.

**Interview Tip**: GCP's advantage is Google's internal tech (Kubernetes, TensorFlow, Bigtable) made available to everyone.`,

  'google-9': `**Overview**: Google Assistant is a voice-activated AI that understands natural language and performs tasks across devices.

**How it works**:
1. **Voice Input**: Audio is captured and sent to cloud for processing
2. **Speech-to-Text**: Neural networks convert audio to text
3. **Intent Recognition**: NLP models understand what the user wants
4. **Action**: Assistant executes the task (search, smart home control, etc.)

**Scale**: 500+ million users, 90+ languages supported.

**Key Tech**: WaveNet for speech synthesis, BERT for language understanding, on-device processing for privacy.

**Interview Tip**: The challenge is handling ambiguity - "turn on the lights" needs context about which room and which lights.`,

  'google-10': `**Overview**: Chrome browser renders web pages using a multi-process architecture for security and performance.

**How it works**:
1. **Request**: User enters URL, DNS lookup resolves domain to IP
2. **Fetch**: HTML/CSS/JS are downloaded from server
3. **Parsing**: HTML is parsed into DOM tree, CSS into CSSOM
4. **Rendering**: Blink engine combines DOM+CSSOM, paints pixels to screen

**Scale**: 3+ billion users, 60% browser market share.

**Key Tech**: V8 JavaScript engine, Blink rendering engine, sandboxed processes for security.

**Interview Tip**: Each tab runs in its own process - if one crashes, others stay alive. Security through isolation.`,

  'google-11': `**Overview**: Google Translate uses neural machine translation to translate text between 100+ languages in real-time.

**How it works**:
1. **Input**: User enters text or speaks in source language
2. **Encoding**: Transformer model encodes input into language-agnostic representation
3. **Decoding**: Decoder generates translation in target language
4. **Post-processing**: Grammar and formatting are corrected

**Scale**: 100+ billion words translated daily, 100+ languages.

**Key Tech**: Transformer architecture, attention mechanisms, multilingual models.

**Interview Tip**: Modern NMT translates meaning, not word-by-word - it understands context like "bank" (river vs money).`,

  'google-12': `**Overview**: Android OS is a Linux-based mobile operating system with app sandboxing and Google services integration.

**How it works**:
1. **Boot**: Linux kernel loads, then Android runtime (ART) starts
2. **Apps**: Each app runs in its own process with isolated permissions
3. **Services**: Google Play Services provide APIs for maps, auth, notifications
4. **Updates**: OTA updates are downloaded and applied in background

**Scale**: 3+ billion active devices, 70% mobile market share.

**Key Tech**: Linux kernel, ART runtime, Binder IPC for inter-process communication.

**Interview Tip**: Android's security model is process isolation - apps can't access each other's data without explicit permissions.`,

  'google-13': `**Overview**: Google Calendar is a distributed scheduling system with real-time sync, smart suggestions, and meeting coordination.

**How it works**:
1. **Event Creation**: Users create events with time, location, attendees
2. **Sync**: Events are stored in cloud and synced to all devices via push notifications
3. **Conflict Detection**: System checks for scheduling conflicts and suggests alternatives
4. **Reminders**: Notifications are sent before events based on user preferences

**Scale**: 500+ million users, billions of events managed.

**Key Tech**: Operational Transformation for concurrent edits, push notifications, ML for smart scheduling.

**Interview Tip**: The hard part is handling time zones - an event at "3pm" means different things in different locations.`,

  'google-14': `**Overview**: Google Meet is a video conferencing platform with real-time audio/video streaming and screen sharing.

**How it works**:
1. **Connection**: WebRTC establishes peer-to-peer connections between participants
2. **Encoding**: Audio/video is compressed using VP9/Opus codecs
3. **Routing**: Media is routed through Google's global network for low latency
4. **Features**: ML removes background noise, auto-captions transcribe speech

**Scale**: 100+ million daily meeting participants.

**Key Tech**: WebRTC for real-time communication, VP9 codec, ML for noise cancellation.

**Interview Tip**: For large meetings, it switches from P2P to SFU (Selective Forwarding Unit) to reduce bandwidth.`,

  'google-15': `**Overview**: Google Docs is a real-time collaborative document editor with operational transformation for conflict resolution.

**How it works**:
1. **Editing**: Users type, changes are sent to server as operations (insert, delete)
2. **OT**: Operational Transformation resolves conflicts when multiple users edit simultaneously
3. **Sync**: All clients receive operations and apply them in correct order
4. **Storage**: Document stored as sequence of operations, not final state

**Scale**: 2+ billion documents created.

**Key Tech**: Operational Transformation, WebSocket for real-time sync, Colossus for storage.

**Interview Tip**: OT is like Git for real-time editing - it merges concurrent changes automatically without conflicts.`,

  'google-16': `**Overview**: Google Kubernetes Engine (GKE) is a managed Kubernetes service for container orchestration at scale.

**How it works**:
1. **Cluster Creation**: Users create Kubernetes clusters with specified node count
2. **Deployment**: Containers are deployed as pods across nodes
3. **Scaling**: Horizontal Pod Autoscaler adjusts replicas based on CPU/memory
4. **Load Balancing**: Service mesh routes traffic to healthy pods

**Scale**: Millions of containers managed across thousands of clusters.

**Key Tech**: Kubernetes for orchestration, Istio for service mesh, GCE for compute.

**Interview Tip**: Kubernetes is like a datacenter OS - it abstracts away individual machines and manages resources as a pool.`,

  'google-17': `**Overview**: Google BigQuery is a serverless data warehouse for analyzing petabytes of data using SQL.

**How it works**:
1. **Storage**: Data is stored in columnar format (Capacitor) for fast scans
2. **Query**: SQL query is parsed and distributed across thousands of workers
3. **Execution**: Workers scan data in parallel, aggregate results
4. **Results**: Final results are returned to user in seconds

**Scale**: Exabytes of data analyzed, queries on petabytes in seconds.

**Key Tech**: Columnar storage, Dremel query engine, distributed execution.

**Interview Tip**: It's serverless - you don't provision machines, just run queries and pay for data scanned.`,

  'google-18': `**Overview**: Google Cloud Spanner is a globally distributed SQL database with strong consistency and horizontal scalability.

**How it works**:
1. **Sharding**: Data is automatically sharded across regions
2. **Replication**: Each shard is replicated using Paxos for consistency
3. **Transactions**: TrueTime API uses atomic clocks to order transactions globally
4. **Queries**: SQL queries are routed to appropriate shards

**Scale**: Petabytes of data, millions of QPS, 99.999% availability.

**Key Tech**: TrueTime for global consistency, Paxos for replication, F1 query engine.

**Interview Tip**: Spanner breaks the CAP theorem - it's both consistent AND available using atomic clocks for global time.`,

  'google-19': `**Overview**: Google Pub/Sub is a messaging service for asynchronous communication between services.

**How it works**:
1. **Publish**: Publishers send messages to topics
2. **Storage**: Messages are stored temporarily in distributed queue
3. **Subscribe**: Subscribers pull messages from subscriptions
4. **Acknowledgment**: Subscribers ack messages after processing

**Scale**: Billions of messages per day, global delivery.

**Key Tech**: Distributed queue, at-least-once delivery, push/pull subscriptions.

**Interview Tip**: It decouples services - publishers don't know about subscribers, enabling independent scaling.`,

  'google-20': `**Overview**: Google Cloud Functions is a serverless compute platform that runs code in response to events.

**How it works**:
1. **Trigger**: Event (HTTP request, Pub/Sub message) triggers function
2. **Cold Start**: If no instance available, new container is started
3. **Execution**: Function code runs in isolated container
4. **Billing**: Charged only for execution time (100ms granularity)

**Scale**: Millions of function invocations per second.

**Key Tech**: Container orchestration, event-driven architecture, auto-scaling.

**Interview Tip**: Serverless means you write code, not manage servers - platform handles scaling, availability, and billing.`,

  // MICROSOFT SYSTEMS
  'microsoft-1': `**Overview**: Azure Active Directory is a cloud identity service for authentication and access management.

**How it works**:
1. **Authentication**: Users sign in with credentials, MFA is verified
2. **Token Issuance**: OAuth/OIDC tokens are issued with user claims
3. **Authorization**: Apps validate tokens and check permissions
4. **SSO**: Single sign-on allows access to multiple apps with one login

**Scale**: 500+ million users, billions of authentications daily.

**Key Tech**: OAuth 2.0, OpenID Connect, SAML for federation.

**Interview Tip**: It's identity-as-a-service - apps don't store passwords, they trust Azure AD's tokens.`,

  'microsoft-2': `**Overview**: Office 365 is a cloud productivity suite with real-time collaboration across Word, Excel, PowerPoint.

**How it works**:
1. **Editing**: Users edit documents, changes are sent as operations
2. **Sync**: Operational Transformation merges concurrent edits
3. **Storage**: Documents stored in SharePoint with versioning
4. **Collaboration**: Co-authoring shows cursors and changes in real-time

**Scale**: 300+ million users, billions of documents.

**Key Tech**: Operational Transformation, SharePoint for storage, WebSocket for real-time sync.

**Interview Tip**: The challenge is offline editing - changes made offline must merge cleanly when back online.`,

  'microsoft-3': `**Overview**: Azure Cosmos DB is a globally distributed NoSQL database with multiple consistency models.

**How it works**:
1. **Partitioning**: Data is partitioned by partition key across regions
2. **Replication**: Data is replicated to multiple regions with configurable consistency
3. **Indexing**: All fields are automatically indexed for fast queries
4. **Multi-model**: Supports document, key-value, graph, and column-family APIs

**Scale**: Petabytes of data, unlimited throughput, <10ms latency.

**Key Tech**: Multi-master replication, tunable consistency, automatic indexing.

**Interview Tip**: You choose consistency level per-request - strong for critical data, eventual for high availability.`,

  'microsoft-4': `**Overview**: Azure Kubernetes Service (AKS) is a managed Kubernetes platform for container orchestration.

**How it works**:
1. **Cluster**: Managed control plane, user manages worker nodes
2. **Deployment**: Containers deployed as pods, scaled automatically
3. **Networking**: Azure CNI provides pod-level networking
4. **Monitoring**: Azure Monitor collects logs and metrics

**Scale**: Thousands of clusters, millions of containers.

**Key Tech**: Kubernetes, Azure CNI for networking, Azure Monitor for observability.

**Interview Tip**: AKS manages the control plane - you don't patch or upgrade Kubernetes masters, Azure does.`,

  'microsoft-5': `**Overview**: Azure Functions is a serverless compute service that runs event-driven code.

**How it works**:
1. **Trigger**: HTTP, timer, queue, or blob storage event triggers function
2. **Execution**: Function runs in isolated container with auto-scaling
3. **Bindings**: Input/output bindings connect to other Azure services
4. **Billing**: Pay per execution and memory used

**Scale**: Millions of executions per second.

**Key Tech**: Event-driven architecture, auto-scaling, consumption-based pricing.

**Interview Tip**: Bindings are declarative - you specify inputs/outputs in config, not code.`,

  'microsoft-6': `**Overview**: Azure DevOps is a CI/CD platform for building, testing, and deploying applications.

**How it works**:
1. **Source Control**: Code is stored in Git repos
2. **Build**: Pipelines compile code, run tests, create artifacts
3. **Release**: Deployment pipelines push to environments (dev, staging, prod)
4. **Monitoring**: Application Insights tracks performance and errors

**Scale**: Millions of builds per day.

**Key Tech**: Git for version control, YAML pipelines, container-based agents.

**Interview Tip**: Pipelines-as-code means your CI/CD config is versioned with your code.`,

  'microsoft-7': `**Overview**: Microsoft Teams is a collaboration platform with chat, video, and file sharing.

**How it works**:
1. **Messaging**: Messages are sent via WebSocket, stored in Azure
2. **Video**: WebRTC establishes peer-to-peer or server-mediated connections
3. **Files**: SharePoint stores files with versioning and permissions
4. **Integration**: Apps and bots extend functionality via APIs

**Scale**: 300+ million users, billions of messages daily.

**Key Tech**: WebSocket for real-time messaging, WebRTC for video, SharePoint for storage.

**Interview Tip**: Teams is built on top of existing Microsoft services - SharePoint for files, Exchange for calendar.`,

  'microsoft-8': `**Overview**: Azure Blob Storage is an object storage service for unstructured data like images, videos, backups.

**How it works**:
1. **Upload**: Files are uploaded as blobs to containers
2. **Replication**: Data is replicated (LRS, GRS, RA-GRS) for durability
3. **Tiering**: Hot, cool, and archive tiers optimize cost vs access speed
4. **Access**: Blobs are accessed via REST API or SDKs

**Scale**: Exabytes of data stored, 99.999999999% durability.

**Key Tech**: Erasure coding for durability, tiered storage, CDN integration.

**Interview Tip**: It's like S3 - cheap, durable object storage with different tiers for different access patterns.`,

  'microsoft-9': `**Overview**: Azure SQL Database is a managed relational database with automatic backups and scaling.

**How it works**:
1. **Provisioning**: Database is created with specified compute/storage
2. **Replication**: Data is replicated to secondary replicas for HA
3. **Backups**: Automatic backups with point-in-time restore
4. **Scaling**: Compute and storage scale independently

**Scale**: Millions of databases, petabytes of data.

**Key Tech**: SQL Server engine, Always On availability groups, automatic tuning.

**Interview Tip**: It's SQL Server without the ops - Microsoft handles patching, backups, and HA.`,

  'microsoft-10': `**Overview**: Azure Service Bus is a message broker for reliable asynchronous communication.

**How it works**:
1. **Send**: Messages are sent to queues or topics
2. **Storage**: Messages are persisted until consumed
3. **Receive**: Consumers pull messages and process them
4. **Dead Letter**: Failed messages go to dead-letter queue for debugging

**Scale**: Billions of messages per day.

**Key Tech**: AMQP protocol, at-least-once delivery, message sessions for ordering.

**Interview Tip**: Queues are 1:1, topics are 1:many - use topics when multiple services need the same message.`,
};
