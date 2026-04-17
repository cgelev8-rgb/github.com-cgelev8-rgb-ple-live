import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting Multi-User Seed...");

  const hashedPassword = await hash("Password123!", 12);

  // 1. Ensure the "Quit Kit" Customer exists with the correct criteria
  const quitKitCustomer = await prisma.customer.upsert({
    where: { brandSkuPrefix: "Quit Kit" },
    update: {
      companyName: "Quit Kit",
      // These are the "criteria" from localhost/seed-quitkit.ts
      zohoCrmAccountId: "QUIT-KIT-CRM-001", 
      zohoInventoryContactId: "QUIT-KIT-INV-001",
    },
    create: {
      companyName: "Quit Kit",
      brandSkuPrefix: "Quit Kit",
      zohoCrmAccountId: "QUIT-KIT-CRM-001",
      zohoInventoryContactId: "QUIT-KIT-INV-001",
      billingProfile: {
        create: {
          billingMode: "weekly_autodebit",
          creditCap: 1000.0,
        }
      },
      walletLedger: {
        create: {
          balance: 500.0,
        }
      }
    }
  });

  console.log(`✅ Verified Quit Kit Customer (ID: ${quitKitCustomer.id})`);

  const usersToSeed = [
    { email: "chris@privatelabelexpress.com", name: "Chris" },
    { email: "patrick@privatelabelexpress.com", name: "Patrick" }
  ];

  for (const u of usersToSeed) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        password: hashedPassword,
        customerId: quitKitCustomer.id // Link to Quit Kit
      },
      create: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
        customerId: quitKitCustomer.id // Link to Quit Kit
      }
    });
    console.log(`✅ Seeded User: ${user.email} -> Linked to Quit Kit`);
  }

  // Optional: Clean up orphaned customers (like the old PLE one)
  // Not strictly necessary but keeps DB clean
  
  console.log("⭐ Seed complete! Both Chris and Patrick are now linked to Quit Kit.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
