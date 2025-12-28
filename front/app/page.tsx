export default function HomePage() {
  return (
    <div
      className="
        min-h-screen w-full p-8 space-y-10
        bg-light-bg text-light-text-main
        dark:bg-dark-bg dark:text-dark-text-main
        transition-colors
      "
    >
      {/* Title */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Theme Test</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Visual test for light / dark mode and color system
        </p>
      </section>

      {/* Surfaces */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border">
          <h2 className="font-semibold mb-2">Surface</h2>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Cards, panels, containers
          </p>
        </div>

        <div className="p-6 rounded-xl bg-primary-purple-soft dark:bg-dark-border">
          <h2 className="font-semibold mb-2">Soft Accent</h2>
          <p className="text-sm">
            Subtle backgrounds / hover states
          </p>
        </div>

        <div className="p-6 rounded-xl bg-primary-purple text-white">
          <h2 className="font-semibold mb-2">Primary Accent</h2>
          <p className="text-sm opacity-90">
            Primary actions
          </p>
        </div>
      </section>

      {/* Text hierarchy */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Text hierarchy</h2>
        <p>Primary text — main content</p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Secondary text — descriptions, hints
        </p>
        <p className="text-gray-400">Disabled / muted</p>
      </section>

      {/* Buttons */}
      <section className="flex flex-wrap gap-4">
        <button className="px-5 py-2 rounded-lg bg-primary-purple hover:bg-primary-purple-hover text-white transition-colors">
          Primary
        </button>

        <button
          className="
            px-5 py-2 rounded-lg border
            border-light-border dark:border-dark-border
            hover:bg-primary-purple-soft dark:hover:bg-dark-border
            transition-colors
          "
        >
          Secondary
        </button>

        <button className="px-5 py-2 rounded-lg bg-success text-white">
          Success
        </button>

        <button className="px-5 py-2 rounded-lg bg-warning text-white">
          Warning
        </button>

        <button className="px-5 py-2 rounded-lg bg-error text-white">
          Error
        </button>
      </section>

      {/* Borders */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Borders</h2>
        <div className="h-12 border border-light-border dark:border-dark-border rounded-lg flex items-center px-4">
          Border example
        </div>
      </section>
    </div>
  );
}
