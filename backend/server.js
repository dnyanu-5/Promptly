import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ChatRoutes from './routes/chat.js';

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());

app.use('/api', ChatRoutes);

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT} port`);
    connectDB();
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB is connected");
    } catch(err){
        console.log("failed to connect", err);
    }
}





























// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "user",
//                     content: req.body.message
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         console.log(data.choices[0].message.content); // reply
//         res.send(data.choices[0].message.content);
//     } catch (err) {
//         console.log(err);
//     }
// });

