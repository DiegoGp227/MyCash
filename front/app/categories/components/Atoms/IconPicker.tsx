const PRESET_ICONS = [
  "\u{1F355}", "\u{1F3E0}", "\u{1F697}", "\u{1F4BC}", "\u{1F3AE}", "\u{1F4F1}",
  "\u{1F4B0}", "\u{1F3E6}", "\u{1F6D2}", "\u{2708}\uFE0F", "\u{1F3E5}", "\u{1F4DA}",
  "\u{1F3AC}", "\u{1F3B5}", "\u{1F4AA}", "\u{2615}", "\u{1F381}", "\u{1F4E6}",
  "\u{1F393}", "\u{1F4B3}", "\u{1F6BF}", "\u{1F4A1}", "\u{2764}\uFE0F", "\u{2B50}",
];

interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
  error?: string;
}

export default function IconPicker({ value, onChange, error }: IconPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-8 gap-2">
        {PRESET_ICONS.map((icon) => (
          <button
            key={icon}
            type="button"
            className={`w-9 h-9 text-xl flex items-center justify-center rounded cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-dark-surface ${
              value === icon ? "ring-2 ring-primary-purple bg-primary-purple-soft dark:bg-dark-surface" : ""
            }`}
            onClick={() => onChange(icon)}
          >
            {icon}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Emoji personalizado"
          className="input text-hard-gray w-full text-sm"
          maxLength={4}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
