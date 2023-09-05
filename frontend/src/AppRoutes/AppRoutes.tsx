import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Items from '../pages/Items'
import Quotations from '../pages/Quotations'
import CreateNewQuotation from '../pages/CreateNewQuotation'
import Drafts from '../pages/Drafts'
import SharedLayout from '../pages/SharedLayout'
import ErrorPage from '../components/ErrorPage'
import EditableTable from '../pages/EditableTable'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="items" element={<Items />} />
        <Route path="quotations" element={<Quotations />} />
        <Route path="customers" element={<Customers />} />
        <Route path="new-quotation" element={<CreateNewQuotation />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="test" element={<EditableTable />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
