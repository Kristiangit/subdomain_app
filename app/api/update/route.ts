import { NextRequest } from 'next/server';

export default async function POST(request: NextRequest) {
  const { userId, username } = await request.json();
  const res = await fetch('http://gruppe11.codexenmo.no/api/update/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      newName: username,
    }),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
