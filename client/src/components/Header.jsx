import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/avatar1.jpg'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const Header = () => {
  const [isNavShowing, setisNavShowing] = useState(window.innerWidth > 800 ? true : false)

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setisNavShowing(false)
    } else {
      setisNavShowing(true)
    }
  }

  return (
    <nav>
      <div className="container nav_container">
        <Link to='/' className='nav_logo'>
          <img src={Logo} alt="" />
        </Link>

        {
          isNavShowing &&
          <ul className="nav_menu">
            <li><Link to="/profile/dfds" onClick={closeNavHandler}>meet tank</Link></li>
            <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
            <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
            <li><Link to="/logout" onClick={closeNavHandler}>logout</Link></li>
          </ul>}
        <button className="nav_toggle-btn" onClick={() => setisNavShowing(!isNavShowing)}>
          {
            isNavShowing ? <AiOutlineClose /> : <FaBars />
          }
        </button>
      </div>
    </nav>
  )
}

export default Header