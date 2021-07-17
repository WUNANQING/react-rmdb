// import { useState, useEffect, useRef } from "react";
import searchIcon from "../../images/search-icon.svg";
import {Wrapper, Content} from "./SearchBar.styles";
import PropTypes from "prop-types";

// const SearchBar = ({ setSearchTerm }) => {
//     const [state, setState] = useState('')
//     const initial = useRef(true)


//     useEffect(() => {
//         // 在初始化的時候不希望觸發useEffect
//         // 所以先給個初始值判斷
//         // 等初始化完後再監測
//         // 可以設定console比較差異
//         if(initial.current) {
//             initial.current = false
//             return
//         }

//         const timer = setTimeout(() => {
//             setSearchTerm(state)
//         }, 500)
//         // 每次觸發新useEffect rerender之前會先執行return的東西
//         return () => clearTimeout(timer)
//         // 雖然有dependency但第一次render仍會觸發
//     }, [setSearchTerm, state])

//     return (
//         <Wrapper>
//         <Content>
//             <img src={searchIcon} alt="search-icon"/>
//             <input 
//             type="text" 
//             placeholder="Search Movie"
//             onChange={event => setState(event.target.value)}
//             value={state}
//             />
//         </Content>
//     </Wrapper>
//     )
// }



// Class Component
import {Component} from "react";

class SearchBar extends Component {
    // 無需constructor babel和webopack會轉譯
    // class元件只有一個狀態
    state = {value: ''}
    timeout = null

    // lifecycle
    componentDidUpdate(_prevProps, prevState) {
        // 需要this參照
        if(this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props

            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value)
            }, 500)
        }
    }
    
    render() {

        const {value} = this.state

        return (
            <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon"/>
                <input 
                type="text" 
                placeholder="Search Movie"
                onChange={event => this.setState({value: event.target.value})}
                value={value}
                />
            </Content>
            </Wrapper>
        )
    }
}


SearchBar.propTypes = {
    callback: PropTypes.func
}

export default SearchBar;