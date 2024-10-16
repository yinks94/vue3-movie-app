import axios from "axios"
import _uniqBy from "lodash/uniqBy"

const _defaultMessage = 'Search for the movie title'
export default {

    namespaced: true,
    // data
    state: () => ({
        movies: [],
        totalResults: '',
        message:_defaultMessage,
        loading: false,
        theMovie: {}
    }),
    // computed
    getters: {
        movieIds(state){
            return state.movies.map(m=>m.imdbID)
        }
    },
    // method
    // 변이
    mutations:{
        updateState(state, payload){
            Object.keys(payload).forEach(key=>{
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 비동기
    actions: {
        async searchMovies(context, payload) {

            // 현재 검색 중이면....
            if( context.state.loading ) return;

            context.commit('updateState', {
                message: '',
                loading: true
            })

            try{
                //const {title, type, number, year} = payload
                // https://www.omdbapi.com/?i=tt3896198&apikey=9cd161fb
                //const OMDB_API_KEY = "9cd161fb"
                //const response = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
                const response = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const {Search, totalResults} = response.data
                context.commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID'),
                    totalResults: totalResults,
                    message: ''
                })
                console.log(totalResults, typeof totalResults)

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                // 추가요청 전송
                if( pageLength > 1){
                    for(let page=2; page <= pageLength; page++){
                        if( page > payload.number / 10) break
                        // const response = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                        const response = await _fetchMovie({
                            ...payload,
                            page: page
                        })
                        const { Search } = response.data
                        context.commit('updateState', {
                            movies: [
                                ...context.state.movies,
                                ..._uniqBy(Search, 'imdbID')]
                        })
                    }
                }
            }catch(message){
                console.log('Error(searchMovie)', message)
                context.commit('updateState', {
                    movies: [],
                    message: message
                })
            }finally {
                context.commit('updateState', {
                    loading: false
                })
            }
        },
        // context를 {state, commit}으로 구조 분해함
        async searchMovieWithId(context, payload){
            if(context.state.loading) return

            context.commit('updateState', {
                theMovie: {},
                loading: true
            })

            try{
                const response = await _fetchMovie(payload)
                console.log('searchMovieWithId', response.data)
                context.commit('updateState', {
                    theMovie: response.data
                })
            }catch (error){
                context.commit('updateState', {
                    theMovie: {}
                })
            }finally {
                context.commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

function _fetchMovie(payload){
    const {title, type, year, page, id} = payload
    const OMDB_API_KEY = "9cd161fb"

    const url = id
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(url)
            if( response.data.Error ){
                reject(response.data.Error)
            }
            resolve(response)
        }catch(error){
            // console.log(error.message)
            reject(error.message)
        }
        // axios.get(url)
        //     .then((response) => {
        //         console.log(response)
        //         console.log('xxxx>>', response.data.Error)
        //         if( response.data.Error){
        //             reject(response.data.Error)
        //         }
        //         resolve(response)
        //     })
        //     .catch((error) => {
        //         reject(error.message)
        //     })
    })
}