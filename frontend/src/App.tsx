import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import ItemList from './components/ItemList'
// import Navbar from './components/Navbar'
// import Root from './Routes/Root'
// import ErrorPage from './components/ErrorPage/ErrorPage'
// import CreateQuotation from './components/CreateQuotation'
// import QuotationList from './components/QuotationList'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Items from './pages/Items'
import Quotations from './pages/Quotations'
import CreateNewQuotation from './pages/CreateNewQuotation'
import Sidebar from './components/Sidebar'
import Drafts from './pages/Drafts'
import AddItemDialogue from './components/AddItemDialogue'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: 'items/',
//     element: <ItemList />
//   },
//   {
//     path: '/quotation/create',
//     element: <CreateQuotation />
//   },
//   {
//     path: '/quotations',
//     element: <QuotationList />
//   }
// ])

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

    // <div className="Ap">
    //   <Navbar />
    //   <RouterProvider router={router} />
    // </div>
  )
}

export default App
