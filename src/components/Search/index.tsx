import React, {ChangeEventHandler, useCallback, useContext, useRef, useState} from 'react';
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";


const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    const waitChangeValue = useCallback(debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 300), [])

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        waitChangeValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/>
                <g data-name="Layer 2" id="Layer_2">
                    <path
                        d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/>
                </g>
            </svg>
            <input ref={inputRef} value={value} onChange={(event) => onChangeInput(event)}
                   className={styles.input}
                   placeholder="Search your pizza..."/>

            {value && (
                <svg onClick={onClickClear} className={styles.clearIcon} viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>

                </svg>)}
        </div>
    )

};

export default Search;