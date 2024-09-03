import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a flowbite button', () => {
    render(<Page />)
 
    const button = screen.getByRole('button')
 
    expect(button).toBeInTheDocument()
  })
});
