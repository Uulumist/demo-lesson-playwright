import { Locator, Page } from '@playwright/test'
import { AuthPage } from './auth-page'

export class OrderPage extends AuthPage {
  readonly statusButton: Locator
  readonly orderCreatorName: Locator
  readonly orderCreatorPhone: Locator
  readonly orderCreatorComment: Locator
  readonly createOrderButton: Locator
  readonly usernameInputError: Locator
  readonly phoneInputError: Locator

  constructor(page: Page) {
    super(page)
    this.statusButton = this.page.getByTestId('openStatusPopup-button')
    this.orderCreatorName = this.page.getByTestId('username-input')
    this.orderCreatorPhone = this.page.getByTestId('phone-input')
    this.orderCreatorComment = this.page.getByTestId('comment-input')
    this.createOrderButton = this.page.getByTestId('createOrder-button')
    this.usernameInputError = this.page.getByTestId('username-input-error')
    this.phoneInputError = this.page.getByTestId('phone-input-error')
  }
}
