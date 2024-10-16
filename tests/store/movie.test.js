
import movieStore from '~/store/movie.js'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'

describe('store/movie.js', () => {

    let store;

    beforeEach(() => {
        store = _cloneDeep(movieStore)

        store.state = store.state()

        store.commit = (name, payload) =>{
            store.mutations[name](store.state, payload)
        }

        store.dispatch = (name, payload) => {
            const context = {
                state: store.state,
                commit: store.commit,
                dispatch: store.dispatch
            }
            // 비동기 함수..
            return store.actions[name](context, payload)
        }
    })

    test('영화 데이터를 초기화 합니다.', () => {
        store.commit('updateState', {
            movies:[{imdbID: '1'}],
            message:'Hello World',
            loading: true
        })

        store.commit('resetMovies')

        expect(store.state.movies).toEqual([])
        expect(store.state.message).toBe('Search for the movie title')
        expect(store.state.loading).toBe(false)
    })


    test('영화 목록을 잘 가져온 경우 데이터를 확인합니다.', async () => {

        const res = {
            data:{
                totalResults: '1',
                Search:[
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    }
                ]
            }
        }

        // axios.get = jest.fn(() => {
        //     return new Promise(resolve => {
        //         resolve(res)
        //     })
        // })
        axios.get = jest.fn().mockResolvedValue(res)

        await store.dispatch('searchMovies')
        expect(store.state.movies).toEqual(res.data.Search)

    })

    test('영화의 목록을 가져오지 못한 경우에 에러메시지를 확인합니다.',async ()=>{
        const errorMessage = 'Network Error.'
        axios.get = jest.fn().mockRejectedValue(new Error(errorMessage))
        await store.dispatch('searchMovies')
        expect(store.state.message).toBe(errorMessage)
    })

    test('영화 아이템이 중복되는 경우 고유하게 처리합니다.', async () =>{
        const res = {
            data:{
                totalResults: '1',
                Search:[
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                    {
                        imdbID: '1',
                        Title: 'Hello~~',
                        Poster: 'hello.jpg',
                        Year: '2022'
                    },
                    {
                        imdbID: '2',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    }
                ]
            }
        }
        axios.get = jest.fn().mockResolvedValue(res)
        await store.dispatch('searchMovies')
        expect(store.state.movies.length).toBe(2)
    })

    test('단일 영화의 상세정보를 잘 가져온 경우 데이터를 확인합니다.',async ()=>{
        const res = {
            data:{
                imdbID: '1',
                Title: 'Hello',
                Poster: 'hello.jpg',
                Year: '2021'
            }
        }
        axios.get = jest.fn().mockResolvedValue(res)
        await store.dispatch('searchMovieWithId')
        expect(store.state.theMovie).toEqual({})
    })

})