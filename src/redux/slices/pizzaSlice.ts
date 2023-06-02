import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


type TFetchPizzasArgs = Record<string, string>

export type Pizza = {
    id: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    imageUrl: string,
    count: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    REJECT = 'error'
}

interface PizzaSliceState {
    items: Pizza[],
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export type SearchPizzaParams = {
    categoryFilter: string,
    sortFilter: string,
    currentPizzasOnPage: string,
    sort: string,
    currentPage: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], TFetchPizzasArgs>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {categoryFilter, sortFilter, currentPizzasOnPage, sort, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://6387167bd9b24b1be3e57fc9.mockapi.io/items?page=${currentPage}&limit=${currentPizzasOnPage}&${categoryFilter}&sortBy=${sort}&order=${sortFilter}`
        )

        return data
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.REJECT
            state.items = []
        })
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer