import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message: "Hello from Next.js API route!"});
}

export async function POST(request: Request){
    const reqBody = await request.json();
    const {name} = reqBody;
    return NextResponse.json({message: `this ${name} Data received successfully in the post route`});
}