import { Locator, Page } from '@playwright/test'

export class OrderPage {
  private page: Page
  readonly statusButton: Locator
  readonly orderCreatorName: Locator
  readonly orderCreatorPhone: Locator
  readonly orderCreatorComment: Locator
  readonly createOrderButton: Locator
  readonly logoutButton: Locator
  readonly createOrderPopupButton: Locator
  readonly usernameInputError: Locator
  readonly phoneInputError: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = this.page.getByTestId('openStatusPopup-button')
    this.orderCreatorName = this.page.getByTestId('username-input')
    this.orderCreatorPhone = this.page.getByTestId('phone-input')
    this.orderCreatorComment = this.page.getByTestId('comment-input')
    this.createOrderButton = this.page.getByTestId('createOrder-button')
    this.logoutButton = this.page.getByTestId('logout-button')
    this.createOrderPopupButton = this.page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.usernameInputError = this.page.getByTestId('username-input-error')
    this.phoneInputError = this.page.getByTestId('phone-input-error')
  }
}
