import { Image } from '@chakra-ui/react'
import {
  FiEdit3,
  FiFile,
  FiFilePlus,
  FiHome,
  FiLayers,
  FiUser
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import './Sidebar.styles.scss'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const Sidebar = ({ children }: Props) => {
  const menuItems = [
    {
      path: '/',
      name: 'Home',
      icon: <FiHome />
    },
    {
      path: '/quotations',
      name: 'All Quotaions',
      icon: <FiFile />
    },
    {
      path: '/new-quotation',
      name: 'Create New Quotation',
      icon: <FiFilePlus />
    },
    {
      path: '/items',
      name: 'Sales Items',
      icon: <FiLayers />
    },
    {
      path: '/customers',
      name: 'Customers',
      icon: <FiUser />
    },
    {
      path: '/drafts',
      name: 'Drafts',
      icon: <FiEdit3 />
    }
  ]

  return (
    <div className="main-wrapper">
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="logo">
            <Image src={Logo} alt="Laboratory Trade Concern" />
          </div>
        </div>
        <div className="sidebar__body">
          {menuItems.map((menuItem, index) => (
            <NavLink to={menuItem.path} key={index} className="link__item">
              <div className="link__icon">{menuItem.icon}</div>
              <div className="link__text">{menuItem.name}</div>
            </NavLink>
          ))}
        </div>
        <div className="sidebar__footer"></div>
      </div>
      <main className="page-content">{children}</main>
    </div>
  )
}

export default Sidebar
