->TASK1: This project optimizes fetching top-selling products in a NestJS application by:

Improving database queries (removing N+1 issue).

Using Redis caching to reduce repeated queries and improve response time.

Optimization Steps:
Used JOIN and GROUP BY to aggregate sales data in a single SQL query.
Avoided fetching all products individually, improving performance.

Redis Integration:
Implemented a Redis provider in redis.provider.ts.
Created a Redis service to handle caching.
Cached top-selling products for a configurable TTL to reduce DB load.

->TASK2: This project handles payment processing efficiently in a NestJS application by:

Storing payment records in a structured database schema.
Handling multiple payment attempts per order.
Storing payment gateway responses in JSON format for better tracking.

Technologies Used:
NestJS (Backend framework)
MySQL (Database)
TypeORM (ORM)
Redis (Caching layer)

Setup:
Run Services via Docker Compose
docker-compose up -d
