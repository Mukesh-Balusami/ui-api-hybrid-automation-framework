import { Page, expect } from '@playwright/test';

export class NotesPage {
  constructor(private page: Page) {}

  async navigate(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async validatePageLoaded() {
    console.log("Current URL:", this.page.url());

  const content = await this.page.content();
  console.log("PAGE HTML START ----");
  console.log(content);
  console.log("PAGE HTML END ----");

  const headerLocator = this.page.locator("h1");
  await expect(headerLocator).toBeVisible();
  await expect(headerLocator).toContainText("Notes");
    const header = await headerLocator.innerText();
    console.log(`"${header}" Application is opened successfully`);
    }

  async clickAddNote() {
    await this.page.click("//button[normalize-space()='+ Add Note']");
  }

  async fillNote(heading: string, content: string) {
    await this.page.fill('input[name="heading"]', heading);
    await this.page.fill('textarea[name="content"]', content);
  }

  async submitNote() {
    await this.page.click("//button[normalize-space()='Create']");
  }

  async verifyNoteExists(heading: string) {
    await expect(
      this.page.getByText(heading, { exact: false })
    ).toBeVisible({ timeout: 10000 }); 
  }

  async refreshPage() {
    await this.page.reload();

  // Wait for API response
  await this.page.waitForResponse(response =>
    response.url().includes('/api/v1/notes') &&
    response.status() === 200
  );
  }
}
