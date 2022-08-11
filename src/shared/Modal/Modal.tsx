import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeContactsAsync } from '../../store/contact/action';
import { ContactData, ContactsState } from '../../store/contact/reduser';
import { RootState } from '../../store/reducer';
import styles from './modal.css';

interface IModal {
  id: number
  idContainer: string
  onClose?: () => void;
}

export function Modal({idContainer, id, onClose}: IModal) {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null);
  const contacts = useSelector<RootState, ContactsState>((state) => state.contacts)

  const [valueNameModal, setValueNameModal] = useState('')
  const [valuePhoneModal, setValuePhoneModal] = useState('')

  const node = document.getElementById(idContainer);
  if(!node) return null;

  useEffect(()=> {
    const findContact = contacts.data.find((elem) => elem.id === id)
    if(findContact) {
      setValueNameModal(findContact.name)
      setValuePhoneModal(findContact.tel)
    }
  }, [])

  useEffect(()=> {
    function handleClickedOut (event: MouseEvent){
      if(event.target instanceof Node && !ref.current?.contains(event.target))
        onClose?.()
    }
    document.addEventListener('click', handleClickedOut);
    return () => {
      document.removeEventListener('click', handleClickedOut)
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(ChangeContactsAsync(id, valuePhoneModal, valueNameModal))
    onClose?.()
  }

  return ReactDOM.createPortal((
    <div ref={ref} className={styles.modal}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Change name</label>
          <input 
            type="text"
            value={valueNameModal}
            onChange = {(e)=> setValueNameModal(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Change telephone</label>
          <input 
            type="text"
            value={valuePhoneModal}
            onChange = {(e)=> setValuePhoneModal(e.target.value)}
          />
        </div>
        <button className={styles.buttonChange}>Изменить</button>
      </form>
    </div>
  ), node)
}
