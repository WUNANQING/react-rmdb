import {useState, useEffect, useCallback} from 'react';
import API from '../API';
import {isPersistedState} from '../helpers'
 
const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error ,setError] = useState(false);

    // 讓fetchMovie不要在useEffect重複宣告
    // 但移動到外面會讓useEffect
    // 認為其內與dependency是兩個函式
    // 會重複render
    // 因此須用useCallback 包住內部function
    const fetchMovie = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            )
            setState({
                ...movie,
                actors: credits.cast,
                directors
            })
            sessionStorage.setItem(movieId, JSON.stringify({
                ...movie,
                actors: credits.cast,
                directors
            }))
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        } 
        
        // 要隨著movieId觸發
    }, [movieId])

    
    // useEffect(() => {
    //     // 寫入電影詳細資料
    //     // 初次觸發state仍為空 因為還在fetch 因此需等有值再寫入
    //     Object.keys(state).length && sessionStorage.setItem(movieId, JSON.stringify(state))

    // }, [movieId, state])

    

    useEffect(() => {
        // sessionStorage若有電影資料 直接讀取 不用call api
        const sessionState = isPersistedState(movieId)
        if(sessionState) {
            console.log('movie from sessionStorage')
            setState(sessionState)
            setLoading(false)
            return
        }
        console.log('movie from api')
        fetchMovie()
    }, [movieId, fetchMovie])


    return {state, loading, error}
}
 
export default useMovieFetch;