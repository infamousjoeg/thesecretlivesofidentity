import { test as base, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Directories for screenshots
export const BASELINE_DIR = path.join(__dirname, '..', 'screenshots', 'baseline');
export const CURRENT_DIR = path.join(__dirname, '..', 'screenshots', 'current');

// Ensure directories exist
export function ensureScreenshotDirs() {
  if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
  }
  if (!fs.existsSync(CURRENT_DIR)) {
    fs.mkdirSync(CURRENT_DIR, { recursive: true });
  }
}

// Extended test with helpers
export const test = base.extend<{
  captureBaseline: (name: string) => Promise<void>;
  captureAndCompare: (name: string) => Promise<void>;
}>({
  captureBaseline: async ({ page }, use) => {
    const capture = async (name: string) => {
      ensureScreenshotDirs();
      await page.screenshot({
        path: path.join(BASELINE_DIR, `${name}.png`),
        fullPage: false,
      });
    };
    await use(capture);
  },
  captureAndCompare: async ({ page }, use) => {
    const capture = async (name: string) => {
      ensureScreenshotDirs();
      const currentPath = path.join(CURRENT_DIR, `${name}.png`);
      await page.screenshot({
        path: currentPath,
        fullPage: false,
      });

      // Check if baseline exists
      const baselinePath = path.join(BASELINE_DIR, `${name}.png`);
      if (fs.existsSync(baselinePath)) {
        // Playwright will do visual comparison
        await expect(page).toHaveScreenshot(`${name}.png`);
      }
    };
    await use(capture);
  },
});

// Helper to wait for animations to complete
export async function waitForAnimations(page: Page, ms: number = 2000) {
  await page.waitForTimeout(ms);
}

// Helper to navigate to a specific frame
export async function navigateToFrame(
  page: Page,
  section: number,
  frame: number
) {
  await page.goto(`/spiffe/${section}/${frame}`);
  await waitForAnimations(page);
}

// Helper to navigate to entity showcase
export async function navigateToEntityShowcase(page: Page) {
  await page.goto('/dev/entities');
  await waitForAnimations(page, 1000);
}

// Re-export expect
export { expect };
