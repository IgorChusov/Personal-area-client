import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { LoginUserAsync } from '../../store/logIn/action';
import { SignUpUserAsync } from '../../store/signUp/action';
import { Text } from '../universalComponents/Text';
import styles from './signup.css';

export function SignUp() {
  const [valueName, setValueName] = useState('')
  const [valuePassword, setValuePassword] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if(valueName.length === 0 || valuePassword.length === 0) return
    const login = await dispatch(LoginUserAsync(valueName, valuePassword))

    if(!login) {
      const resp = await dispatch(SignUpUserAsync(valueName, valuePassword))

      if(!!resp) {
        history.push('/contacts')
      }
    } else {
      alert('Аккаунт существует')
      history.push('/contacts')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={onSubmit} className={styles.form} action="">
          <Text className={styles.title} size={20} As='h2'>Sign Up</Text>
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
          <button className={styles.button}>Sign up</button>
        </form>
        <Link to={'/log-in'}>Log in</Link>
      </div>
    </div>
  );
}
