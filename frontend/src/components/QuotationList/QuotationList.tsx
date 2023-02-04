import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import './QuotationList.styles.scss'
import { IQuotation } from '../../models/quotation'
import { useEffect, useState } from 'react'
import * as QuotationApi from '../../network/quotationApi'
import { Container, Spinner } from '@chakra-ui/react'

const columnHelper = createColumnHelper<IQuotation>()

const columns = [
  {
    accessorKey: 'quotationId',
    header: 'Quotation Number'
  },
  columnHelper.accessor('priceTerm', {
    header: 'Price Term'
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('createdBy', {
    header: () => <span>Prepeared By</span>
  })
]

const QuotationList = () => {
  const [data, setQuotation] = useState<IQuotation[]>([])

  useEffect(() => {
    async function loadQuotations() {
      try {
        const data = await QuotationApi.fetchQuotations()
        setQuotation(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadQuotations()
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Container maxW="container.lg" my={8}>
      <div>
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
      </div>
    </Container>
  )
}

export default QuotationList