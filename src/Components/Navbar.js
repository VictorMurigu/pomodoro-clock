import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="logo" src="./images/vm1.jpg" />
      <div className="desktopMenu">
        <Link className="desktopMenuList">Home</Link>
        <Link className="desktopMenuList">About</Link>
        <Link className="desktopMenuList">Clients</Link>
        <Link className="desktopMenuList">Portfolio</Link>
      </div>
      <button className="desktopMenuBtn">
<img className='desktopMenuImg' alt="" src="./images/contact1.png"/>Contact me</button>
    </nav>
  )
}

export default Navbar