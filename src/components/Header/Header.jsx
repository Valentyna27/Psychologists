import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import css from './Header.module.css';

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isRefreshing = useSelector(selectRefreshing);

  // if (isRefreshing) return <Loader />;

  return (
    <header className={css.header}>
      <Link to="/" className={css.link}>
        <p className={css.logo}>
          <span className={css.logoColor}>psychologists.</span> services
        </p>
      </Link>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
