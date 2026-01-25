export default function ContentCard() {
  return (
    <div>
      <div className="flex justify-between p-2 border-b border-gray-300 dark:border-primary-purple">
        <div>
          <p>This Month</p>
          <p className="font-bold text-2xl text-green-400">+$25,000.00</p>
        </div>
        <div>
          <p>Transactions</p>
          <p className="font-bold flex justify-end text-2xl">5</p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button className="bg-primary-purple rounded text-white cursor-pointer w-[49%] font-semibold">Edit</button>
        <button className="rounded border-2 border-primary-purple text-black cursor-pointer w-[49%] font-semibold dark:text-white">view</button>
      </div>
    </div>
  );
}
