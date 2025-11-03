import { Formik } from 'formik';
import { Form } from 'formik';
import { object, string } from 'yup';
import FormField from './FormField';

const validationSchema = object({
  login: string().required('Login is required').min(3, 'Login must be at least 3 chracters').max(20, 'Login must be less than 20 characters'),
  password: string().required('Password is required').min(6, 'Password must be at least 6 characters').max(32, 'Password must be less than 32 characters'),
})

const initialValues = {
  login: '',
  password: '',
}

const handleSubmit = (values: typeof initialValues) => {
  console.log(values)
}

const randomSuffix = () => Math.random().toString(36).substring(2, 15);

const LoginForm = () => {

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}
      validateOnChange={true} validateOnMount={true}>
      {({ isValid, errors }) => {
        return (
          <Form>
            <FormField id={`login-${randomSuffix}`} label='login' name='login' successMessage='Login is valid' placeholder='Enter your login' error={errors.login} autoComplete='username'></FormField>
            <FormField
              id={`password-${randomSuffix}`}
              label='Password'
              name='password'
              type='password'
              placeholder='Enter your password'
              autoComplete='new-password'
              successMessage='Password is valid'
              error={errors.password}
            >

            </FormField>
            <button type="submit" disabled={!isValid}>Login</button>
          </Form>
        )
      }}
    </Formik >
  );
};

export default LoginForm;
