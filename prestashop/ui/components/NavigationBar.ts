import { Page, Locator, expect } from '@playwright/test';

export class NavigationBar {
  constructor(private readonly page: Page) {}

  private readonly categories: Record<string, string> = {
    ropa: '3',
    hombre: '4',
    mujer: '5',
    accesorios: '6',
    papeleria: '7',
    accesorios_para_el_hogar: '8',
    arte: '9',
  };

  private getCategory(slug: string): Locator {
    const id = this.categories[slug];

    if (!id) {
      throw new Error(`Unknown category: "${slug}"`);
    }

    return this.page.locator(`#category-${id}`);
  }

  async navigateTo(path: string): Promise<void> {
    const items = path
      .toLowerCase()
      .split('.')
      .map(item => item.trim())
      .filter(Boolean);

    if (items.length === 0) {
      throw new Error('Navigation path cannot be empty');
    }

    for (let i = 0; i < items.length; i++) {
      const category = this.getCategory(items[i]);
      const link = category.locator(':scope > a');
      
      await expect(category).toBeVisible();
      await expect(link).toBeVisible();

      if (i < items.length - 1) {
        // Hover over the parent category to open its submenu.
        await category.hover();

        const submenu = category.locator(
          ':scope > .js-sub-menu'
        );

        await expect(submenu).toBeVisible({
          timeout: 5000,
        });

        // Ensure the next category belongs to this submenu.
        const nextCategory = this.getCategory(items[i + 1]);

        await expect(submenu.locator(
          `#category-${this.categories[items[i + 1]]}`
        )).toBeVisible();
      } else {
        await link.click();
      }
    }
  }
}   