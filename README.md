# 🖥️ Real-Time Collaborative Code Editor
Real-time collaborative code editor React + Node.js + Socket.io + Yjs Dockerized and deployed on AWS ECS Fargate with ECR and ALB

A production-grade collaborative code editor where multiple users can write and edit code together in real-time — like Google Docs but for code.

**Live Demo:** http://docker-aws-project-2137427159.ap-northeast-1.elb.amazonaws.com

---

## 🚀 Features

- Real-time code mirroring across all connected users
- Live user presence — see who is currently in the session
- Persistent document state using Yjs CRDTs
- Monaco Editor (same editor used in VS Code)
- Fully containerized and deployed on AWS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Code Editor | Monaco Editor |
| Real-time Sync | Yjs, y-socket.io, y-monaco |
| Backend | Node.js, Express, Socket.io |
| Containerization | Docker |
| Container Registry | AWS ECR |
| Deployment | AWS ECS Fargate |
| Load Balancer | AWS Application Load Balancer |
| Networking | AWS VPC, Subnets, Security Groups |

---

## 🏗️ Architecture

```
User Browser
     │
     ▼
AWS Application Load Balancer (ALB)
     │
     ▼
AWS ECS Fargate (Docker Container)
     │
     ├── Express Server (port 3000)
     │        ├── Serves React Frontend (static files)
     │        ├── Socket.io WebSocket Server
     │        └── Yjs Document Sync (y-socket.io)
     │
AWS ECR (Docker Image Registry)
```

---

## 📦 Project Structure

```
DOCKER-AWS/
├── Frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── index.css      # Tailwind CSS
│   ├── package.json
│   └── vite.config.js
├── Backend/
│   ├── server.js          # Express + Socket.io + Yjs server
│   ├── Dockerfile
│   ├── package.json
│   └── dist/              # Built frontend (served by Express)
```

---

## 🖥️ Run Locally

### Prerequisites
- Node.js v18+
- Docker Desktop

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd DOCKER-AWS
```

### 2. Install and build frontend
```bash
cd Frontend
npm install
npm run build
cp -r dist ../Backend/dist
```

### 3. Install and run backend
```bash
cd ../Backend
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:3000
```

---

## 🐳 Run with Docker

```bash
cd Backend
docker build -t docker-aws/server .
docker run -p 3000:3000 docker-aws/server
```

Open `http://localhost:3000`

---

## ☁️ AWS Deployment

### Push to ECR
```bash
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.ap-northeast-1.amazonaws.com

docker tag docker-aws/server:latest <aws-account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/docker-aws/server:latest

docker push <aws-account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/docker-aws/server:latest
```

### Force redeploy ECS service
```bash
aws ecs update-service --cluster <cluster-name> --service <service-name> --force-new-deployment --region ap-northeast-1
```

---

## 👨‍💻 Author

**Md Rayyan Usmani**  
[GitHub](https://github.com/rayyanclassic) • [LinkedIn](https://linkedin.com/in/mohammadrayyanusmani)
