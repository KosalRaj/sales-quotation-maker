import { Box, Heading } from '@chakra-ui/react'
import CreateQuotation from '../../components/CreateQuotation'
import PageWrapper from '../../components/PageWrapper'

const CreateNewQuotation = () => {
  return (
    <PageWrapper>
      <Heading as="h1" mb="40px" textColor="#ffffff">
        New Quotation
      </Heading>

      <Box className="table-wrapper">
        <CreateQuotation />
      </Box>
    </PageWrapper>
  )
}

export default CreateNewQuotation
