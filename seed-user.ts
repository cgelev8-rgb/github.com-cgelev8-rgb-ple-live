import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
  {
    email: "chris@privatelabelexpress.com",
    name: "Chris",
    password: "Password123!",
    companyName: "Private Label Express",
    brandSkuPrefix: "PLE",
    billingMode: "wallet",
    startingBalance: 0.0,
  },
  {
    email: "patrick@privatelabelexpress.com",
    name: "Patrick",
    password: "Password123!",
    companyName: "Quit Kit",
    brandSkuPrefix: "Quit Kit",
    billingMode: "weekly_autodebit",
    startingBalance: 500.0,
  },
];

async function main() {
  for (const u of USERS) {
    const hashedPassword = await hash(u.password, 12);

    // Upsert the user — create if new, update password if existing
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashedPassword, name: u.name },
      create: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
      },
    });

    // Ensure a Customer record is linked
    const existingCustomerByUser = await prisma.customer.findUnique({
      where: { userId: user.id },
    });

    if (existingCustomerByUser) {
      console.log(`✅ Updated password for existing user: ${u.email}`);
    } else {
      // Check if there's an orphaned Customer with same brandSkuPrefix (from old user)
      const existingCustomerByPrefix = u.brandSkuPrefix
        ? await prisma.customer.findUnique({ where: { brandSkuPrefix: u.brandSkuPrefix } })
        : null;

      if (existingCustomerByPrefix) {
        // Re-link the existing customer to this user
        await prisma.customer.update({
          where: { id: existingCustomerByPrefix.id },
          data: { userId: user.id },
        });
        console.log(`✅ Re-linked existing "${u.companyName}" customer to: ${u.email}`);
      } else {
        await prisma.customer.create({
          data: {
            userId: user.id,
            companyName: u.companyName,
            brandSkuPrefix: u.brandSkuPrefix,
            billingProfile: {
              create: { billingMode: u.billingMode },
            },
            walletLedger: {
              create: { balance: u.startingBalance },
            },
          },
        });
        console.log(`✅ Created user + customer: ${u.email} (${u.companyName})`);
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
