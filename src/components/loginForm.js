import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';

export const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = async (data) => {
    try {
      // Make sure to replace `YOUR_API_URL` with the actual URL.
      const response = await axios.post('YOUR_API_URL/api/login', data);
      console.log(response.data);
      // Perform actions with the response data, like storing auth tokens
      // localStorage.setItem('token', response.data.token);
      // login() should be used here if it sets the user state in your context
      login(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = 'ელ-ფოსტა აუცილებელი ველია.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = 'არასწორი ელ-ფოსტა. მაგ. example@email.com';
      }

      if (!data.password) {
        errors.password = 'პაროლი აუცილებელი ველია.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleLogin(data);
    },
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid w-full">
      <div className="mb-8">
        <span className="p-float-label p-input-icon-right">
          <i className="pi pi-envelope" />
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={classNames({ 'p-invalid': isFormFieldValid('email') })}
          />
          <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>
            ელ-ფოსტა*
          </label>
        </span>
        {getFormErrorMessage('email')}
      </div>
      <div className="mb-8">
        <span className="p-float-label">
          <Password
            id="password"
            name="password"
            feedback={false}
            value={formik.values.password}
            onChange={formik.handleChange}
            toggleMask
            className={classNames({ 'p-invalid': isFormFieldValid('password') })}
          />
          <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>
            პაროლი*
          </label>
        </span>
        {getFormErrorMessage('password')}
      </div>
      <Button type="submit" label="ავტორიზაცია" className="primary-color py-3 text-blue-950" />
    </form>
  );
};

export default LoginForm;
