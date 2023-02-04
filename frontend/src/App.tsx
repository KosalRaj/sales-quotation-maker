import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ItemList from './components/ItemList'
import Navbar from './components/Navbar';
import Root from './Routes/Root'
import ErrorPage from './components/ErrorPage/ErrorPage'
import CreateQuotation from './components/CreateQuotation';
import QuotationList from './components/QuotationList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: 'items/',
    element: <ItemList />
  },
  {
    path: '/quotation/create',
    element: <CreateQuotation />
  },
  {
    path: '/quotations',
    element: <QuotationList />
  }
])

function App() {
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
