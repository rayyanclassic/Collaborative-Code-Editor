import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { YSocketIO } from "y-socket.io/dist/server"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// FIRST - serve static files
app.use(express.static(path.join(__dirname, "dist")))

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok", success: true })
})

// LAST - fallback to index.html
app.get("/{*path}", (req, res) => {
res.sendFile(path.join(__dirname, "dist", "index.html"))
})

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000")
})