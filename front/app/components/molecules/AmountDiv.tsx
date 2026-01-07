interface IAmountDiv {
  title: string;
  amount: string;
  PercentageChange?: string;
}

export default function AmountDiv({
  title,
  amount,
  PercentageChange,
}: IAmountDiv) {
  return (
    <div className=" w-80 h-40 p-4  rounded border-2 border-primary-purple bg-light-bg dark:bg-black">
      <div className="dark:text-white font-bold text-2xl">{title}</div>
      <div className="text-4xl">{amount}</div>
      {PercentageChange ?? (
        <div className="w-full">
          <p>{PercentageChange}</p>
        </div>
      )}
    </div>
  );
}
