import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/jsonUtils';

// GET request to read JSON data
export async function GET() {
  try {
    const data = await readJsonFile(); // Read data from JSON file
    return NextResponse.json(data); // Return JSON data as response
  } catch (error) {
    return NextResponse.json({ error: 'Error reading data' }, { status: 500 });
  }
}

// PUT request to update JSON data
export async function POST(request: NextRequest) {
  try {
    const newData = await request.json(); // Get new data from request body
    await writeJsonFile(newData); // Write new data to JSON file
    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating data' }, { status: 500 });
  }
}
