import { type ChangeEvent, useReducer } from 'react';
import { type FormEvent } from 'react';
import InputField from './InputField';
import { formReducer, initialState, type FormField, } from '../utils/formReducer';
import { type FocusEvent } from 'react';
import { FormActionType } from '../utils/formReducer';

const LoginForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: FormField; value: string }

    dispatch({ type: FormActionType.SET_FIELD, field: name, value })

    if (state.touched[name]) {
      dispatch({ type: FormActionType.VALIDATE_FIELD, field: name })
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as { name: FormField }
    dispatch({ type: FormActionType.SET_TOUCHED, field: name })
    dispatch({ type: FormActionType.VALIDATE_FIELD, field: name })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: FormActionType.VALIDATE_ALL })

    const hasErrors = Object.values(state.errors).some((error) => error !== '')

    if (!hasErrors) {
      console.log('Form has errors:', state.errors)
      return
    }
    console.log('Form submitted successfully with data:', state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="login"
        name="login"
        label="Login"
        type="text"
        value={state.login}
        error={state.errors.login}
        isTouched={state.touched.login}
        placeholder='Enter your login'
        autoComplete='username'
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={state.password}
        error={state.errors.password}
        isTouched={state.touched.password}
        placeholder='Enter your password'
        autoComplete='current-password'
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
