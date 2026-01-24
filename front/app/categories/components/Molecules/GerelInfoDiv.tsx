interface IGeneralInfoDivProps {
  title: string;
  content: number | string;
}

export default function GerelInfoDiv({ title, content }: IGeneralInfoDivProps) {
  return (
    <div className="w-80 h-40 p-4 rounded border-2 border-primary-purple bg-light-bg dark:bg-black flex flex-col">
      <div className="dark:text-white font-bold text-2xl">{title}</div>
      <div className="flex-1 flex justify-center items-center text-5xl font-bold">
        {content}
      </div>
    </div>
  );
}
