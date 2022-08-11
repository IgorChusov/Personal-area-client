import axios, { AxiosError} from 'axios'
// import Cookies from "js-cookie";
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { LoginData } from '../logIn/reduser'

import { RootState } from '../reducer'

// запрос отправлен
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export type SignUpRequestAction = {
  type: typeof SIGNUP_REQUEST
}
export const signUpRequest: ActionCreator<SignUpRequestAction> = () => ({
  type: SIGNUP_REQUEST,
})

// запрос смс успешен
export const SIGNUP_REQUEST_SUCCESS = 'SIGNUP_REQUEST_SUCCESS'
export type SignUpRequestSuccessAction = {
  type: typeof SIGNUP_REQUEST_SUCCESS
  data: LoginData | null
}

export const signUpRequestSuccess: ActionCreator<SignUpRequestSuccessAction> = (data: LoginData | null) => ({
  type: SIGNUP_REQUEST_SUCCESS,
  data,
})

// запрос с ошибкой
export const SIGNUP_REQUEST_ERROR = 'SIGNUP_REQUEST_ERROR'
export type SignUpRequestErrorAction = {
  type: typeof SIGNUP_REQUEST_ERROR
  error: string
}

export const signUpRequestError: ActionCreator<SignUpRequestErrorAction> = (error: string) => ({
  type: SIGNUP_REQUEST_ERROR,
  error,
})

export const SignUpUserAsync =
  (username: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(signUpRequest())

      try {
        const resp = await axios.post(`http://localhost:3004/users`, {
          name: username,
          password: password
        })

        dispatch(signUpRequestSuccess(resp.data))
        return resp.data || null
      } catch (error: any) {  
          dispatch(signUpRequestError(error.message))
      }
    }
