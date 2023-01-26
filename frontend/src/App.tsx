import { useState, useEffect } from 'react'
import { IQuotation } from './models/quotation'
import './App.css'

function App() {
  const [quotations, setQuotations] = useState<IQuotation[]>([])

  useEffect(() => {
    async function loadQuotations() {
      try {
        const response = await fetch('/proxy/api/quotations', {
          method: 'GET'
        })

        const quotations = await response.json()

        setQuotations(quotations)
      } catch (error) {
        console.log(error)
      }
    }

    loadQuotations()
  }, [])

  return <div className="App">{JSON.stringify(quotations)}</div>
}

export default App
