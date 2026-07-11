import { CsvRow } from "@/types/csv";

interface PreviewTableProps {
  data: CsvRow[];
}

export default function PreviewTable({
  data,
}: PreviewTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 mt-10 text-center transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          CSV Preview
        </h2>

        <div className="text-6xl mb-4">📂</div>

        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Upload a CSV to preview records.
        </p>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Your uploaded data will appear here before AI processing.
        </p>
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  const previewData = data.slice(0, 20);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 mt-10 transition-colors">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          CSV Preview
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {previewData.length} of {data.length} imported records
        </p>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[450px] border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {previewData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border border-gray-200 dark:border-gray-700 px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300"
                  >
                    {String(row[header] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}