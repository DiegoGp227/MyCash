export default function ComingSoon({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4 text-center">
        {icon}
        <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
        <p className="text-hard-gray">Esta sección estará disponible próximamente.</p>
      </div>
    </div>
  );
}
