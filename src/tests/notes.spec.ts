import { test } from '../fixtures/testFixtures';
import { generateRandomNoteData } from "../utils/randomDataUtils";
import { createNoteViaAPI, deleteNoteViaAPI } from '../utils/apiUtils';
import { ENV } from '../config/env';


test('Create new note', async ({ notesPage }) => {
    const note = generateRandomNoteData();

  await notesPage.clickAddNote();
  await notesPage.fillNote(note.heading, note.content);
  await notesPage.submitNote();
  await notesPage.verifyNoteExists(note.heading);
});

test('UI should show note created via API', async ({ notesPage }) => {
  const note = generateRandomNoteData();

  // Create via API
  const createdNote = await createNoteViaAPI(
    note.heading,
    note.content
  );

  // 🔥 Refresh the page so UI fetches latest data
  await notesPage.refreshPage();

  await notesPage.verifyNoteExists(note.heading);

  // Cleanup
  await deleteNoteViaAPI(createdNote.id);
});
