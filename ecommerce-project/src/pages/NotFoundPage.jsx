import { Header } from '../components/Header';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <>
        <Header />
        <div>
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    </>
  );
}
