import { NavLink } from 'react-router-dom'
import {
  FiEdit3,
  FiFile,
  FiFilePlus,
  FiHome,
  FiLayers,
  FiTablet,
  FiUser
} from 'react-icons/fi'

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
  },
  {
    path: '/test',
    name: 'Test',
    icon: <FiTablet />
  }
]

const SideMenus = () => {
  return (
    <div className="sidebar__body">
      {menuItems.map((menuItem, index) => (
        <NavLink to={menuItem.path} key={index} className="link__item">
          <div className="link__icon">{menuItem.icon}</div>
          <div className="link__text">{menuItem.name}</div>
        </NavLink>
      ))}
    </div>
  )
}

export default SideMenus
