import React from 'react'
import { hot } from 'react-hot-loader/root'

import { Layout } from './shared/Layout'

import './main.global.css'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import { rootReducer } from './store/reducer'
import { Content } from './shared/Content'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent() {
  return (
    <Provider store={store}>
      <Layout>
        <Content />
      </Layout>
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
