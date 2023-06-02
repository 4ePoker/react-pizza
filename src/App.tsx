import './scss/app.scss'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import React from "react";

const Cart = React.lazy(() => import('./pages/Cart'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart"
                       element={<React.Suspense fallback={<div>Loading your cart...</div>}>
                           <Cart/>
                        </React.Suspense>}
                />
                <Route path="cart"
                       element={<React.Suspense fallback={<div>Loading your Pizza...</div>}>
                           <FullPizza/>
                       </React.Suspense>}
                />
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
