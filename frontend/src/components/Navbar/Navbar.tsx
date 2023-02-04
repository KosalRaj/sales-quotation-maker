import { Heading, Image } from '@chakra-ui/react'
import Logo from '../../assets/images/logo.png'
import './Navbar.style.scss'

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <Image src={Logo} alt='Logo' objectFit='contain' h='100px'/>
      </div>
      <Heading as='h1' className="page-title">
        Sales Quotation Maker
      </Heading>
    </header>
  )
}

export default Navbar