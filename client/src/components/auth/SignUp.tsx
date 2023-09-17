import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/actions/userActions';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

function SignUp() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((s) => s.user);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const PostData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (details.password !== details.cpassword) {
      return toast.error('Passwords donot match');
    }
    dispatch(registerUser(details));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'CLEAR_ERRORS' });
    }
    if (isAuthenticated) {
      toast.success('Logged In');
      navigate('/');
    }
  }, [isAuthenticated, navigate, error, dispatch]);
  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <div className="bg-gray-50 shadow p-10 rounded-lg">
          <div className="text-3xl font-bold text-center px-5 sm:px-20">
            Registration
          </div>
          <div className="content">
            <form method="post" onSubmit={PostData}>
              <div className="sm:flex gap-5">
                <div>
                  <div className="flex flex-col my-5">
                    <span className="details">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={details.name}
                      onChange={handleInput}
                      className="p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col my-5">
                    <span className="details">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={details.email}
                      onChange={handleInput}
                      className="p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col my-5">
                    <span className="details">Password</span>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="Enter your password"
                      value={details.password}
                      onChange={handleInput}
                      className="p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col my-5">
                    <span className="details">Confirm Password</span>
                    <input
                      type="password"
                      name="cpassword"
                      autoComplete="off"
                      placeholder="Confirm your password"
                      value={details.cpassword}
                      onChange={handleInput}
                      className="p-2 rounded"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="button">
                <button
                  type="submit"
                  className="w-full p-2 bg-slate-700 rounded text-white my-3 hover:bg-slate-800 transition-all duration-500"
                >
                  Register
                </button>
              </div>
              <div className="signin_link">
                Already a member?{' '}
                <Link to="/login" className="hover:underline">
                  Sign-in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
