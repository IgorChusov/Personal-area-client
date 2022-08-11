import { Reducer } from 'react'

import { AddContactsErrorAction, AddContactsRequestAction,  AddContactSuccessAction, ADD_CONTACT_ERROR, 
  ADD_CONTACT_REQUEST, 
  ADD_CONTACT_SUCCESS,
  GetContactsSuccessAction,
  GET_CONTACTS_SUCCESS, 
  } from './action'

type ContactsActions = 
  AddContactsRequestAction 
  | AddContactsErrorAction 
  | AddContactSuccessAction
  | GetContactsSuccessAction
;

export type ContactsState = {
  loading: boolean
  error: string
  data: ContactData []
}

export type ContactData = {
  idUser: number,
  name: string,
  tel: string,
  id: number
} 

export const contactReducer: Reducer<ContactsState, ContactsActions> = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADD_CONTACT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.data],
        loading: false,
        error: '',
      }
    case GET_CONTACTS_SUCCESS:
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
