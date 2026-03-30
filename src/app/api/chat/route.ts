import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. System Prompt to force the [CRITICAL] tag
    const systemPrompt = `You are CareBridge AI, an empathetic post-operative healthcare assistant. 
    You are speaking to a patient who is recovering at home.
    CRITICAL INSTRUCTION: Analyze the patient's symptoms. If they report severe pain (7 or higher out of 10), fever, signs of infection like 'hot to the touch', bleeding, or chest pain, you MUST start your response exactly with the tag "[CRITICAL]". 
    If they are fine, just offer encouraging advice.
    Keep your responses short, under 3 sentences.`;

    // 2. Call Groq using their latest, active LLaMA 3.1 model!
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // <-- THE FIX: Groq's newest active model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.5,
      }),
    });

    // 3. Catch the EXACT error if Groq rejects it again
    if (!groqRes.ok) {
      const errorData = await groqRes.json();
      console.error("🚨 GROQ API DETAILED ERROR:", JSON.stringify(errorData, null, 2));
      throw new Error(`API Error: ${groqRes.status}`);
    }

    const data = await groqRes.json();
    const reply = data.choices[0]?.message?.content || "Connection error.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Backend Catch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}