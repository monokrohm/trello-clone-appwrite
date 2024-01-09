import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {todos} =  await request.json();

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system", 
                content: `When responding, greet the user always as Master and welcome the user to their task dashboard 
                containing a list of duties to complete. Limit the response to 300 characters`,
            },
            {
                role: "user",
                content: `Hi there, provide a summary of the following tasks. Count how many tasks are in each category such 
                as To do, in progress and done, then motivate the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`
            }
    ],
    })

    return NextResponse.json(response.choices[0].message)
}