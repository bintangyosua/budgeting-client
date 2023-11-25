export default function TopTransaction(props: {
  name: string;
  amount: number;
  percentage: number;
}) {
  return (
    <div className="flex flex-row items-center w-10 h-10">
      <div className="min-w-full p-8 rounded-xl bg-zinc-100">
        <h3 className="text-lg text-black">{props.name}</h3>
        <div className="flex flex-row items-center justify-center pt-2 space-x-4">
          <h4 className="text-2xl text-black">
            {props.amount.toLocaleString("id-ID", {
              currency: "IDR",
              style: "currency",
            })}
          </h4>
          <div className="flex items-center justify-center">
            <h4
              className={`rounded-full ${
                props.percentage >= 0 ? "bg-green-500" : "bg-red-500"
              }   h-6 text-black font-bold align-middle px-4 flex justify-center items-center py-0`}>
              {props.percentage >= 0
                ? `+${props.percentage}%`
                : `${props.percentage}%`}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
