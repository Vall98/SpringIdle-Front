'use client'
import Link from 'next/link';
import { useAuthContext } from '../context/auth';

const Navbar = () => {
  const authContext = useAuthContext();

  return (
    <nav className="bg-[#22313f] p-4 absolute w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">SpringIdle</Link>
        </div>
        <ul className="md:flex space-x-6">
          <li>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          {authContext.isAuthenticated ? (
            <>
              <li>
                <Link href="/me" className="text-white hover:text-gray-300">Profile</Link>
              </li>
              <li>
                <button onClick={authContext.signout} className="text-white hover:text-gray-300">Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-white hover:text-gray-300">Sign In</Link>
              </li>
              <li>
                <Link href="/join" className="text-white hover:text-gray-300">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;