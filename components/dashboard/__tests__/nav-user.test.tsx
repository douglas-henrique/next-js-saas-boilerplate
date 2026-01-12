import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavUser } from '../nav-user'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth-client'
import { SidebarProvider } from '@/components/ui/sidebar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

// Mock auth-client
vi.mock('@/lib/auth-client', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}))

describe('NavUser', () => {
  const mockPush = vi.fn()
  const mockRouter = {
    push: mockPush,
  }

  const mockSession = {
    data: {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        image: null,
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter)
    ;(useSession as ReturnType<typeof vi.fn>).mockReturnValue(mockSession)
    ;(signOut as ReturnType<typeof vi.fn>).mockResolvedValue(undefined)
  })

  it('should render user information from session', () => {
    render(
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('should show logout button in dropdown', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>
    )

    // Find the user button by text content
    const userButton = screen.getByText('John Doe').closest('button')
    expect(userButton).toBeInTheDocument()
    
    if (userButton) {
      await user.click(userButton)
      
      // Wait for dropdown to open
      await waitFor(() => {
        const logoutButton = screen.queryByText(/log out/i)
        expect(logoutButton).toBeInTheDocument()
      }, { timeout: 2000 })
    }
  })

  it('should call signOut and redirect on logout', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>
    )

    const userButton = screen.getByText('John Doe').closest('button')
    expect(userButton).toBeInTheDocument()
    
    if (userButton) {
      await user.click(userButton)
      
      await waitFor(async () => {
        const logoutButton = screen.queryByText(/log out/i)
        if (logoutButton) {
          await user.click(logoutButton)
        }
      }, { timeout: 2000 })

      await waitFor(() => {
        expect(signOut).toHaveBeenCalled()
        expect(mockPush).toHaveBeenCalledWith('/login')
      }, { timeout: 2000 })
    }
  })

  it('should show fallback user data when session is null', () => {
    ;(useSession as ReturnType<typeof vi.fn>).mockReturnValue({ data: null })

    render(
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>
    )

    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })
})
