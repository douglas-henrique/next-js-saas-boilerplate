import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Starting seed...\n")

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🧹 Cleaning existing data...")
    await prisma.user.deleteMany()
    console.log("✅ Cleaned existing users\n")

    // Create sample users
    console.log("📝 Creating sample users...")
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "john.doe@example.com",
          name: "John Doe",
        },
      }),
      prisma.user.create({
        data: {
          email: "jane.smith@example.com",
          name: "Jane Smith",
        },
      }),
      prisma.user.create({
        data: {
          email: "admin@example.com",
          name: "Admin User",
        },
      }),
    ])

    console.log(`✅ Created ${users.length} users:`)
    users.forEach((user: { name: string | null; email: string }) => {
      console.log(`   - ${user.name} (${user.email})`)
    })

    console.log("\n🎉 Seed completed successfully!\n")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
