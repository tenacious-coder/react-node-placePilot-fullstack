//import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import AuthContext from './Context/AuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
// import UserContext from './Context/UserContext.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
 import { persistStore } from 'redux-persist'
 import { PersistGate } from 'redux-persist/integration/react'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
 const persistor = persistStore(store);

  ReactDOM.createRoot(document.getElementById('root')).render(
 
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  // </UserContext>
  // </AuthContext>


)
