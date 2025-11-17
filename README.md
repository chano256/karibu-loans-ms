Payments Gateway Deployment Guide

Prerequisites:
- Docker
- Docker Compose

Steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/payments-gateway.git
    cd payments-gateway
    ```
Copy .env.example to .env

2. Build and run the Docker containers:
    ```bash
    docker-compose up -d
    ```

3. Access the frontend at http://localhost:8085
4. Access the backend at http://localhost:8006

5. Testing
    Use the web interface at http://localhost:8085
    Test APIs directly using Swagger UI at http://localhost:8086/docs
    Use curl commands for API testing:

    ```bash
    # Initiate payment
    curl -X POST "http://localhost:8086/api/payments" \
        -H "Content-Type: application/json" \
        -d '{"payer":"1234567890","payee":"0987654321","amount":100.50,"currency":"USD"}'

    # Check status
    curl "http://localhost:8086/api/payments/TXNABC123DEF45678"
    ```

That's it! You should now have a working Payments Gateway deployment.