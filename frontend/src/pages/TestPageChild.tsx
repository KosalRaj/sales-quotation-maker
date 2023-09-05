import { useState } from 'react'
import { IProps } from './TestPage'

interface ChildProps {
  addItem: (item: IProps) => void
  updateItem: (index: number, updateItem: IProps) => void
}

const TestPageChild = (props: ChildProps) => {
  const [item, setItem] = useState({ name: '', model: '', price: 0 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.addItem(item)
    setItem({ name: '', model: '', price: 0 })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Item Name"
      />
      <input
        type="text"
        name="model"
        value={item.model}
        onChange={handleChange}
        placeholder="Item Model"
      />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Add Item</button>
    </form>
  )
}

export default TestPageChild
