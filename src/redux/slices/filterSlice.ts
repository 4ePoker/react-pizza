import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface FilterSliceState {
    searchValue: string,
    category: number,
    currentPage: number,
    sort: 'rating' | 'price' | 'title' | string
}

const initialState: FilterSliceState = {
    searchValue: '',
    category: 0,
    currentPage: 1,
    sort: 'rating'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        setCategoryId(state, action: PayloadAction<number>) {
            state.category = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<string>) {
            state.sort = action.payload
        },

        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },

        setFilters (state, action:PayloadAction<FilterSliceState>) {
            state.category = action.payload.category
            state.currentPage = action.payload.currentPage
            state.sort = action.payload.sort
            state.searchValue = action.payload.searchValue
        },
    }
})

export const selectSort = (state: RootState) => state.filterReducer.sort

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer