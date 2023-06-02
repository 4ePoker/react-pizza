import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export interface ICartItem {
    id: string,
    title: string,
    types: string[],
    sizes: string[],
    price: number,
    imageUrl: string,
    count: number
}

type CartSliceState = {
    totalPrice: number,
    items: ICartItem[]
}

const { totalPrice, items } = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ICartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem) {
                findItem.count--
            }

        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        setPrice(state, action) {
            state.totalPrice = action.payload
        }
    }
})

export const selectCart = (state: RootState) => state.cartReducer
export const selectCartItemById = (id: string) => (state: RootState) => state.cartReducer.items.find((obj) => obj.id === id)

export const {addItem, minusItem, removeItem, clearItems, setPrice} = cartSlice.actions

export default cartSlice.reducer