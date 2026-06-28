export async function POST(req: Request) {
  const data = await req.json();
  console.log("New client request:", data);
  return Response.json({ ok: true, message: "Request received. EIDOS will review it." });
}
