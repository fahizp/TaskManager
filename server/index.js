import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import taskRoutes from "./routes/task.js";
import multer from "multer"

const app = express();
dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/task', taskRoutes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

const startServer = async () => {
    try {
        app.listen(8080, () => console.log("Server has started on port http://localhost:8080"))
    } catch (error) {
        console.log(error);
    }
}

startServer();
