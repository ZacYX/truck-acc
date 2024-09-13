import { DataType } from "@/app/lib/types";

export default function DataTable<Type extends DataType>({
  data,
  tableTitle,
  handleDelete,
  handleEdit,
}: {
  data: Type[],
  tableTitle: string[],
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void,
}) {
  const keys = tableTitle;

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="border-b w-full leading-8">
            {/* {
              Object.keys(data[0]).map((title, index) => {
                return <td key={index}>{title.toUpperCase()}</td>
              })
            } */}
            {keys.map((item, index) => {
              return (<td key={index}>{item}</td>)
            })}
            <td>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((rowItem: Type, index: number) => (
              <tr key={index} className="border-b w-full leading-8">
                {/* {
                  Object.values(rowItem).map((cellItem: any, cellIndex: number) => {
                    if (!Array.isArray(cellItem) && !(cellItem instanceof Object)) {
                      return <td key={cellIndex}>{cellItem}</td>
                    } else {
                      // return <td key={cellIndex}>{JSON.stringify(cellItem)}</td>
                    }
                  })
                } */}
                {
                  keys.map((item, index) => {
                    return (
                      <td key={index}>
                        {getValueByKey(rowItem, item.split("."))}
                      </td>
                    )
                  })
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


function getValueByKey(obj: any, key: string[]) {
  // console.log(`getValueByKey:::::::::::::::::::::::::::::::::::::::::::::`)
  // console.log(`obj: ${JSON.stringify(obj)}`)
  // console.log(`key: ${JSON.stringify(key)}`)

  if (!obj || !(obj instanceof Object)) {
    // console.log(`return obj: ${obj}`)
    return obj;
  }
  if (key.length < 1) {
    // console.log(`return JSON.stringify(obj): ${JSON.stringify(obj)}`)
    return JSON.stringify(obj);
  }
  let value = [];
  if (obj instanceof Array) {
    for (let item of obj) {
      value.push(item[key[0]])
    }
  } else {
    value = obj[key[0]];
  }
  if (key.length === 1) {
    // console.log(`value instanceof Object ? : ${value instanceof Object ? JSON.stringify(value) : value}`)
    return value instanceof Object ? JSON.stringify(value) : value;
  }
  return getValueByKey(value, key.slice(1));

}
