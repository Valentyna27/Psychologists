import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <h1 className={css.code}>404</h1>
        <h2 className={css.title}>Page not found</h2>
        <div className={css.actions}>
          <Link to="/" className={css.linkHome}>
            Return to Home
          </Link>
          <Link to="/psychologists" className={css.linkBrowse}>
            Browse Psychologists
          </Link>
        </div>
      </div>
    </div>
  );
}
