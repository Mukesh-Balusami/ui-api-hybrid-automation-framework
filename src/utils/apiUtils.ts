import { request } from '@playwright/test';
import { ENV } from '../config/env';

export async function createNoteViaAPI(heading: string, content: string) {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    `${ENV.API_BASE_URL}/create`,
    {
      data: { heading, content },
    }
  );

  console.log("STATUS:", response.status());
  console.log("TEXT:", await response.text());

  if (!response.ok()) {
    throw new Error('Failed to create note via API');
  }

  return await response.json();
}

export async function deleteNoteViaAPI(noteId: number) {
  const apiContext = await request.newContext();

  const response = await apiContext.delete(
    `${ENV.API_BASE_URL}/delete/${noteId}`
  );

  if (!response.ok()) {
    throw new Error(`Failed to delete note with ID: ${noteId}`);
  }

  return await response.json();
}
