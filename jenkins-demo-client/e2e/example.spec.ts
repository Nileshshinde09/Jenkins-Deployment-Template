import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'count is' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'count is' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'count is' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'count is' }).click();
  await expect(page.getByRole('heading')).toBeVisible();
  
});