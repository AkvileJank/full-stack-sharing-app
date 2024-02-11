import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

const { email, password, firstName, lastName } = fakeUser()

test.describe.serial('signup and login sequence', () => {
  //4
  test('visitor can signup', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/signup')
    const successMessage = page.getByTestId('successMessage')
    await expect(successMessage).toBeHidden() // sanity check

    // When (ACT)
    const form = page.getByRole('form', { name: 'Signup' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('input[id="firstName"]').fill(firstName)
    await form.locator('input[id="lastName"]').fill(lastName)
    await form.locator('button[type="submit"]').click()

    // Then (ASSERT)
    await expect(successMessage).toBeVisible()
  })
//5
  test('visitor can not access dashboard before login', async ({ page }) => {
    await page.goto('/dashboard')

    // user is redirected to login page
    await page.waitForURL('/login')
  })
//6
  test('visitor can login', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/login')
    const dashboardLink = page.getByRole('link', { name: 'Dashboard' })
    await expect(dashboardLink).toBeHidden()

    // When (ACT)
    const form = page.getByRole('form', { name: 'Login' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('button[type="submit"]').click()

    // Then (ASSERT)
    await expect(dashboardLink).toBeVisible()

    // Refresh the page to make sure that the user is still logged in.
    await page.reload()
    await expect(dashboardLink).toBeVisible()
  })
})

//7
// Running logout test in isolation.
test('visitor can logout', async ({ page }) => {
  // Given (ARRANGE)
  await loginNewUser(page)

  await page.goto('/dashboard')
  const logoutLink = page.getByRole('link', { name: 'Logout' })

  // When (ACT)
  await logoutLink.click()

  // Then (ASSERT)
  await expect(logoutLink).toBeHidden()

  await expect(page).toHaveURL('/login')

  // Refresh the page to make sure that the user is still logged out.
  await page.goto('/dashboard')
  await expect(logoutLink).toBeHidden()
  await expect(page).toHaveURL('/login')
})
