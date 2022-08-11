import { Reducer } from 'redux'
import { ADD_CONTACT_ERROR, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, GET_CONTACTS_SUCCESS } from './contact/action'
import { contactReducer, ContactsState } from './contact/reduser'
import { LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS } from './logIn/action'
import { LoginData, loginReducer, LoginState } from './logIn/reduser'
import { SIGNUP_REQUEST, SIGNUP_REQUEST_ERROR, SIGNUP_REQUEST_SUCCESS } from './signUp/action'
import { registerReducer } from './signUp/reduser'

export type RootState = {
  me: LoginState,
  contacts: ContactsState,
}
const initialState: RootState = {
  me: {
    loading: false,
    error: '',
    data: null
  },
  contacts: {
    loading: false,
    error: '',
    data: []
  }

}

export const rootReducer: Reducer<RootState > = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNUP_REQUEST_ERROR:
    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        me: registerReducer(state.me, action),
      }
      case LOGIN_REQUEST:
      case LOGIN_REQUEST_ERROR:
      case LOGIN_REQUEST_SUCCESS:
        return {
          ...state,
          me: loginReducer(state.me, action),
        }
      case ADD_CONTACT_REQUEST:
      case ADD_CONTACT_ERROR:
      case ADD_CONTACT_SUCCESS:
      case GET_CONTACTS_SUCCESS:
        return {
          ...state,
          contacts: contactReducer(state.contacts, action),
        }
    default:
      return state
  }
}
