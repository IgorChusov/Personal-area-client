import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { LoginUserAsync } from '../../store/logIn/action';
import { Text } from '../universalComponents/Text';
import styles from './login.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export function LogIn() {
  const [valueName, setValueName] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const idName = uuidv4()
  const idPassword = uuidv4()
  
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if(valueName.length === 0 || valuePassword.length === 0) return
    const resp = await dispatch(LoginUserAsync(valueName, valuePassword))
    
    if(!!resp) {
      history.push('/contacts')
    } else {
      alert("Пожалуйста, зарегистрируйтесь!")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={onSubmit} className={styles.form} action="">
          <Text className={styles.title} size={20} As='h2'>Log in</Text>
          <div className={styles.inputContainer}>
            <label htmlFor='name'>Name:</label>
            <input 
              id='name'
              type="text"
              className={styles.input} 
              value={valueName}
              onChange={(e) => setValueName(e.target.value)}
            />
          
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='password'>Password:</label>
            <input 
              id='password'
              type="text"
              className={styles.input} 
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
            />
          </div>
        
          <button className={styles.button}>Log In</button>
        </form>
          <Link to={'/sign-up'}>Sign up</Link>
      </div>
    </div>
  );
}
