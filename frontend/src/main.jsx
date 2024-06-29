import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { SocketProvider } from './contexts/SocketContext.jsx'
const stripePromise = loadStripe('pk_test_51PHmWaSCFxhihy8IolYTxCsIFbRNHGc2byVYCqYRLo1aFs1XzXRnZ32zsE7fevPERYFgskgZvJME9IIBDQryioFp00F3kHHaTy')

const client_id = '548435251002-t64nb8dibdac4tbbug6hlvq219371u61.apps.googleusercontent.com'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider
      store={store}>
      <GoogleOAuthProvider clientId='548435251002-t64nb8dibdac4tbbug6hlvq219371u61.apps.googleusercontent.com' >
        <Toaster positioin='top-center' />
        <Elements stripe={stripePromise}>
          <SocketProvider>
          <App />
          </SocketProvider>
        </Elements>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
