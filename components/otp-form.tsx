"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (otp.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    if (!email) {
      setError("Email is required")
      return
    }

    setIsLoading(true)

    try {
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
      const response = await fetch(`${baseURL}/api/auth/email-otp/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otp,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        setError(result.error?.message || "Invalid verification code")
        return
      }

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setError("Email is required")
      return
    }

    setIsResending(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "sign-in",
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        setError(result.error?.message || "Failed to resend code")
        return
      }

      // Show success message
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to {email || "your email address"}
            </FieldDescription>
          </div>
          {error && (
            <Field>
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="otp"
              value={otp}
              onChange={(value) => setOtp(value)}
              required
              containerClassName="gap-4"
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || !email}
                className="underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? "Resending..." : "Resend"}
              </button>
            </FieldDescription>
          </Field>
          <Field>
            <Button type="submit" disabled={isLoading || otp.length !== 6}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
