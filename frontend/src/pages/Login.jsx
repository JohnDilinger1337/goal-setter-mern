import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, rest } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { set } from 'mongoose';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFromData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  useEffect(() => {
    console.log(isError, isSuccess, message);
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');

      if (isLoginSuccessful) {
        setTimeout(() => {
          toast.success('You have successfully logged in!');
        }, 500); // debounce the toast message for 500ms
      }
    }
    dispatch(rest());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFromData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoginSuccessful) {
    toast.success('You have successfully logged in!');
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Please enter your email!"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Please enter password!"
              onChange={onChange}
            />
          </div>
          <div className="from-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
