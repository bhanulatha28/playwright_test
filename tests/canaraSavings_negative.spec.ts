import { test, expect } from '@playwright/test';

test('enter negative data then correct to valid values', async ({ page }) => {
    await page.goto('https://banca.upsure.io/');
    await page.waitForLoadState('networkidle');

    // Helpers
    const safeClickText = async (text: string, timeout = 5000) => {
        const el = page.getByText(text, { exact: false });
        await el.waitFor({ state: 'visible', timeout });
        await el.click();
    };
    const safeSelect = async (optionText: string, timeout = 5000) => {
        const el = page.getByText(optionText, { exact: false });
        await el.waitFor({ state: 'visible', timeout });
        await el.click();
    };
    const safeFill = async (label: string, value: string) => {
        const el = page.getByLabel(label);
        await el.waitFor({ state: 'visible', timeout: 5000 });
        await el.fill(value);
    };

    // --- Mobile: negative then positive ---
    await safeFill('Mobile', '000'); // invalid short
    await safeClickText('proceed');

    await page.waitForTimeout(1000);
    // OTP should not appear for invalid mobile
    await expect(page.locator('input[aria-label="Enter OTP"]')).toHaveCount(0);

    // Provide valid mobile and proceed
    await safeFill('Mobile', '6300220418');
    await safeClickText('proceed');

    // Wait for OTP input
    await page.getByLabel('Enter OTP').waitFor({ state: 'visible', timeout: 7000 });

    // --- OTP: negative then positive ---
    await safeFill('Enter OTP', '000000'); // invalid otp
    await safeClickText('Verify Details');
    await page.waitForTimeout(1000);
    // Should not reveal next section for invalid OTP
    await expect(page.locator('text=Savings Plan')).not.toBeVisible();

    // Correct OTP (use known test OTP or stubbed value)
    await safeFill('Enter OTP', '321564');
    await safeClickText('Verify Details');

    // Wait for Savings Plan section/link and open it
    await page.locator('text=Savings Plan').waitFor({ state: 'visible', timeout: 7000 });
    await page.locator('text=Savings Plan').click();

    // Wait for form fields
    await page.getByLabel('First Name *').waitFor({ state: 'visible', timeout: 7000 });

    // --- Form: enter negative/invalid values ---
    await safeFill('First Name *', '');                // empty
    await safeFill('Middle Name', 'x');                // optional
    await safeFill('Last Name *', 'g');                // too short
    await safeFill('DOB *', '1998/09/28');             // wrong format
    await safeFill('Annual Income *', '0');            // unrealistic
    await safeFill('Email *', 'not-an-email');         // invalid email

    // choose dropdowns and gender (negative path choices)
    await safeSelect('Married');
    await safeSelect('Retired');
    await safeSelect('Conservative');
    await page.locator('label:has-text("Female")').first().click();

    await safeClickText('Proceed');

    // allow client validation to mark invalid fields
    await page.waitForTimeout(2000);
    const invalidBefore = await page.locator('input:invalid, textarea:invalid').count();
    expect(invalidBefore).toBeGreaterThan(0);

    // --- Replace with valid values ---
    await safeFill('First Name *', 'bhanu');
    await safeFill('Middle Name', 'latha');
    await safeFill('Last Name *', 'gopal');
    await safeFill('DOB *', '28-09-1998');
    await safeFill('Annual Income *', '20000');
    await safeFill('Email *', 'bhanu@upsure.io');

    // re-select dropdowns (if UI requires re-selection)
    await safeSelect('Married');
    await safeSelect('Retired');
    await safeSelect('Conservative');
    await page.locator('label:has-text("Female")').first().click();

    // small pause then submit valid form
    await page.waitForTimeout(1000);
    await safeClickText('Proceed');

    // wait for navigation/validation to finish
    await page.waitForLoadState('networkidle');

    // verify no client-side invalid inputs remain
    const invalidAfter = await page.locator('input:invalid, textarea:invalid').count();
    expect(invalidAfter).toBe(0);
});
