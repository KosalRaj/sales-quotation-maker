import { Image } from '@chakra-ui/react'
import Logo from '../../assets/images/logo.png'
import './Sidebar.styles.scss'
import SideMenus from './SideMenus'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="logo">
          <Image src={Logo} alt="Laboratory Trade Concern" />
        </div>
      </div>
      <SideMenus />
      <div className="sidebar__footer"></div>
    </div>
  )
}

export default Sidebar
