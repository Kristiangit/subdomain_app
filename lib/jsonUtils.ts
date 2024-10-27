import { promises as fs } from 'fs';
import path from 'path';

// Get the path to the JSON file
const jsonFilePath = path.join(process.cwd(), 'info.json');

// Function to read data from the JSON file
export async function readJsonFile() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(fileContents); // Parse and return JSON data
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw new Error('Error reading JSON file');
  }
}

// Function to write data to the JSON file
export async function writeJsonFile(newData: any) {
  try {
    const jsonString = JSON.stringify(newData.newData, null, 2); // Pretty-print JSON with 2 spaces
    await fs.writeFile(jsonFilePath, jsonString, 'utf-8');
  } catch (error) {
    console.error('Error writing to JSON file:', error);
    throw new Error('Error writing to JSON file');
  }
}
