import { Reducer } from 'react'
import { LoginData } from '../logIn/reduser';

import { SignUpRequestAction, SignUpRequestErrorAction, SignUpRequestSuccessAction, SIGNUP_REQUEST, SIGNUP_REQUEST_ERROR, SIGNUP_REQUEST_SUCCESS } from './action'

type RegisterActions = 
  SignUpRequestAction 
  | SignUpRequestErrorAction 
  | SignUpRequestSuccessAction
;

export type LoginState = {
  loading: boolean
  error: string
  data: LoginData | null
}

export const registerReducer: Reducer<LoginState, RegisterActions> = (state, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SIGNUP_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: '',
      }
    default:
      return state
  }
}
