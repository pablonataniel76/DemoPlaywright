import { Locator, Page } from '@playwright/test';

export class ProductsFilterPage {
    readonly page: Page;
    readonly priceSlider: Locator;
    readonly container: Locator;
    readonly priceSliderContainer: Locator;
    readonly leftSliderHandle: Locator;
    readonly rightSliderHandle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('#search_filters');
        this.priceSlider = this.container.locator('.faceted-slider .ui-slider');

        this.priceSliderContainer = this.container.locator('[id^="slider-range_"]');
        this.leftSliderHandle = this.priceSliderContainer.locator('.ui-slider-handle').first();
        this.rightSliderHandle = this.priceSliderContainer.locator('.ui-slider-handle').nth(1);
    }

    async filterByAvailability(option: string) {
        await this.filterOption('Disponibilidad', option).check();
    }

    async filterByColor(color: string) {
        await this.filterOption('Color', color).check();
    }

    async filterByComposition(composition: string) {
        await this.filterOption('Composición', composition).check();
    }

    async filterByProperty(property: string) {
        await this.filterOption('Propiedad', property).check();
    }

    async filterByBrand(brand: string) {
        await this.filterOption('Marca', brand).check();
    }

    private filterOption(facetName: string, optionName: string): Locator {
        const escapedOptionName = optionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const optionLabel = new RegExp(`^${escapedOptionName}(?:\\s*\\(\\d+\\))?$`, 'i');
        const facet = this.page.locator('#search_filters .facet').filter({
            has: this.page.getByText(facetName, { exact: true }),
        });

        return facet.getByRole('checkbox', { name: optionLabel });
    }

    /**
   * Sets the price slider by dragging the handles or leveraging jQuery UI slide events.
   * This mimics real user interaction using the HTML structure provided.
   */
    async setPriceRangeByDragging(minPercent: number = 0, maxPercent: number = 100) {
        // Get the bounding box of the main slider track
        const sliderBox = await this.priceSliderContainer.boundingBox();
        if (!sliderBox) throw new Error('Price slider container not found on the page');

        // Calculate pixel positions based on percentages (0% to 100%)
        const minX = sliderBox.x + (sliderBox.width * minPercent) / 100;
        const maxX = sliderBox.x + (sliderBox.width * maxPercent) / 100;
        const centerY = sliderBox.y + sliderBox.height / 2;

        // Move left handle for minimum price
        if (minPercent > 0) {
        await this.leftSliderHandle.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(minX, centerY, { steps: 5 });
        await this.page.mouse.up();
        }

        // Move right handle for maximum price
        if (maxPercent < 100) {
        await this.rightSliderHandle.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(maxX, centerY, { steps: 5 });
        await this.page.mouse.up();
        }

        // Wait for PrestaShop's AJAX response after sliding
        await this.page.waitForLoadState('networkidle');
    }

}