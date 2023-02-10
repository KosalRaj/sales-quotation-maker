import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface ISearchString {
  search: string
}

const ItemSearch = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ISearchString>()

  return (
    <div>
      <form id="searchLineItem">
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
    </div>
  )
}

export default ItemSearch
