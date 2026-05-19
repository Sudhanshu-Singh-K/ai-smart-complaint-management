require("dotenv").config();
const axios = require("axios");

async function testAI() {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-5.2",
                max_tokens: 200,
                messages: [
                    {
                        role: "user",
                        content: "Hello AI"
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(response.data.choices[0].message.content);
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

testAI();