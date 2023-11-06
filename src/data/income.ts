interface transaction {
  date: string;
  amount: number;
  category: string;
  description: string;
  wallet: string;
  userid: number;
}

export const incomes: transaction[] = [
  {
    date: "08/20/2023",
    amount: 20000,
    category: "Incoming Transfer",
    description: "Transfer from my friend",
    wallet: "Bank",
    userid: 1,
  },
  {
    date: "08/19/2023",
    amount: 30000,
    category: "Incoming Transfer",
    description: "Transfer from my friend",
    wallet: "Bank",
    userid: 1,
  },
  {
    date: "08/17/2023",
    amount: 2500,
    category: "Other Income",
    description: "Transfer from my friend",
    wallet: "Cash",
    userid: 1,
  },
];
