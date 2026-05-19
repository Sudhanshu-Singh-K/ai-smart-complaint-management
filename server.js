const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const authRoutes =
require("./routes/authRoutes");
const complaintRoutes =
require("./routes/complaintRoutes");
const matchRoutes = require("./routes/matchRoutes");
const aiRoutes = require("./routes/aiRoutes");


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/test", (req, res) => {
    res.send("Test Route Working");
});

app.use("/api/complaints",
complaintRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth",
authRoutes);



app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});