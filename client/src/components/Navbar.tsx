import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, useModal } from '../misc/custom-hooks';
import { logoutUser } from '../redux/actions/userActions';
import Drawer from './Drawer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((s) => s.user);
  const { isOpen, closeModal, openModal } = useModal();
  const isTablet = useMediaQuery('(max-width:700px)');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    closeModal();
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <>
      <nav className="nav ">
        <div className="flex justify-between items-center px-10 md:px-20 py-5 dark:bg-slate-800 dark:text-white">
          {isTablet ? (
            <div className="flex justify-between w-full">
              <Link className="text-2xl font-bold" to="/">
                Notes Collector
              </Link>
              <button onClick={openModal}>
                <GiHamburgerMenu className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <Link className="text-2xl font-bold" to="/">
                  Notes Collector
                </Link>
                <ul className="flex gap-5 ml-10">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === '/addnote'
                              ? 'underline underline-offset-8'
                              : ''
                          } py-3`}
                          to="/addnote"
                        >
                          Add Note
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === '/mynotes'
                              ? 'underline underline-offset-8'
                              : ''
                          } py-3`}
                          to="/mynotes"
                        >
                          My Notes
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === '/'
                            ? 'underline underline-offset-8'
                            : ''
                        } py-3`}
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                {!isAuthenticated ? (
                  <ul className="flex gap-5">
                    <li className="nav-item ">
                      <Link
                        className={`nav-link ${
                          location.pathname === '/login' ? 'text-blue-500' : ''
                        } py-3`}
                        aria-current="page"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === '/signup' ? 'text-blue-500' : ''
                        } py-3`}
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex items-center gap-5">
                    <li className="nav-item ">
                      <Link
                        className="nav-link bg-red-400 p-2 rounded text-white hover:bg-red-600 transform duration-500"
                        aria-current="page"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <Drawer isOpen={isOpen} onClose={closeModal} title="Dashboard">
        <div className="flex items-center">
          <ul className="flex flex-col items-center justify-center gap-10 w-full">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/addnote'
                        ? 'bg-slate-500  text-white rounded  px-4'
                        : ''
                    } py-3 text-2xl`}
                    to="/addnote"
                  >
                    Add Note
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/mynotes'
                        ? 'bg-slate-500 text-white rounded  px-4'
                        : ''
                    } py-3 text-2xl`}
                    to="/mynotes"
                  >
                    My Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/profile'
                        ? 'bg-slate-500 text-white rounded  px-4'
                        : ''
                    } py-3 text-2xl`}
                    to="/profile"
                  >
                    Profile{' '}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/'
                      ? 'bg-slate-500 w-full text-white rounded  px-4'
                      : ''
                  } py-3 text-2xl`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {!isAuthenticated ? (
            <ul className="flex gap-5 justify-center bottom-5 absolute w-full">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${
                    location.pathname === '/login' ? 'text-blue-500' : ''
                  } py-3`}
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/signup' ? 'text-blue-500' : ''
                  } py-3`}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </ul>
          ) : (
            <button
              className="bottom-5 absolute w-full bg-red-400 p-2 rounded text-white hover:bg-red-600 transform duration-500 mx-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </Drawer>
    </>
  );
}
