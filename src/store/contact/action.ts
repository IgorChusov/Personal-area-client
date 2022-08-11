import axios from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from '../reducer'
import { ContactData } from './reduser'

// запрос отправлен
export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST'
export type AddContactsRequestAction = {
  type: typeof ADD_CONTACT_REQUEST
}
export const addContactsRequest: ActionCreator<AddContactsRequestAction> = () => ({
  type: ADD_CONTACT_REQUEST,
})

// запрос отправлен
export const GET_CONTACT_REQUEST = 'GET_CONTACT_REQUEST'
export type GetContactsRequestAction = {
  type: typeof GET_CONTACT_REQUEST
}
export const getContactsRequest: ActionCreator<GetContactsRequestAction> = () => ({
  type: GET_CONTACT_REQUEST,
})

// запрос смс успешен
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'
export type AddContactSuccessAction = {
  type: typeof ADD_CONTACT_SUCCESS
  data: ContactData 
}

export const addContactSuccess: ActionCreator<AddContactSuccessAction> = (data: ContactData) => ({
  type: ADD_CONTACT_SUCCESS,
  data,
})

export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS'
export type GetContactsSuccessAction = {
  type: typeof GET_CONTACTS_SUCCESS
  data: ContactData []
}

export const getContactsSuccess: ActionCreator<GetContactsSuccessAction> = (data: ContactData []) => ({
  type: GET_CONTACTS_SUCCESS,
  data,
})
// запрос с ошибкой
export const ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR'
export type AddContactsErrorAction = {
  type: typeof ADD_CONTACT_ERROR
  error: string
}

export const addContactsError: ActionCreator<AddContactsErrorAction> = (error: string) => ({
  type: ADD_CONTACT_ERROR,
  error,
})

export const AddContactAsync =
  (username: string, tel: string, idUser: number): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(addContactsRequest())

      try {
        const resp = await axios.post(`http://localhost:3004/contacts`, {
          idUser: idUser,
          name: username,
          tel: tel,
        })

        dispatch(addContactSuccess(resp.data))
        return resp.data || null
      } catch (error: any) {  
          dispatch(addContactsError(error.message))
      }
    }

export const GetContactsAsync =
  (idUser: number): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(getContactsRequest())

      try {
        const resp = await axios.get(`http://localhost:3004/contacts`, {
          params: {
            idUser: idUser
          }
        })

        dispatch(getContactsSuccess(resp.data))
        return resp.data || null
      } catch (error: any) {  
          dispatch(addContactsError(error.message))
      }
    }

export const DeleteContactsAsync =
(id: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(addContactsRequest())

    try {
      await axios.delete(`http://localhost:3004/contacts/${id}`)

      dispatch(getContactsSuccess(getState().contacts.data.filter((elem) => elem.id !== id)))
    } catch (error: any) {  
        dispatch(addContactsError(error.message))
    }
  }

export const ChangeContactsAsync =
(id: number, tel: string, name: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(addContactsRequest())

    try {
      await axios.patch(`http://localhost:3004/contacts/${id}`, {
        name: name, 
        tel: tel
      })
      
      const newData = getState().contacts.data.map((elem) => {
        if (elem.id === id) {
          elem.name = name
          elem.tel = tel
        }
        return elem
      })
      dispatch(getContactsSuccess(newData))
    } catch (error: any) {  
        dispatch(addContactsError(error.message))
    }
  }
