import { Locator, Page } from '@playwright/test'
import { AuthPage } from './auth-page'

export class OrderNotFoundPage extends AuthPage {
  readonly notFoundTitle: Locator
  readonly logoutButton: Locator
  readonly notFoundDescription: Locator

  constructor(page: Page) {
    super(page)
    this.notFoundTitle = page.getByRole('heading', { name: 'Order not found' })
    this.logoutButton = this.page.getByTestId('logout-button')
    this.notFoundDescription = page.getByText('Check the tracking code')
  }
}
