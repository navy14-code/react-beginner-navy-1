import { Link, NavLink } from 'react-router-dom';
import'./header.css';

const Header = () => {
    return(
        <ul>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/user">User</NavLink></li>
  <li><NavLink to="/products">Products</NavLink></li>
  <li><NavLink to="/login">Login</NavLink></li>
</ul>
    );
}

export default Header;