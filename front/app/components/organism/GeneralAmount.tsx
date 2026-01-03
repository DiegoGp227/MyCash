import AmountDiv from "../molecules/AmountDiv";

export default function GeneralAmount() {
  return (
    <div className="flex w-full justify-center gap-20">
      <AmountDiv amount={12} title="BALANCE TOTAL" PercentageChange={12} />
      <AmountDiv amount={12} title="BALANCE DEL MES" PercentageChange={12} />
      <AmountDiv amount={12} title="INGRESOS DEL MES" PercentageChange={12} />
      <AmountDiv amount={12} title="GASTOS DEL MES" PercentageChange={12} />
    </div>
  );
}
