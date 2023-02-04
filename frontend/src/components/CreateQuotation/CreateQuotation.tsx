import {
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IQuotation } from '../../models/quotation'
import * as QuotationApi from '../../network/quotationApi'

const CreateQuotation = () => {
  const [lastQuotationId, setLastQuotationId] = useState('')

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

  return (
    <Container maxW="container.lg" my={8}>
      <Heading as="h3" fontSize="x-large" my={4}>
        Quotation
      </Heading>
      <VStack spacing={4}>
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
              Quotation Number:
            </FormLabel>
            <Editable
              defaultValue={formattedDate}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Flex>
        </FormControl>
      </VStack>
    </Container>
  )
}

export default CreateQuotation
