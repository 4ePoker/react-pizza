import React, {useCallback, useEffect, useRef} from 'react';
import qs from 'qs'
import {useSelector} from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import FilterSlice, {FilterSliceState, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzaParams} from "../redux/slices/pizzaSlice";
import {Link, useNavigate} from "react-router-dom";
import NotFound from "./NotFound";
import {RootState, useAppDispatch} from "../redux/store";

type ChangePage = {
    onChangePage: (i: number) => void
}

const Home = () => {
    const {category, sort, currentPage, searchValue} = useSelector((state: RootState) => state.filterReducer)
    const {items, status} = useSelector((state: RootState) => state.pizzaReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, [])

    const onChangePage = React.useCallback((page: number) => {
        dispatch(setCurrentPage(page))
    }, [])

    const getPizzas = async () => {
        const categoryFilter = category > 0 ? `category=${category}` : ''
        const sortFilter = sort === 'rating' ? 'desc' : 'asc'
        const currentPizzasOnPage = 8

        dispatch(
            fetchPizzas({
                categoryFilter,
                sortFilter,
                currentPizzasOnPage: String(currentPizzasOnPage),
                sort,
                currentPage: String(currentPage)
            }))

    }

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sort,
    //             category,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //
    //     isMounted.current = true
    // }, [category, sort, currentPage])
    //
    // useEffect(() => {
    //
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //         dispatch(
    //             setFilters({
    //                 searchValue: params.categoryFilter,
    //                 category: Number(params.categoryFilter),
    //                 currentPage: Number(params.currentPage),
    //                 sort: params.sort}
    //             )
    //         )
    //         isSearch.current = true
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //
    //     if (!isSearch.current) {
    //         getPizzas()
    //     }
    //     isSearch.current = false
    // }, [category, sort, currentPage])

    useEffect(() => {
        getPizzas()
    }, [category, sort, currentPage, searchValue])

    const pizzasItem = items.filter((obj: any) => {
        return obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

    }).map((obj: any) => (
            <PizzaBlock key={obj.id} {...obj}/>
    ))

    const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? <NotFound/>
                    : <div className="content__items">
                        {
                            status === 'loading'
                                ? skeletons
                                : pizzasItem
                        }
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;