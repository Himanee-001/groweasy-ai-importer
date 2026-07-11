import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mb-10">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            GrowEasy AI CSV Importer
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Import any CSV and intelligently extract CRM leads using AI
          </p>
        </div>

        <ThemeToggle />

      </div>

    </header>
  );
}