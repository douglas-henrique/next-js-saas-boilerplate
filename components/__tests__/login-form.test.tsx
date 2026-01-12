import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginForm } from '../login-form'
import { useRouter } from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

// Mock auth-client
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
    },
  },
}))

describe('LoginForm', () => {
  const mockPush = vi.fn()
  const mockRouter = {
    push: mockPush,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter)
  })

  it('should render login form with email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should have email input with type email', () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should show link to signup page', () => {
    render(<LoginForm />)

    const signupLink = screen.getByRole('link', { name: /sign up/i })
    expect(signupLink).toBeInTheDocument()
    expect(signupLink).toHaveAttribute('href', '/signup')
  })
})
