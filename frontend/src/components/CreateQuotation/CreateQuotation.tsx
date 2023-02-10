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
  Input,
  Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IQuotation, ILineItem } from '../../models/quotation'
import * as QuotationApi from '../../network/quotationApi'
import { useForm } from 'react-hook-form'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import ItemSearch from '../ItemSearch/ItemSearch'

const CreateQuotation = () => {
  const [lastQuotationId, setLastQuotationId] = useState('')
  const [lineItemCount, setLineItemCount] = useState(0)
  const [data, setData] = useState([])

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

  const columnHelper = createColumnHelper<ILineItem>()

  const columns = [
    columnHelper.accessor((row) => row, {
      header: 'Qty',
      id: 'qty',
      cell: (row) => {
        console.log(row)
      }
    })
    // columnHelper.accessor('itemModel', {
    //   header: 'Model',
    //   cell: (info) => info.getValue()
    // }),
    // columnHelper.accessor('itemProps', {
    //   header: () => <span>Description</span>,
    //   cell: (row) => {
    //     const cellData: Array<string> = row.getValue()
    //     const list = cellData.map((prop, index) => <li key={index}>{prop}</li>)
    //     return <ul className="cell-list">{list}</ul>
    //   }
    // }),
    // columnHelper.accessor('itemUom', {
    //   header: 'UOM'
    // }),
    // columnHelper.accessor('unitPrice', {
    //   header: 'Unit Price'
    // }),
    // columnHelper.accessor((row) => row, {
    //   id: 'deleteItem',
    //   cell: (row) => (
    //     <IconButton
    //       aria-label="Delete item"
    //       variant="link"
    //       colorScheme="red"
    //       icon={<FiTrash2 />}
    //       onClick={(e) => {
    //         deleteItem(row.row.original._id)
    //         e.stopPropagation()
    //       }}
    //     />
    //   ),
    //   header: ''
    // })
  ]

  const table = useReactTable({
    data,
    columns,
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <ItemSearch />
    </Container>
  )
}

export default CreateQuotation
