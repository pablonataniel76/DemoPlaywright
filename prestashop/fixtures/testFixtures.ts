import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { ConfirmationModal } from '../ui/pages/ConfirmationModal';
import { HomePage } from '../ui/pages/HomePage';
import { ItemDetailModal } from '../ui/pages/ItemDetailModal';
import { LoginPage } from '../ui/pages/login-page';
import { Header } from '../ui/components/header';
import { NavigationBar } from '../ui/components/NavigationBar';
import { ProductsFilterPage } from '../ui/pages/ProductsFilterPage';
import { CartPage } from '../ui/pages/CartPage';
import { CheckoutPage } from '../ui/pages/CheckoutPage';

type AppFixtures = {
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    // itemDetailModal: ItemDetailModal;
    // confirmationModal: ConfirmationModal;
    header: Header;
};

type CommonFixtures = {
    
    itemDetailModal: ItemDetailModal;
    confirmationModal: ConfirmationModal;
    navigationBar: NavigationBar;
};

type FiltersFixtures = {
    productsFilterPage: ProductsFilterPage;
};

type CartFixtures = {
    cartPage: CartPage;
};

type CheckoutFixtures = {
    checkoutPage: CheckoutPage;
};

export const test = base.extend<{ app: AppFixtures, common: CommonFixtures, filter: FiltersFixtures, cart: CartFixtures, checkout: CheckoutFixtures }>({
    app: async ({ page }, use) => {
        await use({
            page,
            loginPage: new LoginPage(page),
            homePage: new HomePage(page),
            // itemDetailModal: new ItemDetailModal(page),
            // confirmationModal: new ConfirmationModal(page),
            header: new Header(page),
        });
    },
    common: async ({ page }, use) => {
        await use({
            itemDetailModal: new ItemDetailModal(page),
            confirmationModal: new ConfirmationModal(page),
            navigationBar: new NavigationBar(page),
        });
    },
    filter: async ({ page }, use) => {
        await use({
            productsFilterPage: new ProductsFilterPage(page),
        });
    },
    cart: async ({ page }, use) => {
        await use({
            cartPage: new CartPage(page),
        });
    },
    checkout: async ({ page }, use) => {
        await use({
            checkoutPage: new CheckoutPage(page),
        });
    }   
});

export { expect };