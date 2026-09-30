import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost/prestashop/');
  await page.getByRole('link', { name: ' Iniciar sesión' }).click();
  await page.getByRole('textbox', { name: 'Dirección de correo electró' }).click();
  await page.getByRole('textbox', { name: 'Dirección de correo electró' }).fill('pabloneitor76@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('1234admin!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: ' Cerrar sesión' }).click();
});