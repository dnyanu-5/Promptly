import express from 'express';
import Thread from '../models/Threads.js'
import getOpenAIResponse from '../utils/openAi.js'

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "testing thread1",
        });

        const response = await thread.save();
        res.send(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to save in DB" });
    }
});


// get all threads 
router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 })
        // chat will appear in descending order
        res.json(threads);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to fetch thread" });
    }
});

// get individual thread/chat  by id  
router.get("/thread/:threadId", async (req, res) => {

    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            res.status(404).json({ error: "Chat not found" });
        }
        res.json(thread.messages);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to fetch chat" });
    }
});

// delete individual thread/chat  by id  
router.get("/thread/:threadId", async (req, res) => {

    const { threadId } = req.params;

    try {
        const deleteThread = await Thread.findOneAndDelete({ threadId });
        if (!deleteThread) {
            res.status(404).json({ error: "Chat not found" });
        }
        res.status(200).json({ success: "Chat deleted successfully." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to fetch chat" });
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, messages } = req.body;

    if (!threadId || !messages) {
        return res.status(400).json({ error: "missing required feilds" });
    }
    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread({
                threadId,
                title: messages,
                messages: [{ role: "user", content: messages }]
            });
        } else {
            thread.messages.push({ role: "user", content: messages })
        }

        const assistantReply = await getOpenAIResponse(messages);
        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();
        await thread.save();
        return res.json({ reply: assistantReply });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }

});

export default router;