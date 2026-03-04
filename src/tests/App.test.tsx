import { render, screen } from '@testing-library/react'
import App from '../App'

jest.mock('../hooks/useCryptoMarket', () => ({
  useCryptoMarket: () => ({
    data: null,
    loading: true,
    error: null,
  }),
}))

test('shows loading state', () => {
  render(<App />)

  expect(
    screen.getByText(/loading/i)
  ).toBeInTheDocument()
})