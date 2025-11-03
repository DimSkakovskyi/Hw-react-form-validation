import type { ChangeEvent, FocusEvent } from 'react'

type InputFieldProps = {
  id: string
  name: string
  label: string
  type: string
  value: string
  error?: string
  isTouched?: boolean
  placeholder?: string
  autoComplete?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
}

const InputField = ({ id, name, label, type, value, error, isTouched, placeholder, autoComplete = 'off', onChange, onBlur }: InputFieldProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} onBlur={onBlur} />
      {isTouched && error && <div className='error'>{error}</div>}
    </div>
  )
}

export default InputField