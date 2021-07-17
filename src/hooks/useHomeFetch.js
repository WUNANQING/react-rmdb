import { useEffect, useState  } from "react";
import API from "../API";
import {isPersistedState} from '../helpers'

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const fetchMovies = async (page, searchTerm = '') => {
        try {
            setError(false)
            setLoading(true)
            const movies = await API.fetchMovies(searchTerm, page)
            setState(prev => {
            // useState的mutation 如果放callback 第一個參數會是前一個設定的值
            return ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]    
            })}
            )
        } catch (error) {
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    // 初始化和監聽搜尋
    useEffect(() => {
        // 沒搜尋時 記住首頁資訊 避免一直連線要資料
        if(!searchTerm) {
            const sessionState = isPersistedState('homeState')
            if(sessionState) {
                console.log('take from sessionstorage')
                setState(sessionState)
                return
            }
        }
        console.log('take from api')
        // 清空狀態
        setState(initialState)
        fetchMovies(1, searchTerm)
    }, [searchTerm])

    // Load more
    useEffect(() => {
        if(!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false)

    }, [isLoadingMore, searchTerm, state.page])

    // 寫入sessionStorage
    useEffect(() => {
        // 寫入之後不會立刻改變 需重新整理才會顯示最新資訊
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    }, [searchTerm, state])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore}
}

export default useHomeFetch