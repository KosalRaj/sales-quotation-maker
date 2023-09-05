import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import * as CustomerApi from '../../network/customerApi'
import { Box, Flex, IconButton, Spinner } from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { ICustomer } from '../../models/customer'
import AddCustomerDialogue from '../AddCustomerDialogue'

const CustomerList = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await CustomerApi.fetchCustomersList()
        setCustomers(data)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    loadItems()
  }, [])

  async function deleteCustomer(customerId: string) {
    try {
      await CustomerApi.deleteCustomer(customerId)
      setCustomers(
        customers.filter(
          (updatedData: ICustomer) => updatedData._id !== customerId
        )
      )
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const columns = useMemo<ColumnDef<ICustomer>[]>(
    () => [
      {
        id: 'customerSerialNumber',
        header: 'SN',
        cell: (props) => Number(props.row.id) + 1
      },
      {
        accessorKey: 'name',
        header: 'Customer Name'
      },
      {
        accessorKey: 'address',
        header: 'Address'
      },
      {
        accessorKey: 'contactPerson',
        header: 'Contact Person'
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: (row) => (
          <IconButton
            aria-label="Delete item"
            variant="link"
            colorScheme="red"
            icon={<FiTrash2 />}
            onClick={(e) => {
              deleteCustomer(row.row.original._id)
              e.stopPropagation()
            }}
          />
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Box>
      <Flex mb="3ren">
        <AddCustomerDialogue
          onCustomerSaved={(newCustomer) => {
            setCustomers([...customers, newCustomer])
          }}
          buttonType="primary-white"
        />
      </Flex>

      <Box className="table-wrapper" mt="2.5rem">
        {customers.length === 0 ? (
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

export default CustomerList
