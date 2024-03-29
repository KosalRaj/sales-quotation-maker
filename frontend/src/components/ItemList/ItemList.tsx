import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import './ItemList.scss'
import { IItem } from '../../models/lineItem'
import { useEffect, useState } from 'react'
import * as ItemsApi from '../../network/itemsApi'
import { Box, Flex, IconButton, Spinner } from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import AddItemDialogue from '../AddItemDialogue/AddItemDialogue'
import HandsOnTableList from './HandsOnTableList'

// interface ItemListProps {
//   items: IItem[]
// }

const ItemList = () => {
  const [data, setItems] = useState<IItem[]>([])

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await ItemsApi.fetchItems()
        setItems(data)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    loadItems()
  }, [])

  async function deleteItem(itemId: string) {
    try {
      await ItemsApi.deleteItem(itemId)
      setItems(data.filter((updatedData) => updatedData._id !== itemId))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const columnHelper = createColumnHelper<IItem>()

  const columns = [
    {
      accessorKey: 'itemName',
      header: 'Item Name'
    },
    columnHelper.accessor('manufacturer', {
      header: 'Maker'
    }),
    columnHelper.accessor('itemModel', {
      header: 'Model',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('itemProps', {
      header: () => <span>Description</span>,
      cell: (row) => {
        const cellData: Array<string> = row.getValue()
        const list = cellData.map((prop, index) => <li key={index}>{prop}</li>)
        return <ul className="cell-list">{list}</ul>
      }
    }),
    columnHelper.accessor('itemUom', {
      header: 'UOM'
    }),
    columnHelper.accessor('unitPrice', {
      header: 'Unit Price'
    }),
    columnHelper.accessor((row) => row, {
      id: 'deleteItem',
      cell: (row) => (
        <IconButton
          aria-label="Delete item"
          variant="link"
          colorScheme="red"
          icon={<FiTrash2 />}
          onClick={(e) => {
            deleteItem(row.row.original._id)
            e.stopPropagation()
          }}
        />
      ),
      header: ''
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Box>
      <Flex mb="3ren">
        <AddItemDialogue
          onItemSaved={(newItem) => {
            setItems([...data, newItem])
          }}
          buttonType="primary-white"
        />
      </Flex>

      <Box className="table-wrapper" mt="2.5rem">
        {data.length === 0 ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="th" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="table__body">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  )
}

export default ItemList
