export async function getExpenses() {
  try {
    const result = await fetch("http://127.0.0.1:8000/api/expenses");
    const data = result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
