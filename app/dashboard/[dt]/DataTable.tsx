import { DataType } from "@/app/lib/types";

export default function DataTable<Type extends DataType>({
  data,
  handleDelete,
  handleEdit,
}: {
  data: Type[],
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void,
}) {
  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="border-b w-full leading-8">
            {
              Object.keys(data[0]).map((title, index) => (
                <td key={index}>{title.toUpperCase()}</td>
              ))
            }
            <td>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((rowItem: any, index: number) => (
              <tr key={index} className="border-b w-full leading-8">
                {
                  Object.values(rowItem).map((cellItem: any, cellIndex: number) => (
                    <td key={cellIndex}>{cellItem}</td>
                  ))
                }

                <td className="">
                  <button
                    className="btn rounded-md hover:bg-lime-500 min-h-6 h-8"
                    onClick={() => handleEdit(rowItem.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn hover:bg-red-500 min-h-6 h-8"
                    onClick={() => handleDelete(rowItem.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  )
}