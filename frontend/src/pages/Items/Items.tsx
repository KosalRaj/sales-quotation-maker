import { Heading } from '@chakra-ui/react'
import ItemList from '../../components/ItemList'
import PageWrapper from '../../components/PageWrapper'

const Items = () => {
  return (
    <PageWrapper>
      <Heading as="h1" textColor="#ffffff" mb="2.5rem">
        All Items
      </Heading>
      <ItemList />
    </PageWrapper>
  )
}

export default Items
