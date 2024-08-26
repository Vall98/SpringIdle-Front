'use client'
import Link from 'next/link';
import { useAuthContext } from '../context/auth';

const Navbar = () => {
  const authContext = useAuthContext();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {authContext.isAuthenticated ? (
          <>
            <li>
              <button onClick={authContext.signout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/join">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;