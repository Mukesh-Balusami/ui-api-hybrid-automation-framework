import { Page, expect } from '@playwright/test';

export class NotesPage {
  constructor(private page: Page) {}

  async navigate(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async validatePageLoaded() {
    const headerLocator = this.page.locator("//h1[contains(text(),'📝 Notes Manager')]");
    await expect(headerLocator).toBeVisible();
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
        this.page.locator(`text=${heading}`)
    ).toBeVisible();;    
  }

  async refreshPage() {
    await this.page.reload();
    }
}
