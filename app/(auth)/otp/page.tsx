import { redirect } from "next/navigation"
import { OTPForm } from "@/components/otp-form"
import prisma from "@/lib/prisma"

async function checkEmailExists(email: string | null): Promise<boolean> {
  if (!email) return false
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return !!user
  } catch (error) {
    console.error("Error checking email:", error)
    return false
  }
}

export default async function OTPPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const email = params.email ? decodeURIComponent(params.email) : null

  // If email is provided, check if it exists in the database
  if (email) {
    const emailExists = await checkEmailExists(email)
    if (!emailExists) {
      redirect("/signup")
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPForm />
      </div>
    </div>
  )
}
