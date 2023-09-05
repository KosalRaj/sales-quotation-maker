import { Heading } from '@chakra-ui/react'
import CustomerList from '../components/CustomerList'
import PageWrapper from '../components/PageWrapper'

const Customers = () => {
  return (
    <PageWrapper>
      <Heading as="h1" textColor="#ffffff" mb="40px">
        Customers
      </Heading>

      <CustomerList />
    </PageWrapper>
  )
}

export default Customers
