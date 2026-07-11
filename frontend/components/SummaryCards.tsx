interface Props {
  imported: number;
  skipped: number;
  total: number;
  processingTime: number;
}

export default function SummaryCards({
  imported,
  skipped,
  total,
  processingTime,
}: Props) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Total Records
          </h3>

          <p className="text-5xl font-bold mt-2 text-blue-700 dark:text-blue-300">
            {total}
          </p>
        </div>

        <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
            Imported
          </h3>

          <p className="text-5xl font-bold mt-2 text-green-700 dark:text-green-300">
            {imported}
          </p>
        </div>

        <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
            Skipped
          </h3>

          <p className="text-5xl font-bold mt-2 text-red-700 dark:text-red-300">
            {skipped}
          </p>
        </div>
      </div>

      {processingTime > 0 && (
        <div className="mt-6 rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 text-center shadow">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            ⚡ Processing Time
          </h3>

          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-300">
            {(processingTime / 1000).toFixed(2)} seconds
          </p>

          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Completed successfully
          </p>
        </div>
      )}
    </>
  );
}