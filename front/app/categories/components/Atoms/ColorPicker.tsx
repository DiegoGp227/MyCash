const PRESET_COLORS = [
  "#9333ea", // purple
  "#dc2626", // red
  "#16a34a", // green
  "#2563eb", // blue
  "#d97706", // amber
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#7c3aed", // violet
  "#ea580c", // orange
  "#14b8a6", // teal
  "#4f46e5", // indigo
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  error?: string;
}

export default function ColorPicker({ value, onChange, error }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-6 gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
              value === color ? "ring-2 ring-primary-purple ring-offset-2" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#9333ea"}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 cursor-pointer rounded border-0"
        />
        <span className="text-sm text-hard-gray">{value || "Seleccionar color"}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
