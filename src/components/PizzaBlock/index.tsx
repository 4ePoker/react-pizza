import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemById} from "../../redux/slices/cartSlice";
import ICartItem from "../CartItem";
import {Link} from "react-router-dom";

const typeNames = ['Thin', 'Traditional']

type ItemProps = {
    id: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    imageUrl: string,
    count: number
}

const PizzaBlock: React.FC<ItemProps> = ({id, title, price, sizes, types, imageUrl}) => {
    const [currentSize, setCurrentSize] = React.useState(0)
    const [currentType, setCurrentType] = React.useState(0)
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))

    const addedCount = cartItem ? cartItem.count : 0


    const onClickAdd = () => {
        // @ts-ignore
        const item: ICartItem = {
            id,
            title,
            price,
            imageUrl,
            types: typeNames[currentType],
            sizes: sizes[currentSize],
            count: 0
        }
        dispatch(addItem(item))
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link key={id} to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeId: number) => (
                            <li
                                key={typeId} onClick={() => {
                                setCurrentType(typeId)
                            }}
                                className={currentType === typeId ? 'active' : ''}>
                                {typeNames[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((sizes, i) => (
                            <li
                                key={sizes}
                                onClick={() => {
                                    setCurrentSize(i)
                                }}
                                className={currentSize === i ? 'active' : ''}>
                                {sizes} cm.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button className="button button--outline button--add" onClick={onClickAdd}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock