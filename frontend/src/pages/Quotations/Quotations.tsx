import { Button, Flex, Heading } from '@chakra-ui/react'
import { FiFilePlus } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import QuotationList from '../../components/QuotationList'

const Quotations = () => {
  return (
    <PageWrapper>
      <Heading as="h1" textColor="#ffffff" mb="40px">
        Quotations
      </Heading>

      <Flex mb="40px">
        <NavLink to="/new-quotation">
          <Button className="primary-white" size="lg" leftIcon={<FiFilePlus />}>
            Create New Quotation
          </Button>
        </NavLink>
      </Flex>

      <QuotationList />
    </PageWrapper>
  )
}

export default Quotations
