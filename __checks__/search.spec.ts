/**
  * To learn more about Playwright Test visit:
  * https://www.checklyhq.com/docs/browser-checks/playwright-test/
  * https://playwright.dev/docs/writing-tests
  */

import { test, expect } from '@playwright/test'

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
// Learn more here: https://www.checklyhq.com/docs/browser-checks/timeouts/
test.use({ actionTimeout: 10000 })

test('interact with form elements', async ({ page }: any) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  await page.goto('https://fund-search-client.vercel.app/')

  const searchInput = page.locator('#search-input')

  // Reset button should NOT be visible
  await expect(page.locator('#search-reset')).not.toBeVisible()

  // Search results should NOT be visible
  await expect(page.locator('#search-results')).not.toBeVisible()

  // Open registration modal
  await searchInput.type('H')

  // Reset button should be visible
  await expect(page.locator('#search-reset')).toBeVisible()

  // Open registration modal
  await searchInput.type('E')

  // Search results should be visible
  await expect(page.locator('#search-results')).toBeVisible()

  // Open registration modal
  await searchInput.type('LL')

  // Wait 0.1 second for the search results to update
  await page.waitForTimeout(100)

  await page.screenshot({
    path: 'screenshot.png',
  })
})
