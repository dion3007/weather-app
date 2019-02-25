import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withReduxStore from '../app/lib/with-redux-store'

// require('dotenv').config()

class AppWrapper extends App {
  componentDidMount() {
    // // init LS
    // if (!localStorage.getItem('cart')) {
    //   localStorage.setItem('cart', JSON.stringify([]))
    // }

    // Get User From Localstorage & Dispatch

    // // Get Cart From Localstorage & Dispatch
    // const cart = JSON.parse(localStorage.getItem('cart'))
    // const isCart = JSON.parse(localStorage.getItem('cart')).length > 0
    // console.log('componentDidMount cart-ls', cart, isCart)
    // if (isCart) {
    //   this.props.store.dispatch({ type: GET_CART, payload: { data: cart } })
    // }

    // Service Worker Register Step
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/service-worker.js')
        navigator.serviceWorker.register('/static/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(AppWrapper)
