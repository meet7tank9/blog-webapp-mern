import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer_categories">
        <li><Link to="/post/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/post/categories/Business">Business</Link></li>
        <li><Link to="/post/categories/Entertainment">Entertainment</Link></li>
        <li><Link to="/post/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/post/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/post/categories/Agriculture">Agriculture</Link></li>
      </ul>
      <div className="footer_copyright"><small>All Rights Reserved &copy; Copyright, 2024</small></div>
    </footer>
  )
}

export default Footer