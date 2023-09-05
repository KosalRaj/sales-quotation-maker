import { useState } from 'react'
import TestPageChild from './TestPageChild'

export interface IProps {
  name: string
  model: string
  price: number
}

const TestPage = () => {
  const data = [
    {
      name: 'Item1',
      model: 'sdaf',
      price: 456
    },
    {
      name: 'Item2',
      model: 'sdag',
      price: 46
    },
    {
      name: 'Item3',
      model: 'sdah',
      price: 56
    }
  ]
  const [itemList, setItemList] = useState<IProps[]>([...data])

  const addItem = (item: IProps) => {
    setItemList([...itemList, item])
  }

  const updateItem = (index: number, updatedItem: IProps) => {
    setItemList(
      itemList.map((item, i) => {
        return i === index ? updatedItem : item
      })
    )
  }

  const deleteItem = (deleteIndex: number) => {
    setItemList(
      itemList.filter((item: IProps, index: number) => index !== deleteIndex)
    )
  }

  return (
    <div>
      <TestPageChild addItem={addItem} updateItem={updateItem} />
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Model</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.model}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => updateItem(index, item)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TestPage
