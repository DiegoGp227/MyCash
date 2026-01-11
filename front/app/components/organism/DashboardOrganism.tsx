import GeneralAmount from "./GeneralAmount";
import GraphsOrganism from "./GraphsOrganism";
import TransactionsOrganism from "./TransactionsOrganism";

export default function DashboardOrganism() {
  return (
    <>
      <GeneralAmount />
      <GraphsOrganism />
      <TransactionsOrganism />
    </>
  );
}
