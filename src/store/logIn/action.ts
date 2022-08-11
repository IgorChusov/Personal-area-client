import axios, { AxiosError} from 'axios'
// import Cookies from "js-cookie";
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from '../reducer'
import { LoginData } from './reduser'

// запрос отправлен
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export type LogInRequestAction = {
  type: typeof LOGIN_REQUEST
}
export const logInRequest: ActionCreator<LogInRequestAction> = () => ({
  type: LOGIN_REQUEST,
})

// запрос смс успешен
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export type LogInRequestSuccessAction = {
  type: typeof LOGIN_REQUEST_SUCCESS
  data: LoginData | null
}

export const logInRequestSuccess: ActionCreator<LogInRequestSuccessAction> = (data: LoginData | null) => ({
  type: LOGIN_REQUEST_SUCCESS,
  data
})

// запрос с ошибкой
export const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR'
export type LogInRequestErrorAction = {
  type: typeof LOGIN_REQUEST_ERROR
  error: string
}

export const logInRequestError: ActionCreator<LogInRequestErrorAction> = (error: string) => ({
  type: LOGIN_REQUEST_ERROR,
  error,
})

export const LoginUserAsync =
  (name: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(logInRequest())

      try {
        const resp = await axios.get(`http://localhost:3004/users`, {
          params: {
            name: name,
            password: password,
          }
        })

        dispatch(logInRequestSuccess(resp.data[0] || null))
        return resp.data[0] || null
      } catch (error: any) {
         dispatch(logInRequestError(error.message))
      }
    }
