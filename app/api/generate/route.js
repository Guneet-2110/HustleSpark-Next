import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interests } = await req.json();

  if (!interests?.trim()) {
    return Response.json({ error: "Interests are required" }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a startup hustle coach for teens. Give exactly 3 side hustle ideas. Format each as: '1. [Title]: [2-sentence description]'. Be specific, actionable, and encouraging.",
        },
        {
          role: "user",
          content: `Give 3 simple side hustles a teen can start who likes: ${interests}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content || "";
  const ideas = raw
    .split("\n")
    .filter((line) => line.trim())
    .filter((line) => /^\d+\./.test(line.trim()));

  return Response.json({ ideas });
}
