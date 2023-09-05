import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ITableItem } from '../CreateQuotation/CreateQuotation'
import * as ItemsApi from '../../network/itemsApi'
import { IItem } from '../../models/lineItem'
import { useState } from 'react'

interface ISearchString {
  search: string
}

interface ISearchItem {
  addLineItem: (item: ITableItem) => void
}

const ItemSearch = (props: ISearchItem) => {
  const [searchItems, setSearchItems] = useState<IItem[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ISearchString>()

  async function onSubmit(input: ISearchString) {
    try {
      const itemResponse = await ItemsApi.findItemByName(input.search)
      console.log(itemResponse)
      setSearchItems([...itemResponse])
      console.log(searchItems)
      reset()
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <div>
      <form id="searchLineItem" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="1rem">
          <FormControl>
            <Input
              type="search"
              id="search"
              placeholder="Search by name or model"
              {...register('search', {
                required: 'Search string should be more than 4 letter'
              })}
            />
            <FormErrorMessage>
              {errors.search && errors.search?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            form="searchLineItem"
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Find
          </Button>
        </Flex>
      </form>
      <UnorderedList>
        {searchItems.map((item) => (
          <ListItem key={item._id}>
            {item.itemName}
            <Button
              onClick={() => props.addLineItem({ ...item, itemQuantity: 0 })}
            >
              Add
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  )
}

export default ItemSearch
