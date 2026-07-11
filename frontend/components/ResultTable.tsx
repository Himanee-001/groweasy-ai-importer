interface Props {
  title: string;
  data: any[];
}

export default function ResultTable({
  title,
  data,
}: Props) {

  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  // Show only first 20 AI results
  const previewData = data.slice(0, 20);

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
  {title}
</h2>

        <p className="text-sm text-gray-500">
          Showing {previewData.length} of {data.length} imported records
        </p>

      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[450px] border rounded-lg">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-green-100">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="border px-4 py-3 text-left whitespace-nowrap"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {previewData.map((row, index) => (

              <tr key={index} className="hover:bg-green-50">

                {headers.map((header) => (

                  <td
                    key={header}
                    className="border px-4 py-2 whitespace-nowrap"
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