import'./header.css';

const Header = () => {
    return(
        <ul>
  <li><a class="active" href="#home">Home</a></li>
  <li><a href="/user">User</a></li>
  <li><a href="/products">Products</a></li>
  <li><a href="/login">Login</a></li>
</ul>
    );
}

export default Header;