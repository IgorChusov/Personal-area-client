import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { LoginData, LoginState } from '../../store/logIn/reduser';
import { RootState } from '../../store/reducer';
import { Contacts } from '../Contacts';
import { LogIn } from '../LogIn';
import { SignUp } from '../SignUp';
import styles from './content.css';

export function Content() {
  const token = useSelector<RootState, LoginState>((state) => state.me)
  const [isAuth, setIsAuth] = useState(false)
  
  useEffect(()=> {
    if(token.data) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [token.data])

  return (
    <>
      {!isAuth && (
        <Switch>
          <Route path={'/log-in'}>
            <LogIn />
          </Route>
          <Route path={'/sign-up'}>
            <SignUp />
          </Route>
          <Redirect from="/" to="/log-in" />
        </Switch>
      )}
      {isAuth && (
        <Switch>
          <Route path={'/contacts'}>
            <Contacts />
          </Route>
        </Switch>
      )}
    </>
   
  );
}
