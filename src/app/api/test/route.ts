import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return new NextResponse(JSON.stringify({ message: 100 }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}