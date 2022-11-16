import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './css/App.css'
import CartView from './pages/CartView'
import ShopView from './pages/ShopView'
import ItemView from './pages/ItemView'
import Error404 from './pages/Error404'

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
          <Route path='/error404' element={<Error404/>}/>
        </Routes>
      </Router>
    </CurrentUserProvider>


    
  );
}

export default App;
