import {
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Select,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField
} from '@chakra-ui/react'
import { useEffect, useState, useMemo } from 'react'
import { IItem, ITabularSpecs } from '../../models/lineItem'
import { IQuotation, ILineItem } from '../../models/quotation'
import * as QuotationApi from '../../network/quotationApi'
import { useForm } from 'react-hook-form'
import {
  /* createColumnHelper, */
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowData
} from '@tanstack/react-table'
import ItemSearch from '../ItemSearch/ItemSearch'

export interface ITableItem {
  _id: string
  itemName: string
  manufacturer?: string
  itemModel?: string
  hasTabularSpecs?: boolean
  itemSpecs?: ITabularSpecs[]
  itemProps?: string[]
  itemUom: string
  unitPrice: number
  itemQuantity: number
}

const DescriptionColumn = (row: IItem) => {
  return (
    <>
      <div>{row.itemName}</div>
      <div>
        <span>Make: {row.manufacturer},</span>
        <span>Model: {row.itemModel}</span>
      </div>
      <div>
        <ul>
          {row.itemProps?.length !== 0 || row.itemProps !== undefined
            ? row.itemProps?.map((itemProp: string, index: number) => (
                <li key={index}>{itemProp}</li>
              ))
            : null}
        </ul>
      </div>
    </>
  )
}

interface EmptyTableProps {
  colspan: number
}
const EmptyTable = ({ colspan }: EmptyTableProps) => {
  return (
    <tr>
      <td className="empty-table" colSpan={colspan}>
        Add items to table
      </td>
    </tr>
  )
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

const CreateQuotation = () => {
  const [lastQuotationId, setLastQuotationId] = useState('')
  let [lineItemCount, setLineItemCount] = useState(0)
  const [data, setData] = useState<Array<ITableItem>>([
    // {
    //   _id: '63cefb9989c9aa60768f1fe3',
    //   itemName: 'Example Item 1',
    //   manufacturer: 'Example Manufacturer 1',
    //   itemModel: 'EXAMPLE123',
    //   hasTabularSpecs: true,
    //   itemSpecs: [
    //     {
    //       key: 'Color',
    //       value: 'Blue',
    //       _id: '63cefb9989c9aa60768f1fe4'
    //     },
    //     {
    //       key: 'Weight',
    //       value: '1 kg',
    //       _id: '63cefb9989c9aa60768f1fe5'
    //     }
    //   ],
    //   itemProps: ['Example Property 1', 'Example Property 2'],
    //   itemUom: 'each',
    //   unitPrice: 100,
    //   itemQuantity: 2
    // },
    // {
    //   _id: '63cefb9989c5aa60768f1fe3',
    //   itemName: 'Example Item 2',
    //   manufacturer: 'Example Manufacturer 2',
    //   itemModel: 'EXAMPLE1234',
    //   hasTabularSpecs: false,
    //   itemSpecs: [],
    //   itemProps: ['Example Property 1', 'Example Property 2'],
    //   itemUom: 'pcs',
    //   unitPrice: 150,
    //   itemQuantity: 4
    // }
  ])

  const addLineItem = (item: ITableItem) => {
    setData([...data, item])
  }

  const updateLineItem = (index: number, updatedItem: ITableItem) => {
    setData(
      data.map((item, i) => {
        return i === index ? updatedItem : item
      })
    )
  }

  const currentDate = new Date(Date.now())

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  useEffect(() => {
    async function getLastQuotation() {
      try {
        const data = await QuotationApi.fetchLastQuotation()
        setLastQuotationId(data._id)
      } catch (error) {
        console.log(error)
      }
    }
    getLastQuotation()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IQuotation>()

  // Give our default column cell renderer editing superpowers!
  const defaultColumn: Partial<ColumnDef<ITableItem>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
      }

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      if (id === 'itemQuantity') {
        return (
          //   <Input
          //   value={value as string}
          //   onChange={(e) => setValue(e.target.value)}
          //   onBlur={onBlur}
          // />
          <NumberInput
            value={value as string}
            onChange={(value) => setValue(value)}
            onBlur={onBlur}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )
      }

      return value
    }
  }

  const columns = useMemo<ColumnDef<ITableItem>[]>(
    () => [
      {
        id: 'lineItemCount',
        header: 'SN',
        cell: (props) => Number(props.row.id) + 1
      },
      {
        // header: 'Description',
        // id: 'description',
        // cell: (info) => info.getValue()
        accessorKey: 'itemName',
        header: 'Item Name'
      },
      {
        accessorKey: 'itemQuantity',
        header: 'Qty'
      },
      {
        accessorKey: 'itemUom',
        header: 'UOM'
      },
      {
        accessorKey: 'unitPrice',
        header: 'Unit Price'
      },
      {
        id: 'totalItemAmount',
        header: 'Total Amount',
        cell: (info) => {
          const itemQty = info.row?.original?.itemQuantity
          const itemPrice = info.row?.original?.unitPrice
          return itemQty * itemPrice
        },
        footer: 'Total Amount'
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Container maxW="container.lg" my={4}>
      <Heading as="h3" fontSize="x-large" my={4}>
        Quotation
      </Heading>
      <form id="createQuotation" /* onSubmit={handleSubmit(onSubmit)} */>
        <Flex flexDirection="column">
          <FormControl>
            <Flex alignItems="center">
              <FormLabel m="0" mr="1rem">
                Quotation Number:
              </FormLabel>
              <Editable defaultValue="3456">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex alignItems="center">
              <FormLabel m="0" mr="1rem">
                Date:
              </FormLabel>
              <Editable defaultValue={formattedDate}>
                <EditablePreview />
                <EditableInput readOnly />
              </Editable>
            </Flex>
          </FormControl>

          <FormControl
            isInvalid={!!errors.priceTerm}
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <FormLabel whiteSpace="nowrap">Price Term: </FormLabel>
            <Select
              w="auto"
              id="priceTerm"
              {...register('priceTerm', {
                required: 'Please select price term option'
              })}
            >
              <option value="cpt">CPT</option>
              <option value="fob">FOB</option>
              <option value="cip">CIP</option>
            </Select>
            <FormErrorMessage>
              {errors.priceTerm && errors.priceTerm?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.currency}
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <FormLabel whiteSpace="nowrap">Currency: </FormLabel>
            <Select
              w="auto"
              id="currency"
              {...register('currency', {
                required: 'Please select price term option'
              })}
            >
              <option value="npr">NPR</option>
              <option value="usd">USD</option>
              <option value="inr">INR</option>
            </Select>
            <FormErrorMessage>
              {errors.currency && errors.currency?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <Flex alignItems="center">
              <FormLabel m="0" mr="1rem">
                Prepared By:
              </FormLabel>
              <Editable defaultValue="Employee Name">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Flex>
          </FormControl>
        </Flex>

        <table className="table quotation-items-table">
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
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <EmptyTable colspan={columns.length} />
            )}
          </tbody>
        </table>
      </form>

      <ItemSearch addLineItem={addLineItem} />
    </Container>
  )
}

export default CreateQuotation
