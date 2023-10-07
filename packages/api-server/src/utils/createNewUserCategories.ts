import prisma from '@/config/prisma';
import { addMonths, startOfMonth } from 'date-fns';

export default async function createNewUserCategories(
  userId: string,
  incomeCategoryId: string,
  expenseCategoryId: string
) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      categories: {
        update: [
          // ADD INCOME SUBCATEGORIES
          {
            where: { id: incomeCategoryId, name: 'Income' },
            data: {
              subcategories: {
                create: [
                  {
                    name: 'Job - Paycheck',
                    user: connectUserId(userId),
                    targets: {
                      create: createInitialTargets(userId),
                    },
                  },
                  {
                    name: 'Freelance - Business',
                    user: connectUserId(userId),
                    targets: {
                      create: createInitialTargets(userId),
                    },
                  },
                  {
                    name: 'Miscellaneous',
                    user: connectUserId(userId),
                    targets: {
                      create: createInitialTargets(userId),
                    },
                  },
                ],
              },
            },
          },
          // ADD EXPENSE SUBCATEGORIES
          {
            where: { id: expenseCategoryId, name: 'Expenses' },
            data: {
              subcategories: {
                create: [
                  {
                    name: 'Bills',
                    user: connectUserId(userId),
                    subcategories: {
                      create: [
                        {
                          name: 'Rent',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Water',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Electric',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: "Renter's Insurance",
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Debt',
                    user: connectUserId(userId),
                    subcategories: {
                      create: [
                        {
                          name: 'Student Loans',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Credit Card Payments',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Food',
                    user: connectUserId(userId),
                    subcategories: {
                      create: [
                        {
                          name: 'Groceries',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Dining Out',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Auto',
                    user: connectUserId(userId),
                    subcategories: {
                      create: [
                        {
                          name: 'Car Payment',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Car Insurance',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Gas',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Parking',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Entertainment',
                    user: connectUserId(userId),
                    subcategories: {
                      create: [
                        {
                          name: 'Movies',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                        {
                          name: 'Activities',
                          user: connectUserId(userId),
                          targets: {
                            create: createInitialTargets(userId),
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Miscellaneous',
                    user: connectUserId(userId),
                    subcategories: {
                      create: {
                        name: 'Miscellaneous Expenses',
                        user: connectUserId(userId),
                        targets: {
                          create: createInitialTargets(userId),
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  });
}

function connectUserId(userId: string) {
  return { connect: { id: userId } };
}

function createInitialTargets(userId: string) {
  const currentMonth = startOfMonth(new Date());
  return [
    { user: connectUserId(userId), date: currentMonth },
    { user: connectUserId(userId), date: addMonths(currentMonth, 1) },
    { user: connectUserId(userId), date: addMonths(currentMonth, 2) },
  ];
}
