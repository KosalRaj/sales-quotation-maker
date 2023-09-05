import { useForm, useFieldArray } from 'react-hook-form'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'

interface ItemSpecs {
  key: string
  value: string[][]
}

interface Item {
  name: string
  model: string
  itemSpecs?: ItemSpecs[]
}

interface Props {
  onSubmit: (item: Item) => void
}

function EditableTable({ onSubmit }: Props) {
  const { register, control, handleSubmit } = useForm<Item>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itemSpecs'
  })

  const handleAddRow = () => {
    append({ key: '', value: [[]] })
  }

  const handleRemoveRow = (index: number) => {
    remove(index)
  }

  const handleRemoveValue = (rowIndex: number, valueIndex: number) => {
    const itemSpecs = [...fields]
    itemSpecs[rowIndex].value.splice(valueIndex, 1)
    fields[rowIndex].value = itemSpecs[rowIndex].value
  }

  const onSubmitItem = (item: Item) => {
    onSubmit(item)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitItem)}>
      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Model</Th>
              <Th>Item Specs</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <input {...register('name')} />
              </Td>
              <Td>
                <input {...register('model')} />
              </Td>
              <Td>
                {fields.map((itemSpec, rowIndex) => (
                  <div key={itemSpec.id}>
                    <input {...register(`itemSpecs.${rowIndex}.key`)} />
                    {itemSpec.value.map((valueRow, valueIndex) => (
                      <div key={`${rowIndex}-${valueIndex}`}>
                        {valueRow.map((value, i) => (
                          <div key={`${rowIndex}-${valueIndex}-${i}`}>
                            <input
                              {...register(
                                `itemSpecs.${rowIndex}.value.${valueIndex}.${i}`
                              )}
                            />
                            {i === valueRow.length - 1 && (
                              <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() =>
                                  handleRemoveValue(rowIndex, valueIndex)
                                }
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() =>
                            fields[rowIndex].value[valueIndex].push('') &&
                            fields[rowIndex].setValue(itemSpec.value)
                          }
                        >
                          Add Value
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleRemoveRow(rowIndex)}
                    >
                      Remove Row
                    </Button>
                  </div>
                ))}
                <Button size="xs" onClick={handleAddRow}>
                  Add Row
                </Button>
              </Td>
              <Td>
                <Button type="submit">Save</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </form>
  )
}

export default EditableTable
