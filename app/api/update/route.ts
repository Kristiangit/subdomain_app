import { NextRequest } from 'next/server';

export default async function POST(request: NextRequest) {
  const { userId, newName } = await request.json();
  const res = await fetch('http://gruppe11.codexenmo.no/api/update/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      newName: newName,
    }),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
