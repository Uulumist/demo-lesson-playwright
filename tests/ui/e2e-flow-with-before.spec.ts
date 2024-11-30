import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { TEST_PASSWORD, TEST_USERNAME } from '../../config/env-data'

let authPage: LoginPage
let signInUrl = 'https://fe-delivery.tallinn-learning.ee/signin'

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test.describe('Login and order creation tests', () => {
  test('signIn button disabled when incorrect data inserted', async ({}) => {
    await authPage.usernameField.fill(faker.lorem.word(2))
    await authPage.passwordField.fill(faker.lorem.word(7))
    await expect(authPage.signInButton).toBeDisabled()
  })

  test('error message displayed when incorrect credentials used', async ({}) => {
    await authPage.usernameField.fill('Username')
    await authPage.passwordField.fill('Password123')
    await authPage.signInButton.click()
    await expect.soft(authPage.popupIncorrectLogin).toBeVisible()
  })

  test('login with correct credentials and verify order creation page', async ({}) => {
    const orderCreationPage = await authPage.signIn(TEST_USERNAME, TEST_PASSWORD)
    await expect.soft(orderCreationPage.statusButton).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorName).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorPhone).toBeVisible()
    await expect.soft(orderCreationPage.createOrderButton).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorComment).toBeVisible()
  })

  test('login and create order', async ({}) => {
    const orderCreationPage = await authPage.signIn(TEST_USERNAME, TEST_PASSWORD)
    await orderCreationPage.orderCreatorName.fill(faker.lorem.word(2))
    await orderCreationPage.orderCreatorPhone.fill(faker.lorem.lines(6))
    await orderCreationPage.orderCreatorComment.fill(faker.lorem.word(6))
    await orderCreationPage.createOrderButton.click()
    expect.soft(orderCreationPage.createOrderPopupButton).toBeVisible()
  })

  test('error message on name invalid input', async ({}) => {
    const orderCreationPage = await authPage.signIn(TEST_USERNAME, TEST_PASSWORD)
    await orderCreationPage.orderCreatorName.fill(faker.lorem.word(1))
    expect.soft(orderCreationPage.usernameInputError).toBeVisible()
  })

  test('error message on phone invalid input', async ({}) => {
    const orderCreationPage = await authPage.signIn(TEST_USERNAME, TEST_PASSWORD)
    await orderCreationPage.orderCreatorName.fill(faker.lorem.word(2))
    await orderCreationPage.orderCreatorPhone.fill('asdsd')
    expect.soft(orderCreationPage.phoneInputError).toBeVisible()
  })

  test('login and logout', async ({ page }) => {
    const orderCreationPage = await authPage.signIn(TEST_USERNAME, TEST_PASSWORD)
    await orderCreationPage.logoutButton.click()
    await expect(page).toHaveURL(signInUrl)
  })
})
