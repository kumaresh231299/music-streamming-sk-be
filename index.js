import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/config.js"
import userRoute from "./Routers/userRoute.js"
import audioRoute from "./Routers/songRoute.js"
import userDetail from "./Routers/userDetailRoute.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))

//DB Connection
connectDB();

//Default Router
app.get("/", (req, res) => {
    res.status(200).send("Hi, Welcome to Our Music Streamming Application! ")
})

//Api Route
app.use("/api/user", userRoute);
app.use("/api/audio", audioRoute);
app.use("/api/update", userDetail);

//Listen
app.listen(PORT, () => {
    console.log("App is started and running on the port", PORT)
})
