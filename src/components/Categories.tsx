import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

type CategoriesProps = {
    onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ onClickCategory }) =>  {

    const categories = ['All', 'Carnivore', 'Vegan', 'Grill', 'Spicy', 'Closed']

    const {category}: any = useSelector((state: RootState) => state.filterReducer)

    return (
        <div className="categories">
            <ul>{
                categories.map((categoryName, i) => (
                    <li key={i} onClick={() =>onClickCategory(i)} className={category === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))
            }
            </ul>
        </div>
    )
})

export default Categories