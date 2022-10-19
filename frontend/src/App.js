import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import CartView from './pages/CartView'
import ShopView from './pages/ShopView'
import ItemView from './pages/ItemView'

function App() {
  document.title = 'E-commerce'
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ShopView/>}/>
        <Route path='/cart' element={<CartView/>}/>
        <Route path='/products/:id' element={<ItemView/>}/>
      </Routes>
    </Router>


    
  );
}

export default App;
