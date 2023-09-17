import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { getUser } from './redux/actions/userActions';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AddNote from './components/notes/AddNote';
import MyNotes from './components/notes/MyNotes';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useAppDispatch } from './redux/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
