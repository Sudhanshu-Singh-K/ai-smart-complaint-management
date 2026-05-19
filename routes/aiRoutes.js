const express = require("express");

const axios = require("axios");

const router = express.Router();

const Complaint = require("../models/Complaint");

router.post("/analyze", async (req, res) => {

    try {

        const complaint =
            req.body;

        const prompt = `

You are an AI Complaint Management Assistant.

Analyze this complaint.

Complaint Details:

Name:
${complaint.name}

Title:
${complaint.title}

Description:
${complaint.description}

Category:
${complaint.category}

Location:
${complaint.location}

Tasks:

1. Detect complaint priority
2. Suggest department
3. Generate short summary
4. Generate automatic response message

`;

        const response =
            await axios.post(

                "https://openrouter.ai/api/v1/chat/completions",

                {
                    model: "openai/gpt-5.2",

                    max_tokens: 400,

                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                },

                {
                    headers: {

                        Authorization:
                            `Bearer ${process.env.OPENROUTER_API_KEY}`,

                        "Content-Type":
                            "application/json"
                    }
                }

            );

        res.status(200).json({

            success: true,

            aiAnalysis:
                response.data
                .choices[0]
                .message
                .content

        });

    } catch (error) {

        console.log(
            error.response?.data
        );

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;