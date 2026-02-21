import { test as base, expect } from '@playwright/test';
import { NotesPage } from '../pages/NotesPage';
import { ENV } from '../config/env';

type TestFixtures = {
  notesPage: NotesPage;
};

export const test = base.extend<TestFixtures>({
  notesPage: async ({ page }, use) => {
    const notesPage = new NotesPage(page);
    // Provide notesPage to test
    await use(notesPage);
  },
});

test.beforeEach(async ({ page }) => {

    const notesPage = new NotesPage(page);
    
    // Navigate to app
    await page.goto(ENV.UI_BASE_URL);

    // Verify header exists
    await notesPage.validatePageLoaded();

});

export { expect } from '@playwright/test';
