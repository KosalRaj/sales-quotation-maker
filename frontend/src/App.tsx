import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Items from './pages/Items'
import Quotations from './pages/Quotations'
import CreateNewQuotation from './pages/CreateNewQuotation'
import Sidebar from './components/Sidebar'
import Drafts from './pages/Drafts'
import AddItemDialogue from './components/AddItemDialogue'

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<Items />} />

          <Route path="/quotations" element={<Quotations />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/new-quotation" element={<CreateNewQuotation />} />
          <Route path="/drafts" element={<Drafts />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
