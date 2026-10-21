import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly continueButton: Locator;

    // readonly AddressInput Locator;
    readonly aliasInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly vatNumberInput: Locator;
    readonly addressInput: Locator;
    readonly addressComplementInput: Locator;
    readonly postalCodeInput: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly countrySelect: Locator;
    readonly phoneInput: Locator;
    readonly taxIdentificationNumberInput: Locator;
    readonly useAddressForInvoicesCheckbox: Locator;

    //readonly Shipping Method Locator;
    readonly shippingMethodSelect: Locator;
    readonly shippingMethodComment: Locator;
    //readonly shippingMethodContinueButton: Locator;

    //readonly Payment Method Locator;
    readonly paymentMethodSelect: Locator;

    constructor(page: Page) {
        console.log('CheckoutPage constructor called');
        this.page = page;

        this.continueButton = page.locator('button[name="confirm-addresses"]');

        //checkout form locators
        this.aliasInput = page.getByLabel('Alias');
        this.firstNameInput = page.getByLabel('Nombre');
        this.lastNameInput = page.getByLabel('Apellidos');
        this.companyInput = page.getByLabel('Empresa');
        this.vatNumberInput = page.getByLabel('Número de IVA');
        this.addressInput = page.getByLabel('Dirección', { exact: true });
        this.addressComplementInput = page.getByLabel('Dirección Complementaria');
        this.stateInput = page.getByLabel('Estado');
        this.postalCodeInput = page.getByLabel('Código postal/Zip');
        this.cityInput = page.getByLabel('Ciudad');
        this.countrySelect = page.locator('#field-id_country');
        this.phoneInput = page.getByLabel('Teléfono');
        this.taxIdentificationNumberInput = page.getByLabel('Número de identificación fiscal');
        this.useAddressForInvoicesCheckbox = page.locator('#use_same_address');

        //Shipping Method Locator
        this.shippingMethodSelect = page.locator('#delivery_option_2');
        this.shippingMethodComment = page.locator('#delivery_message');


        //Payment Method Locator
        this.paymentMethodSelect = page.getByLabel('Método de pago');
    }

    async proceedCheckout(alias: string, firstName: string, lastName: string, company: string, vatNumber: string, address: string, 
        addressComplement: string, state: string, postalCode: string, city: string, country: string, phone: string, useAddressForInvoices: boolean) {
        
        await this.countrySelect.selectOption(country);
        await this.page.waitForTimeout(2000);

        await this.aliasInput.fill(alias);
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        // await this.vatNumberInput.fill(vatNumber);
        await this.addressInput.fill(address);
        await this.addressComplementInput.fill(addressComplement);
        await this.stateInput.selectOption(state); // Clear the state input field
        await this.postalCodeInput.fill(postalCode);
        await this.cityInput.fill(city);
        
        await this.phoneInput.fill(phone);
        //await this.taxIdentificationNumberInput.fill(taxIdentificationNumber);
        if (useAddressForInvoices) {
            await this.useAddressForInvoicesCheckbox.check();
        }else{
            await this.useAddressForInvoicesCheckbox.uncheck();
        }
        // await this.continueButton.click();
    }

    async selectShippingMethod(method: string) {
        await this.shippingMethodSelect.selectOption({ label: method });
    }

    async selectPaymentMethod(method: string) {
        await this.paymentMethodSelect.selectOption({ label: method });
    }

}