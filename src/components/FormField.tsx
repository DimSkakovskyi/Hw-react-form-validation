import { Field, ErrorMessage } from 'formik';
import SuccessMessage from './SuccessMessage';

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
  successMessage: string;
};

const FormField = ({ id, name, label, type = "text", placeholder = "Enter your value", autoComplete = "off", error = '', successMessage }: FormFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <Field
        id={id} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      <ErrorMessage name={name} component="div" className="error-text" />
      <SuccessMessage message={successMessage} error={error} />
    </div>
  )
};

export default FormField;