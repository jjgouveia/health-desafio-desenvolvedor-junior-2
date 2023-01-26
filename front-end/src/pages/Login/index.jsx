/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../routes/utils/auth.routes';

import './style.css';

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const redirect = () => {
    navigate('/home');
  };

  const toastMessage = (message, type) => {
    toast?.[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      closeButton: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: 'colored',
    });
  };

  const onSubmit = async (data) => {
    try {
      const request = await login(data);
      if (request.status === 200) {
        toastMessage(`${request.data.message}`, 'success');
        localStorage.setItem('user', JSON.stringify({
          nome: request.data.nome,
          email: request.data.email,
          categoria: request.data.categoria,
        }));
        setTimeout(() => {
          redirect();
        }, 5000);
      }
    } catch (error) {
      toastMessage('Ops! Algo de errado não está certo!', 'error');
    }
  };
  return (

    <div className="mb-3 login-container">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <div className="mb-3">
          <label htmlFor="email-login" className="form-label" />
          Email
          <input
            className="form-control"
            type="email"
            id="email-login"
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <div id="emailHelp" className="form-text">Nunca compartilharemos o seu email</div>
          {errors.email && errors.email.message}
        </div>
        <div className="mb-3">
          <label htmlFor="form-control" className="form-label" />
          Password
          <input
            type="password"
            className="form-control"
            id=""
            {...register('senha', { required: true })}
          />

          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long.
          </div>

          {errors.username && errors.username.message}
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;