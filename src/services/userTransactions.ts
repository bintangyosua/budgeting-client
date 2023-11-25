import axios from "axios";
import { useSession } from "next-auth/react";

export async function getUserTransactions(email: string) {
  const response = await axios.get(
    `${process.env.API_URL!}/users/${email}/transactions`
  );

  return response.data;
}
