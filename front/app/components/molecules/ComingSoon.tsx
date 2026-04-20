export default function ComingSoon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-4 text-center">
        {icon}
        <p className="text-hard-gray">This section will be available soon.</p>
      </div>
    </div>
  );
}
