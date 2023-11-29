export async function getExpenses() {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`);
    const data = result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
