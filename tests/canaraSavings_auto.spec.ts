
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://banca.upsure.io/');
  await page.getByRole('textbox', { name: 'Mobile' }).click();
  await page.getByRole('textbox', { name: 'Mobile' }).fill('6300220418');
  await page.getByRole('button', { name: 'proceed' }).click();
  await page.getByRole('textbox', { name: 'Enter OTP' }).click();
  await page.getByRole('textbox', { name: 'Enter OTP' }).fill('321564');
  await page.getByRole('button', { name: 'icon Verify Details' }).click();
  await page.getByText('Savings Plan').click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).fill('bhanu');
  await page.getByRole('textbox', { name: 'Middle Name' }).click();
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('latha');
  await page.getByRole('textbox', { name: 'Last Name *' }).dblclick();
  await page.getByRole('textbox', { name: 'Last Name *' }).fill('g');
  await page.getByRole('textbox', { name: 'DOB *' }).click();
  await page.getByRole('textbox', { name: 'DOB *' }).fill('28-09-1998');
  await page.getByRole('spinbutton', { name: 'Annual Income *' }).click();
  await page.getByRole('spinbutton', { name: 'Annual Income *' }).fill('20000');
  await page.getByRole('textbox', { name: 'Email *' }).dblclick();
  await page.getByRole('textbox', { name: 'Email *' }).fill('bhanu@upsure.io');
  await page.getByRole('combobox', { name: 'Code * +' }).nth(1).click();
  await page.getByRole('option', { name: 'Married' }).click();
  await page.getByRole('combobox', { name: 'Code * +' }).nth(2).click();
  await page.getByRole('option', { name: 'Retired' }).nth(1).click();
  await page.getByRole('combobox', { name: 'Code * +' }).nth(3).click();
  await page.getByRole('option', { name: 'Married/ Divorced/ Widowed' }).click();
  await page.getByRole('combobox', { name: 'Code * +' }).nth(4).click();
  await page.getByRole('option', { name: 'Wealth creation and legacy' }).click();
  await page.getByRole('combobox', { name: 'Code * +' }).nth(5).click();
  await page.getByRole('option', { name: 'Conservative' }).click();
  await page.locator('label').filter({ hasText: 'Female' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
});



