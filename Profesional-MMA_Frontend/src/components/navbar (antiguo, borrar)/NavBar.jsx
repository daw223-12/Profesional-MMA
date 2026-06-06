import './NavBar.css'
import Profile from '../profile/Profile'
import { NavLink } from 'react-router'

function NavBar() {

  return (
    <nav>
      <div id="nav-logo">
        <NavLink href="/">
          <img src="/assets/logo.png" alt="Logo" />
          <h1>Profesional MMA</h1>
        </NavLink>
      </div>
      <div id="nav-links">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/fighters">Fighters</NavLink>
        <NavLink href="/events">Events</NavLink>
        <NavLink to="/favorites">Favoritos</NavLink>
      </div>
      <Profile />
    </nav>
  )
}

export default NavBar