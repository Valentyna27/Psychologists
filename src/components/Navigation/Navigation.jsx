import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
        to="/psychologists"
      >
        Psychologists
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
          to="/favorites"
        >
          Favorites
        </NavLink>
      )}
    </nav>
  );
}
