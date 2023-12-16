import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET( req: NextApiRequest,res: NextApiResponse){
  console.log(req)
    const base64Image = req.body.url;

    console.log("VisionjjjjApi")
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("API key not found");
    }

    const prompt = `
    You generate the questions. This image contains social issues.

    # Output Example
    - 雨はどのような影響を人に与える？
    - なぜ太陽は沈むの？
    
    # Careful.
    - output is Japanese
    - Don't give answers
    - Ask unique questions
    - A curious point of view`;

    const payload = {
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { 
                      type: "text",
                      text: prompt 
                    },
                    { 
                      type: "image_url",
                      image_url: {
                        url: `data:image/jpeg;base64${base64Image}`
                      } 
                    }
                ]
            }
        ],
        max_tokens: 300
    };
    console.log(payload)

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.log("HTTP error! status", response.status)
            res.status(500).json({ error: "HTTP error! status" });
        }
        const data = await response.json();
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        console.error("There was an error!", error);
        res.status(500).json({ error: "Internal Server Error" });
    } 
};