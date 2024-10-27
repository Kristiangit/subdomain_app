import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { info, newName } = await request.json();
  const res = await fetch('http://gruppe11.codexenmo.no/api/update/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: info.userId,
      newName: newName,
    }),
  });
  const data = await res.json();
  if (data.name) {
    info.name = newName;
    const res = await fetch('api/info/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newData: info,
      }),
    });
  }
  return new Response(JSON.stringify(data));
}
