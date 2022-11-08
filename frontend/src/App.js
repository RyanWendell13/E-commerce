import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './css/App.css'
import CartView from './pages/CartView'
import ShopView from './pages/ShopView'
import ItemView from './pages/ItemView'

import CurrentUserProvider from './contexts/CurrentUser'

function App() {
  document.title = 'E-commerce'
  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<ShopView/>}/>
          <Route path='/cart' element={<CartView/>}/>
          <Route path='/products/:id' element={<ItemView/>}/>
        </Routes>
      </Router>
    </CurrentUserProvider>


    
  );
}

export default App;
