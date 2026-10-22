import { Page, Locator } from '@playwright/test';
import { StrategySetter } from '../../utils/StrategysMethod';
import { BasePage } from './BasePage';

export class ItemDetailModal extends BasePage {
    // clothes property
    readonly cartItemSizeListbox: Locator;
    readonly addToCartItemButton: Locator;
    //Clothe-Paper-Home
    readonly cartItemQtyInput: Locator;
    // Paper property
    readonly paperTypeListbox: Locator;
    // Art property
    //readonly colorItemChkbox: Locator;
    readonly dimentionItemListbox: Locator;

    //readonly checkoutButton: Locator;

    constructor(page: Page) {
        console.log('ItemDetailModal constructor called');
        // this.page = page;
        super(page);
        this.cartItemSizeListbox = page.locator('[aria-label="Tamaño"]');
        this.cartItemQtyInput = page.locator('#quantity_wanted');
        this.addToCartItemButton = page.locator('.add-to-cart');
        this.paperTypeListbox = page.locator('[aria-label="Tipo de papel"]');
        //this.colorItemChkbox = page.locator(`.input-color[title="${colorItem}"]`);
        this.dimentionItemListbox = page.locator('[aria-label="Dimensión"]');
    }

    colorItemChkbox(colorItem: string): Locator {
        return this.page.locator(`.input-color[title="${colorItem}"]`);
    }

    async openItemQuickView(size: string, quantity: string) {
        // const cartItemDetail = this.cartItem.filter({ hasText: cartItemName });
        // await cartItemDetail.locator(this.cartItemButton).click();
        await this.cartItemSizeListbox.selectOption(size);
        await this.cartItemQtyInput.fill(quantity);
        await this.addToCartItemButton.click();
        //await this.checkoutButton.click();
        // await page.locator('[aria-label="Tamaño"]').selectOption(size);
        // await page.locator('#quantity_wanted').fill(quantity);
        // await page.locator('.add-to-cart').click();
    }

    async setItemDetailsInUI(data: Record<string, string | boolean>): Promise<void> {
        const strategyMap: Record<string, StrategySetter> = {
      
            "Size": async () => await this.cartItemSizeListbox.selectOption(data["Size"] as string),
            "Quantity": async () => await this.cartItemQtyInput.fill(data["Quantity"] as string),
            "Type": async () => await this.paperTypeListbox.selectOption(data["Type"] as string),
            "Dimention": async () => await this.dimentionItemListbox.selectOption(data["Dimention"] as string),
            "Color": async () => await this.colorItemChkbox(data["Color"] as string).click(),
        };

        // await this.waitUntilPageObjectIsLoaded();

        for (const [field, value] of Object.entries(data)) {
            if (value !== undefined) {
                const strategy = strategyMap[field];

                if (strategy) {
                    await this.executeStrategy(strategy);
                } else {
                    console.warn(`No setter strategy found for field "${field}".`);
                }
            }
        }
        await this.addToCartItemButton.click();
    }

}