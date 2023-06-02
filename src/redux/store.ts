import { configureStore } from "@reduxjs/toolkit";
import  filterReducer  from "./slices/filterSlice";
import cartReducer from './slices/cartSlice'
import pizzaReducer from './slices/pizzaSlice'
import {useDispatch} from "react-redux";
import App from "../App";

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        pizzaReducer
    },
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof  store.getState>