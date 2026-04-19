interface IGeneralInfoDivProps {
  title: string;
  content: number | string;
}

export default function GerelInfoDiv({ title, content }: IGeneralInfoDivProps) {
  return (
    <div className="w-full min-h-[8rem] p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg flex flex-col gap-2">
      <div className="text-xs font-bold uppercase tracking-wider text-hard-gray">{title}</div>
      <div className="flex-1 flex items-center text-4xl font-bold dark:text-white">
        {content}
      </div>
    </div>
  );
}
