import { Heading, Button } from '@chakra-ui/react'
import { FiFilePlus, FiPlusSquare } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import AddItemDialogue from '../../components/AddItemDialogue'
import PageWrapper from '../../components/PageWrapper'
import './Dashboard.styles.scss'

const Dashboard = () => {
  return (
    <PageWrapper>
      <Heading as="h1" className="heading" textColor="#ffffff">
        Sales Quotaion Maker
      </Heading>
      <div className="cta-group">
        <NavLink to="/new-quotation">
          <Button className="primary-white" size="lg" leftIcon={<FiFilePlus />}>
            Create New Quotation
          </Button>
        </NavLink>
        {/* <Button */}
        {/*   className="secondary-white" */}
        {/*   variant="outline" */}
        {/*   size="lg" */}
        {/*   leftIcon={<FiPlusSquare />} */}
        {/* > */}
        {/*   Add New Item */}
        {/* </Button> */}

        <AddItemDialogue
          onItemSaved={() => {
            return
          }}
          buttonType="secondary-white"
        />
      </div>
    </PageWrapper>
  )
}

export default Dashboard
