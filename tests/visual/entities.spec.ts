import { test, expect, navigateToEntityShowcase } from './setup';

test.describe('Entity Components Visual Verification', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToEntityShowcase(page);
  });

  test('Entity showcase page loads', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Entity Component Showcase');
  });

  // Individual entity tests will be added as components are created
  test.skip('Workload - unattested state', async ({ page, captureBaseline }) => {
    // TODO: Implement after Workload component is created
    await captureBaseline('entity_workload_unattested');
  });

  test.skip('Workload - attested state', async ({ page, captureBaseline }) => {
    // TODO: Implement after Workload component is created
    await captureBaseline('entity_workload_attested');
  });

  test.skip('Badge - valid state', async ({ page, captureBaseline }) => {
    // TODO: Implement after Badge component is created
    await captureBaseline('entity_badge_valid');
  });

  test.skip('Badge - expiring state', async ({ page, captureBaseline }) => {
    // TODO: Implement after Badge component is created
    await captureBaseline('entity_badge_expiring');
  });

  test.skip('Badge - expired state', async ({ page, captureBaseline }) => {
    // TODO: Implement after Badge component is created
    await captureBaseline('entity_badge_expired');
  });
});
