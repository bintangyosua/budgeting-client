import { create } from "zustand";

export type TransactionState = {
  id: number;
  date: Date;
  amount: number;
  category_id: number;
  description: string;
  wallet_id: number;
  user_id: number;
};

export type StoreState = {
  value: TransactionState[];
};

export const useTransactionsStore = create<StoreState>()((set) => ({
  value: [] as TransactionState[],
  setTransactions: (payload: TransactionState[]) =>
    set((state) => ({
      value: payload,
    })),
}));

const { value } = useTransactionsStore();
