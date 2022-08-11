import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddContactAsync, GetContactsAsync } from '../../store/contact/action';
import { ContactData, ContactsState } from '../../store/contact/reduser';
import { LoginState } from '../../store/logIn/reduser';
import { RootState } from '../../store/reducer';
import { Text } from '../universalComponents/Text';
import { Item } from './components/Item';
import styles from './contacts.css';

export function Contacts() {
  const dispatch = useDispatch()
  const token = useSelector<RootState, LoginState>((state) => state.me)
  const contacts = useSelector<RootState, ContactsState>((state) => state.contacts)

  const [filterContacts, setFilterContacts] = useState<ContactData[]>([])
  const [valueTelNew, setValueTelNew] = useState('')
  const [valueNew, setValueNew] = useState('')
  const [valueSearch, setValueSearch] = useState('')


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(valueNew.length === 0 ||valueTelNew.length === 0 || !token.data?.id) return

    dispatch(AddContactAsync(valueNew, valueTelNew, token.data?.id))

    setValueNew('')
    setValueTelNew('')
  }

  const onSearch = () => {
    if(valueSearch.length === 0) {
      setFilterContacts(contacts.data)
      return
    }
    const data = contacts.data.filter((elem) => elem.name.includes(valueSearch) || elem.tel.includes(valueSearch))
    setFilterContacts(data)
  }

  const onBreak = () => {
    setFilterContacts(contacts.data)
  }

  useEffect(()=>{
    if(!token.data?.id) return

    dispatch(GetContactsAsync(token.data?.id))
  }, [token.data?.id])

  useEffect(()=> {
    onSearch()
  }, [contacts])

  return (
    <div className={styles.container}>
      <Text className={styles.title} size={20} As='h1'>Contacts</Text>
      <form onSubmit={(e)=> onSubmit(e)} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Name</label>
          <input 
            type="text"
            value={valueNew}
            onChange = {(e)=> setValueNew(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Telefone</label>
          <input 
            type="text"
            value={valueTelNew}
            onChange = {(e)=> setValueTelNew(e.target.value)}
          />
        </div>
        <button className={styles.button}>Add new</button>
      </form>
      <div className={styles.searchContainer}>
        <form>
          <div className={styles.inputSearchContainer}>
            <label htmlFor="">Найти</label>
            <input 
              type="text"
              value={valueSearch}
              onChange = {(e)=> setValueSearch(e.target.value)}
            />
          </div>
        </form>
          <button onClick={onSearch} className={styles.button}>Найти</button>
          <button onClick={onBreak} className={styles.button}>Сбросить</button>
      </div>
      <ul className={styles.list}>
        {filterContacts.map((elem) => (
          <Item key={elem.id} elem={elem} />
        ))}
      </ul>
    </div>
  );
}
