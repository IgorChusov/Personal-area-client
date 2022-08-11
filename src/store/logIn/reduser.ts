import { Reducer } from 'react'

import {
  LogInRequestAction,
  LogInRequestErrorAction,
  LogInRequestSuccessAction,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
} from './action'

type LoginActions = 
LogInRequestAction 
  | LogInRequestSuccessAction 
  | LogInRequestErrorAction 
;

export type LoginState = {
  loading: boolean
  error: string
  data: LoginData | null
}

export interface LoginData {
  name: string, 
  password: string, 
  id: number
}

export const loginReducer: Reducer<LoginState, LoginActions> = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      }
    default:
      return state
  }
}
