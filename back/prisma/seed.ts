import { PrismaClient, AccountType, TransactionType, GoalStatus, DebtStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ─── helpers ────────────────────────────────────────────────────────────────

/** Returns a Date N months back from April 16 2026 (today in this project) */
const monthsAgo = (n: number, day = 15) =>
  new Date(2026, 3 - n, day) // month is 0-indexed; 3 = April

const date = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day)

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting demo seed...')

  // ── 0. Clean up existing demo user ────────────────────────────────────────
  await prisma.user.deleteMany({ where: { email: 'demo@mycash.app' } })

  // ── 1. User ────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Demo1234!', 10)

  const user = await prisma.user.create({
    data: {
      email: 'demo@mycash.app',
      password: passwordHash,
      name: 'Alex Demo',
      username: 'alexdemo',
      currency: 'COP',
      cutoffDay: 1,
    },
  })
  console.log(`  ✓ User: ${user.email}`)

  // ── 2. Accounts ───────────────────────────────────────────────────────────
  const [cash, bank, creditCard, savings, investment, wallet] =
    await Promise.all([
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Cash',
          type: AccountType.CASH,
          balance: 450_000,
          color: '#10B981',
          icon: 'banknotes',
        },
      }),
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Bancolombia',
          type: AccountType.BANK,
          balance: 3_840_000,
          color: '#FBBF24',
          icon: 'building-library',
        },
      }),
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Visa Platinum',
          type: AccountType.CREDIT_CARD,
          balance: -680_000,
          color: '#EF4444',
          icon: 'credit-card',
        },
      }),
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Savings CDT',
          type: AccountType.SAVINGS,
          balance: 9_200_000,
          color: '#6366F1',
          icon: 'piggy-bank',
        },
      }),
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Investment Portfolio',
          type: AccountType.INVESTMENT,
          balance: 14_500_000,
          color: '#8B5CF6',
          icon: 'chart-bar',
        },
      }),
      prisma.account.create({
        data: {
          userId: user.id,
          name: 'Nequi',
          type: AccountType.DIGITAL_WALLET,
          balance: 210_000,
          color: '#EC4899',
          icon: 'device-phone-mobile',
        },
      }),
    ])
  console.log('  ✓ Accounts (6)')

  // ── 3. Categories + Subcategories ─────────────────────────────────────────

  // --- INCOME ---
  const [catSalary, catFreelance, catInvestments, catOtherIncome] =
    await Promise.all([
      prisma.category.create({
        data: {
          userId: user.id,
          name: 'Salary',
          color: '#10B981',
          icon: 'briefcase',
          type: TransactionType.INCOME,
          subcategories: {
            create: [
              { userId: user.id, name: 'Monthly salary', color: '#10B981' },
              { userId: user.id, name: 'Bonus',          color: '#6EE7B7' },
              { userId: user.id, name: 'Commission',     color: '#A7F3D0' },
            ],
          },
        },
      }),
      prisma.category.create({
        data: {
          userId: user.id,
          name: 'Freelance',
          color: '#3B82F6',
          icon: 'computer-desktop',
          type: TransactionType.INCOME,
          subcategories: {
            create: [
              { userId: user.id, name: 'Development', color: '#3B82F6' },
              { userId: user.id, name: 'Design',      color: '#93C5FD' },
              { userId: user.id, name: 'Consulting',  color: '#BFDBFE' },
            ],
          },
        },
      }),
      prisma.category.create({
        data: {
          userId: user.id,
          name: 'Investments',
          color: '#8B5CF6',
          icon: 'chart-bar-square',
          type: TransactionType.INCOME,
          subcategories: {
            create: [
              { userId: user.id, name: 'Dividends',    color: '#8B5CF6' },
              { userId: user.id, name: 'Capital gains', color: '#C4B5FD' },
            ],
          },
        },
      }),
      prisma.category.create({
        data: {
          userId: user.id,
          name: 'Other Income',
          color: '#F59E0B',
          icon: 'gift',
          type: TransactionType.INCOME,
          subcategories: {
            create: [
              { userId: user.id, name: 'Rental income', color: '#F59E0B' },
              { userId: user.id, name: 'Gifts',         color: '#FCD34D' },
              { userId: user.id, name: 'Refunds',       color: '#FDE68A' },
            ],
          },
        },
      }),
    ])

  // --- EXPENSE ---
  const [
    catHousing,
    catFood,
    catTransport,
    catEntertainment,
    catHealth,
    catEducation,
    catClothing,
    catUtilities,
  ] = await Promise.all([
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Housing',
        color: '#EF4444',
        icon: 'home',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Rent',            color: '#EF4444' },
            { userId: user.id, name: 'Maintenance',     color: '#FCA5A5' },
            { userId: user.id, name: 'Home supplies',   color: '#FECACA' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Food',
        color: '#F97316',
        icon: 'shopping-cart',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Groceries',   color: '#F97316' },
            { userId: user.id, name: 'Restaurants', color: '#FDBA74' },
            { userId: user.id, name: 'Delivery',    color: '#FED7AA' },
            { userId: user.id, name: 'Coffee',      color: '#78350F' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Transport',
        color: '#06B6D4',
        icon: 'truck',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Fuel',             color: '#06B6D4' },
            { userId: user.id, name: 'Public transport', color: '#67E8F9' },
            { userId: user.id, name: 'Uber / Taxi',      color: '#A5F3FC' },
            { userId: user.id, name: 'Parking',          color: '#164E63' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Entertainment',
        color: '#EC4899',
        icon: 'film',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Streaming', color: '#EC4899' },
            { userId: user.id, name: 'Cinema',    color: '#F9A8D4' },
            { userId: user.id, name: 'Sports',    color: '#FBCFE8' },
            { userId: user.id, name: 'Games',     color: '#831843' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Health',
        color: '#10B981',
        icon: 'heart',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Medicine',    color: '#10B981' },
            { userId: user.id, name: 'Gym',         color: '#6EE7B7' },
            { userId: user.id, name: 'Doctor',      color: '#A7F3D0' },
            { userId: user.id, name: 'Dental',      color: '#064E3B' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Education',
        color: '#6366F1',
        icon: 'academic-cap',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Courses',  color: '#6366F1' },
            { userId: user.id, name: 'Books',    color: '#A5B4FC' },
            { userId: user.id, name: 'Software', color: '#C7D2FE' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Clothing',
        color: '#84CC16',
        icon: 'tag',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Clothes',     color: '#84CC16' },
            { userId: user.id, name: 'Shoes',       color: '#BEF264' },
            { userId: user.id, name: 'Accessories', color: '#D9F99D' },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        userId: user.id,
        name: 'Utilities',
        color: '#F59E0B',
        icon: 'bolt',
        type: TransactionType.EXPENSE,
        subcategories: {
          create: [
            { userId: user.id, name: 'Electricity', color: '#F59E0B' },
            { userId: user.id, name: 'Water',       color: '#FCD34D' },
            { userId: user.id, name: 'Internet',    color: '#FDE68A' },
            { userId: user.id, name: 'Phone',       color: '#92400E' },
          ],
        },
      },
    }),
  ])
  console.log('  ✓ Categories (12) + Subcategories (34)')

  // ── 4. Transactions — 6 months (Nov 2025 → Apr 2026) ──────────────────────

  const txData: Parameters<typeof prisma.transaction.create>[0]['data'][] = [

    // ── November 2025 ────────────────────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2025, 11, 1)  },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 1_200_000, description: 'Web project - client A',   date: date(2025, 11, 8)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2025, 11, 3)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 95_000,    description: 'Electricity bill',        date: date(2025, 11, 10) },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2025, 11, 10) },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 320_000,   description: 'Supermarket',             date: date(2025, 11, 14) },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2025, 11, 15) },
    { userId: user.id, accountId: creditCard.id, categoryId: catFood.id,          type: 'EXPENSE', amount: 85_000,    description: 'Dinner out',              date: date(2025, 11, 20) },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 60_000,    description: 'Public transport Nov',    date: date(2025, 11, 21) },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2025, 11, 1)  },
    { userId: user.id, accountId: bank.id,       categoryId: catInvestments.id,   type: 'INCOME',  amount: 280_000,   description: 'Investment dividends',    date: date(2025, 11, 25) },

    // ── December 2025 ────────────────────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2025, 12, 1)  },
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 2_000_000, description: 'Year-end bonus',          date: date(2025, 12, 15) },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 850_000,   description: 'Design project',          date: date(2025, 12, 10) },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2025, 12, 3)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 98_000,    description: 'Electricity bill',        date: date(2025, 12, 10) },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2025, 12, 10) },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 480_000,   description: 'Christmas groceries',     date: date(2025, 12, 20) },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2025, 12, 15) },
    { userId: user.id, accountId: creditCard.id, categoryId: catClothing.id,      type: 'EXPENSE', amount: 320_000,   description: 'Christmas gifts / clothes', date: date(2025, 12, 22) },
    { userId: user.id, accountId: creditCard.id, categoryId: catFood.id,          type: 'EXPENSE', amount: 180_000,   description: 'Christmas dinner',        date: date(2025, 12, 25) },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 45_000,    description: 'Taxi - New Year\'s Eve',  date: date(2025, 12, 31) },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2025, 12, 1)  },

    // ── January 2026 ─────────────────────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2026, 1, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 1_500_000, description: 'Consulting - fintech',    date: date(2026, 1, 12)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2026, 1, 3)   },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 92_000,    description: 'Electricity bill',        date: date(2026, 1, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2026, 1, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 355_000,   description: 'Supermarket',             date: date(2026, 1, 15)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2026, 1, 15)  },
    { userId: user.id, accountId: bank.id,       categoryId: catEducation.id,     type: 'EXPENSE', amount: 350_000,   description: 'Udemy annual plan',       date: date(2026, 1, 5)   },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 58_000,    description: 'Public transport Jan',    date: date(2026, 1, 20)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2026, 1, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 120_000,   description: 'Doctor visit',            date: date(2026, 1, 18)  },
    { userId: user.id, accountId: bank.id,       categoryId: catInvestments.id,   type: 'INCOME',  amount: 310_000,   description: 'Investment dividends',    date: date(2026, 1, 25)  },

    // ── February 2026 ────────────────────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2026, 2, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 2_100_000, description: 'App development sprint',  date: date(2026, 2, 20)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2026, 2, 3)   },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 88_000,    description: 'Electricity bill',        date: date(2026, 2, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2026, 2, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 310_000,   description: 'Supermarket',             date: date(2026, 2, 12)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2026, 2, 15)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catFood.id,          type: 'EXPENSE', amount: 95_000,    description: 'Valentine\'s dinner',     date: date(2026, 2, 14)  },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 55_000,    description: 'Public transport Feb',    date: date(2026, 2, 20)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2026, 2, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catClothing.id,      type: 'EXPENSE', amount: 185_000,   description: 'New shoes',               date: date(2026, 2, 22)  },

    // ── March 2026 ───────────────────────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2026, 3, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 950_000,   description: 'Logo & branding',         date: date(2026, 3, 8)   },
    { userId: user.id, accountId: bank.id,       categoryId: catOtherIncome.id,   type: 'INCOME',  amount: 200_000,   description: 'Tax refund',              date: date(2026, 3, 18)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2026, 3, 3)   },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 91_000,    description: 'Electricity bill',        date: date(2026, 3, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2026, 3, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 340_000,   description: 'Supermarket',             date: date(2026, 3, 14)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2026, 3, 15)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catFood.id,          type: 'EXPENSE', amount: 110_000,   description: 'Team lunch',              date: date(2026, 3, 20)  },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 58_000,    description: 'Public transport Mar',    date: date(2026, 3, 20)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2026, 3, 2)   },
    { userId: user.id, accountId: bank.id,       categoryId: catEducation.id,     type: 'EXPENSE', amount: 180_000,   description: 'TypeScript advanced course', date: date(2026, 3, 5) },
    { userId: user.id, accountId: bank.id,       categoryId: catInvestments.id,   type: 'INCOME',  amount: 340_000,   description: 'Investment dividends',    date: date(2026, 3, 25)  },

    // ── April 2026 (current month) ───────────────────────────────────────────
    { userId: user.id, accountId: bank.id,       categoryId: catSalary.id,        type: 'INCOME',  amount: 4_500_000, description: 'Monthly salary',          date: date(2026, 4, 1)   },
    { userId: user.id, accountId: bank.id,       categoryId: catFreelance.id,     type: 'INCOME',  amount: 1_800_000, description: 'Dashboard project',       date: date(2026, 4, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHousing.id,       type: 'EXPENSE', amount: 900_000,   description: 'Rent',                    date: date(2026, 4, 3)   },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 93_000,    description: 'Electricity bill',        date: date(2026, 4, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catUtilities.id,     type: 'EXPENSE', amount: 65_000,    description: 'Internet',                date: date(2026, 4, 10)  },
    { userId: user.id, accountId: bank.id,       categoryId: catFood.id,          type: 'EXPENSE', amount: 295_000,   description: 'Supermarket',             date: date(2026, 4, 12)  },
    { userId: user.id, accountId: creditCard.id, categoryId: catEntertainment.id, type: 'EXPENSE', amount: 89_900,    description: 'Netflix + Spotify',       date: date(2026, 4, 15)  },
    { userId: user.id, accountId: cash.id,       categoryId: catTransport.id,     type: 'EXPENSE', amount: 35_000,    description: 'Public transport Apr',    date: date(2026, 4, 14)  },
    { userId: user.id, accountId: bank.id,       categoryId: catHealth.id,        type: 'EXPENSE', amount: 75_000,    description: 'Gym membership',          date: date(2026, 4, 1)   },
  ]

  await prisma.transaction.createMany({ data: txData })
  console.log(`  ✓ Transactions (${txData.length})`)

  // ── 5. Transfers ──────────────────────────────────────────────────────────
  await prisma.transfer.createMany({
    data: [
      { userId: user.id, fromAccountId: bank.id,    toAccountId: savings.id,    amount: 500_000,   description: 'Monthly savings',    date: date(2025, 11, 30) },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: wallet.id,     amount: 100_000,   description: 'Nequi top-up',       date: date(2025, 12, 5)  },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: savings.id,    amount: 500_000,   description: 'Monthly savings',    date: date(2025, 12, 31) },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: savings.id,    amount: 600_000,   description: 'Monthly savings',    date: date(2026, 1, 31)  },
      { userId: user.id, fromAccountId: wallet.id,  toAccountId: cash.id,       amount: 80_000,    description: 'ATM withdrawal',     date: date(2026, 2, 1)   },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: savings.id,    amount: 500_000,   description: 'Monthly savings',    date: date(2026, 2, 28)  },
      { userId: user.id, fromAccountId: savings.id, toAccountId: investment.id, amount: 1_500_000, description: 'Investment deposit', date: date(2026, 3, 15)  },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: savings.id,    amount: 500_000,   description: 'Monthly savings',    date: date(2026, 3, 31)  },
      { userId: user.id, fromAccountId: bank.id,    toAccountId: wallet.id,     amount: 150_000,   description: 'Nequi top-up',       date: date(2026, 4, 5)   },
    ],
  })
  console.log('  ✓ Transfers (9)')

  // ── 6. Budgets (April & May 2026) ─────────────────────────────────────────
  await prisma.budget.createMany({
    data: [
      // April
      { userId: user.id, categoryId: catHousing.id,       amount: 950_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catFood.id,           amount: 500_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catTransport.id,      amount: 120_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catEntertainment.id,  amount: 150_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catHealth.id,         amount: 120_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catUtilities.id,      amount: 200_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catEducation.id,      amount: 200_000, month: 4, year: 2026 },
      { userId: user.id, categoryId: catClothing.id,       amount: 150_000, month: 4, year: 2026 },
      // May
      { userId: user.id, categoryId: catHousing.id,        amount: 950_000, month: 5, year: 2026 },
      { userId: user.id, categoryId: catFood.id,            amount: 500_000, month: 5, year: 2026 },
      { userId: user.id, categoryId: catTransport.id,       amount: 120_000, month: 5, year: 2026 },
      { userId: user.id, categoryId: catEntertainment.id,   amount: 150_000, month: 5, year: 2026 },
      { userId: user.id, categoryId: catHealth.id,          amount: 120_000, month: 5, year: 2026 },
      { userId: user.id, categoryId: catUtilities.id,       amount: 200_000, month: 5, year: 2026 },
    ],
  })
  console.log('  ✓ Budgets (14)')

  // ── 7. Goals + Contributions ──────────────────────────────────────────────
  const [goalEmergency, goalVacation, goalLaptop, goalCar] = await Promise.all([
    prisma.goal.create({
      data: {
        userId: user.id,
        name: 'Emergency Fund (6 months)',
        targetAmount: 27_000_000,
        startDate: date(2025, 9, 1),
        endDate: date(2026, 12, 31),
        status: GoalStatus.ACTIVE,
        icon: 'shield-check',
        contributions: {
          create: [
            { amount: 1_000_000, note: 'Initial deposit',     createdAt: date(2025, 9, 1)  },
            { amount: 500_000,   note: 'Sep contribution',    createdAt: date(2025, 9, 30) },
            { amount: 500_000,   note: 'Oct contribution',    createdAt: date(2025, 10, 31)},
            { amount: 500_000,   note: 'Nov contribution',    createdAt: date(2025, 11, 30)},
            { amount: 1_000_000, note: 'Year-end bonus part', createdAt: date(2025, 12, 31)},
            { amount: 500_000,   note: 'Jan contribution',    createdAt: date(2026, 1, 31) },
            { amount: 500_000,   note: 'Feb contribution',    createdAt: date(2026, 2, 28) },
            { amount: 500_000,   note: 'Mar contribution',    createdAt: date(2026, 3, 31) },
          ],
        },
      },
    }),
    prisma.goal.create({
      data: {
        userId: user.id,
        name: 'Europe Vacation',
        targetAmount: 8_000_000,
        startDate: date(2026, 1, 1),
        endDate: date(2026, 8, 1),
        status: GoalStatus.ACTIVE,
        icon: 'map',
        contributions: {
          create: [
            { amount: 500_000, note: 'Jan',  createdAt: date(2026, 1, 31) },
            { amount: 500_000, note: 'Feb',  createdAt: date(2026, 2, 28) },
            { amount: 800_000, note: 'Mar',  createdAt: date(2026, 3, 31) },
            { amount: 500_000, note: 'Apr',  createdAt: date(2026, 4, 15) },
          ],
        },
      },
    }),
    prisma.goal.create({
      data: {
        userId: user.id,
        name: 'MacBook Pro M4',
        targetAmount: 9_500_000,
        startDate: date(2025, 10, 1),
        endDate: date(2026, 6, 30),
        status: GoalStatus.ACTIVE,
        icon: 'computer-desktop',
        contributions: {
          create: [
            { amount: 1_000_000, note: 'Initial',  createdAt: date(2025, 10, 1)  },
            { amount: 800_000,   note: 'Nov',       createdAt: date(2025, 11, 30) },
            { amount: 1_500_000, note: 'Xmas bonus part', createdAt: date(2025, 12, 31) },
            { amount: 800_000,   note: 'Jan',       createdAt: date(2026, 1, 31)  },
            { amount: 800_000,   note: 'Feb',       createdAt: date(2026, 2, 28)  },
            { amount: 800_000,   note: 'Mar',       createdAt: date(2026, 3, 31)  },
          ],
        },
      },
    }),
    prisma.goal.create({
      data: {
        userId: user.id,
        name: 'Car down payment',
        targetAmount: 15_000_000,
        startDate: date(2026, 4, 1),
        endDate: date(2027, 4, 1),
        status: GoalStatus.ACTIVE,
        icon: 'truck',
        contributions: {
          create: [
            { amount: 500_000, note: 'First deposit', createdAt: date(2026, 4, 10) },
          ],
        },
      },
    }),
  ])
  console.log('  ✓ Goals (4) + Contributions')

  // ── 8. Debts + Payments ───────────────────────────────────────────────────
  await Promise.all([
    prisma.debt.create({
      data: {
        userId: user.id,
        name: 'Visa Platinum balance',
        creditor: 'Bancolombia',
        totalAmount: 1_800_000,
        remainingAmount: 680_000,
        interestRate: 26.40,
        startDate: date(2025, 8, 1),
        dueDate: date(2026, 8, 1),
        paymentDay: 15,
        status: DebtStatus.ACTIVE,
        notes: 'Credit card revolving balance. Pay in full each cycle when possible.',
        payments: {
          create: [
            { amount: 220_000, note: 'Aug partial',  paidAt: date(2025, 8, 15) },
            { amount: 220_000, note: 'Sep partial',  paidAt: date(2025, 9, 15) },
            { amount: 220_000, note: 'Oct partial',  paidAt: date(2025, 10, 15) },
            { amount: 220_000, note: 'Nov partial',  paidAt: date(2025, 11, 15) },
            { amount: 120_000, note: 'Dec partial',  paidAt: date(2025, 12, 15) },
            { amount: 120_000, note: 'Jan payment',  paidAt: date(2026, 1, 15)  },
          ],
        },
      },
    }),
    prisma.debt.create({
      data: {
        userId: user.id,
        name: 'Personal loan',
        creditor: 'Banco Davivienda',
        totalAmount: 6_000_000,
        remainingAmount: 3_840_000,
        interestRate: 18.50,
        startDate: date(2025, 6, 1),
        dueDate: date(2027, 6, 1),
        paymentDay: 5,
        status: DebtStatus.ACTIVE,
        notes: 'Used for home renovation.',
        payments: {
          create: [
            { amount: 360_000, note: 'Jun payment',  paidAt: date(2025, 6, 5)  },
            { amount: 360_000, note: 'Jul payment',  paidAt: date(2025, 7, 5)  },
            { amount: 360_000, note: 'Aug payment',  paidAt: date(2025, 8, 5)  },
            { amount: 360_000, note: 'Sep payment',  paidAt: date(2025, 9, 5)  },
            { amount: 360_000, note: 'Oct payment',  paidAt: date(2025, 10, 5) },
            { amount: 360_000, note: 'Nov payment',  paidAt: date(2025, 11, 5) },
            { amount: 360_000, note: 'Dec payment',  paidAt: date(2025, 12, 5) },
          ],
        },
      },
    }),
    prisma.debt.create({
      data: {
        userId: user.id,
        name: 'Laptop installments',
        creditor: 'Apple Store / Cuota',
        totalAmount: 4_200_000,
        remainingAmount: 0,
        interestRate: 0,
        startDate: date(2024, 6, 1),
        dueDate: date(2025, 6, 1),
        paymentDay: 1,
        status: DebtStatus.PAID,
        notes: '12-month 0% installment plan. Fully paid off.',
        payments: {
          create: Array.from({ length: 12 }, (_, i) => ({
            amount: 350_000,
            note: `Installment ${i + 1}/12`,
            paidAt: date(2024, 6 + i <= 12 ? 6 + i : 6 + i - 12, 1),
          })),
        },
      },
    }),
  ])
  console.log('  ✓ Debts (3) + Payments')

  console.log('\n✅ Demo seed complete!')
  console.log('   Email:    demo@mycash.app')
  console.log('   Password: Demo1234!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
