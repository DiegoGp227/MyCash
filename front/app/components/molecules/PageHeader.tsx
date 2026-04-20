interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        {icon && (
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary-purple/10 dark:bg-primary-purple/20 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-light-text-main dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-base text-hard-gray">{description}</p>
          )}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-primary-purple/50 via-primary-purple/20 to-transparent" />
    </div>
  );
}
