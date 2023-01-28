import { useState, useEffect } from 'react'
import { IItem } from './models/lineItem'
import './App.css'

function App() {
  const [quotations, setQuotations] = useState<IItem[]>([])

  useEffect(() => {
    async function loadQuotations() {
      try {
        const response = await fetch('/proxy/api/items', {
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
