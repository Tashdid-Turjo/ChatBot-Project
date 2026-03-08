import { Header } from '../components/Header';
import './NotFoundPage.css';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <>
        <title>404 Page Not Found</title>
        <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
        <Header />
        <div className="not-found-message">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    </>
  );
}
