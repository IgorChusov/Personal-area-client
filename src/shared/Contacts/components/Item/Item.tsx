import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteContactsAsync } from '../../../../store/contact/action';
import { ContactData } from '../../../../store/contact/reduser';
import { Modal } from '../../../Modal';
import styles from './item.css';

interface IItem {
  elem: ContactData
}

export function Item({elem}:IItem) {
  const dispatch = useDispatch()
  const [isModal, setIsModal] = useState(false)
  
  const handleDelete = async (id: number) => {
    await dispatch(DeleteContactsAsync(id))
  }

  return (
    <li id={`item${elem.id}`} key={elem.id} className={styles.item}>
      <div className={styles.info}>
        <p>{`name: ${elem.name}`}</p>
        <p>{`telefone: ${elem.tel}`}</p>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={() => setIsModal((prevState) => !prevState)} className={styles.buttonChange}>Change</button>
        <button onClick={() => handleDelete(elem.id)} className={styles.buttonDelete}>Delete</button>
      </div>
      {isModal && (
        <Modal id={elem.id} idContainer={`item${elem.id}`} onClose={()=> setIsModal(false)} />
      )}
 </li>
  );
}
