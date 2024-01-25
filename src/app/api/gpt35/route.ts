import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const RequestText = body.RequestText;
        
        if(!RequestText){
            return NextResponse.json({error: "RequestText not found"}, { status: 500})
        }
           
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({error: "API key not found"}, { status: 500})
        }

        const prompt = `次の文章を分かりやすくしてください「${RequestText}」`;
 

        const payload = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text",
                            text: prompt 
                        }
                    ]
                }
            ],
            max_tokens: 500
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            return NextResponse.json({error: "HTTP error"}, { status: response.status})
        }

        const json_data = await response.json();
        const response_data = json_data.choices[0].message.content;
        return NextResponse.json(response_data, { status: 200})

    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, { status: 500})
    }
}

export async function GET() {
    return new NextResponse(JSON.stringify({ message: 100 }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}