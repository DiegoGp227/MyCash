import AmountDiv from "./AmountDiv";

export default function GeneralAmount() {
  return (
    <div className="flex w-full justify-center gap-20">
      <AmountDiv amount={"+$60,250.00"} title="BALANCE TOTAL" />
      <AmountDiv
        amount={"+$60,250.00"}
        title="BALANCE DEL MES"
        PercentageChange={"↑ +8.5% vs mes anterior "}
      />
      <AmountDiv
        amount={"+$60,250.00"}
        title="INGRESOS DEL MES"
        PercentageChange={"↓ -5.2% vs mes anterior "}
      />
      <AmountDiv
        amount={"+$60,250.00"}
        title="GASTOS DEL MES"
        PercentageChange={"↓ -5.2% vs mes anterior "}
      />
    </div>
  );
}
