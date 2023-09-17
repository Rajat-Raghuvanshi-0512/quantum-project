import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error, loading } = useAppSelector((s) => s.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginMe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'CLEAR_ERRORS' });
    }
    if (loading === false && isAuthenticated === true) {
      toast.success('Logged In');
      navigate('/');
    }
  }, [isAuthenticated, navigate, error, dispatch, loading]);

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="dark:bg-slate-700 dark:text-white p-10 rounded-lg bg-gray-50 drop-shadow">
        <h1 className="text-center text-3xl font-bold">Log-In</h1>
        <form method="post" onSubmit={LoginMe}>
          <div className="w-full mt-5">
            <label>Email</label>
            <input
              type="email"
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full rounded p-2 dark:text-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full mt-5">
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full rounded p-2 dark:text-black"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 dark:bg-white dark:text-black rounded py-2 my-3 dark:hover:bg-gray-200 transition-all duration-500 bg-slate-700 text-white hover:bg-slate-800"
          >
            Login
          </button>
          <div className="text-center w-full">
            Not a member?{' '}
            <Link to="/signup" className="hover:underline">
              Sign-up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
