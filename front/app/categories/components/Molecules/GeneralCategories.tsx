import GerelInfoDiv from "./GerelInfoDiv";

export default function GeneralCategories() {
  return (
    <div className="flex w-full justify-center gap-20">
      <GerelInfoDiv title="Total Categories" content={7} />
      <GerelInfoDiv title="Total Expense Categories" content={7} />
      <GerelInfoDiv title="Total Icome Categories" content={7} />
      <GerelInfoDiv title="Most Used Category" content={"Food"} />
    </div>
  );
}
