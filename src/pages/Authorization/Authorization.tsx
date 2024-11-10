import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { login } from '../../redux/slices/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Authorization.module.scss';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';

interface MyForm {
  name: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const Authorization = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyForm>({
    resolver: yupResolver(validationSchema),
  });

  const submit: SubmitHandler<MyForm> = (data) => {
    dispatch(login(data));

    if (isLoggedIn) {
      navigate('/');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  const submitError: SubmitErrorHandler<MyForm> = () => {
    setErrorMessage('There was an error submitting the form.');
    reset();
  };

  if (isLoggedIn) {
    navigate('/');
    return null;
  }

  return (
    <section className={styles.authorization}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(submit, submitError)}
      >
        <h1 className={styles.title}>Login Form</h1>

        <label className={styles.label}>
          <span>Name:</span>
          <input className={styles.input} type="text" {...register('name')} />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </label>

        <label className={styles.label}>
          <span>Password:</span>
          <input
            className={styles.input}
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </label>

        <button className={styles.btn}>Submit</button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </section>
  );
};

export default Authorization;
