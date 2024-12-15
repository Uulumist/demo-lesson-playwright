import { BasePage } from './base-page'
import { Locator, Page } from '@playwright/test'

export class AuthPage extends BasePage {
  readonly logoutButton: Locator
  readonly createPopupButton: Locator
  readonly searchPopupInput: Locator
  readonly searchPopupSubmitButton: Locator
  readonly searchPopupCloseButton: Locator

  constructor(page: Page) {
    super(page)
    this.logoutButton = this.page.getByTestId('logout-button')
    this.createPopupButton = this.page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.searchPopupInput = this.page.getByTestId('searchOrder-input')
    this.searchPopupSubmitButton = this.page.getByTestId('searchOrder-submitButton')
    this.searchPopupCloseButton = this.page.getByTestId('searchOrder-popup-close-button')
  }
}
