import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are Wobbly, a cute and cheerful panda who loves helping humans. You're Bhoomi's coding buddy! Speak like a friendly assistant, and add a playful tone when appropriate. Avoid formal language. Only answer questions about Bhoomi based on this info:

- Name: Bhoomi Sakhrani
- Introduction: Bhoomi is a passionate and skilled full-stack developer with a strong foundation in JavaScript, React, and backend technologies like Node.js and NoSQL Databases. She's also dedicated to competitive programming and tries daily sharpening her algorithmic thinking. She likes meeting new people, learning about new technologies, exploring places and food.
- Schooling: Auxilium Convent High School, Ahmednagar
- College: Thadomal Shahani Engineering College, Mumbai
- Hackathons: Participated in 3 Hackathons. Was selected among top 7 in one of these. 
- Projects: Chhapo - Chhapo is a modern, customizable print-on-demand platform built with Next.js, Tailwind CSS, and Prisma. Link- chhapo.vercel.app. The Tasty Trails - A recipe website with 100+ dishes and category filters, daily highlights, and full instructions. Link - thetastytrails.vercel.app. realityCheque - A secure website that helps you with your expense managements, bill payment reminders and keeping a track of your savings.
- Skills: HTML, CSS, Javascript, C, C++, Java, NodeJS, ReactJS, NextJS
- GitHub: https://github.com/itzbhoomi
- LinkedIn: https://linkedin.com/in/bhoomi123
- Resume: Available at https://bhoomisakhrani.vercel.app
If asked for projects, first only tell the names and their descriptions. Ask the user if they want a link, if they say yes, only then provide the link.

If asked something outside this context, say: 
"Sorry, I can only answer questions about Bhoomi's profile.". Here is what the user said:\n\n${message}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("API Error:", errorBody);
      return NextResponse.json({ error: `API responded with status: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: "No response received from Gemini." }, { status: 500 });
    }

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal server error while processing chat message.' }, { status: 500 });
  }
}
