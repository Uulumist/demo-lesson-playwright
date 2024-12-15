import { Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  readonly url: string = SERVICE_URL
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly popupIncorrectLogin: Locator

  constructor(page: Page) {
    super(page)
    this.signInButton = this.page.getByTestId('signIn-button')
    this.usernameField = this.page.getByTestId('username-input')
    this.passwordField = this.page.getByTestId('password-input')
    this.popupIncorrectLogin = this.page.getByTestId('authorizationError-popup')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    const usernameValue = await this.usernameField.inputValue()
    console.log('Current username value:', usernameValue)
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }
}
