interface BackdropProps {
  onClick: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
      onClick={onClick}
    />
  );
}
