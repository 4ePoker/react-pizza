import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try{
                const {data} = await axios.get('https://6387167bd9b24b1be3e57fc9.mockapi.io/items/' + id)
                setPizza(data)
            }catch (error){
                alert('error')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])
    if(!pizza){
        return <>Loading...</>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="image-goes-here"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;