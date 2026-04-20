import { Trash2 } from "lucide-react";

interface ContentCardProps {
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

export default function ContentCard({ onEdit, onView, onDelete }: ContentCardProps) {
  return (
    <div>
      <div className="flex justify-between p-2 border-b border-gray-300 dark:border-primary-purple">
        <div>
          <p>This Month</p>
          <p className="font-bold text-2xl text-hard-gray">-</p>
        </div>
        <div>
          <p>Transactions</p>
          <p className="font-bold flex justify-end text-2xl text-hard-gray">-</p>
        </div>
      </div>

      <div className="flex justify-between pt-2 gap-1">
        <button
          onClick={onEdit}
          className="bg-primary-purple rounded text-white cursor-pointer w-[38%] font-semibold hover:bg-primary-purple-hover transition-colors py-1"
        >
          Edit
        </button>
        <button
          onClick={onView}
          className="rounded border-2 border-primary-purple text-black cursor-pointer w-[38%] font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors py-1"
        >
          View
        </button>
        <button
          onClick={onDelete}
          className="rounded border-2 border-error text-error cursor-pointer w-[20%] font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors py-1 flex items-center justify-center"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
