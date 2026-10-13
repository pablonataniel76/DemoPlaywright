import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { ConfirmationModal } from '../ui/pages/ConfirmationModal';
import { HomePage } from '../ui/pages/HomePage';
import { ItemDetailModal } from '../ui/pages/ItemDetailModal';
import { LoginPage } from '../ui/pages/login-page';
import { Header } from '../ui/components/header';

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
};

export const test = base.extend<{ app: AppFixtures, common: CommonFixtures }>({
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
        });
    },
});

export { expect };