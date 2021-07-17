import { useState, useEffect, useRef } from "react";
import searchIcon from "../../images/search-icon.svg";
import {Wrapper, Content} from "./SearchBar.styles";
import PropTypes from "prop-types";

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('')
    const initial = useRef(true)


    useEffect(() => {
        // 在初始化的時候不希望觸發useEffect
        // 所以先給個初始值判斷
        // 等初始化完後再監測
        // 可以設定console比較差異
        if(initial.current) {
            initial.current = false
            return
        }

        const timer = setTimeout(() => {
            setSearchTerm(state)
        }, 500)
        // 每次觸發新useEffect rerender之前會先執行return的東西
        return () => clearTimeout(timer)
        // 雖然有dependency但第一次render仍會觸發
    }, [setSearchTerm, state])

    return (
        <Wrapper>
        <Content>
            <img src={searchIcon} alt="search-icon"/>
            <input 
            type="text" 
            placeholder="Search Movie"
            onChange={event => setState(event.target.value)}
            value={state}
            />
        </Content>
    </Wrapper>
    )
}

SearchBar.propTypes = {
    callback: PropTypes.func
}
export default SearchBar;