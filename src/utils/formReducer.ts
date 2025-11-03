type FormField = 'login' | 'password'

type FormState = {
  login: string
  password: string
  errors: Record<FormField, string>
  touched: Record<FormField, boolean>
}

const FormActionType = {
  SET_FIELD: 'SET_FIELD',
  SET_TOUCHED: 'SET_TOUCHED',
  VALIDATE_FIELD: 'VALIDATE_FIELD',
  VALIDATE_ALL: 'VALIDATE_ALL',
} as const

type FormAction =
  | { type: typeof FormActionType.SET_FIELD; field: FormField; value: string }
  | { type: typeof FormActionType.SET_TOUCHED; field: FormField }
  | { type: typeof FormActionType.VALIDATE_FIELD; field: FormField }
  | { type: typeof FormActionType.VALIDATE_ALL }

const initialState: FormState = {
  login: '',
  password: '',
  errors: {
    login: '',
    password: '',
  },
  touched: {
    login: false,
    password: false,
  },
}

const validationRules: Record<FormField, (value: string) => string> = {
  login: (value) => {
    if (!value.trim()) return 'Login is required'
    if (value.length < 3 || value.length > 30)
      return 'Login must be between 3 and 30 characters'
    return ''
  },
  password: (value) => {
    if (!value.trim()) return 'Password is required'
    if (value.length < 5 || value.length > 25)
      return 'Password must be between 5 and 25 characters'
    return ''
  },
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD': {
      return {
        ...state,
        [action.field]: action.value,
      }
    }

    case 'SET_TOUCHED': {
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      }
    }

    case 'VALIDATE_FIELD': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: validationRules[action.field](state[action.field]),
        },
      }
    }

    case 'VALIDATE_ALL': {
      return {
        ...state,
        errors: {
          login: validationRules.login(state.login),
          password: validationRules.password(state.password),
        },
      }
    }

      default:
        return state
  }
}

export type { FormState, FormAction, FormField }
export { formReducer, initialState}
export { FormActionType }