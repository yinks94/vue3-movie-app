import * as example from "./async"
import axios from "axios";


describe('비동기 테스트2', () => {
    test('영화 제목 변환', async () => {

        axios.get = jest.fn( () => {
          return new Promise( resolve => {
              resolve({
                  data: {
                      Title: 'Frozen II'
                  }
              })
          });
        })

        const title = await example.fetchMovieTitle()
        expect(title).toBe('Frozen ii')

    })
})

/*
describe('비동기 테스트', ()=>{
   test('done', (done) => {
        asyncFn().then( res => {
            expect(res).toBe('Done!')
            done()
        })
    })

    test('then', () => {
        return asyncFn().then( res => {
            expect(res).toBe('Done!')
        })
    })

    test('resolve', () =>{
        return expect(asyncFn())
                .resolves.toBe('Done!')
    })

    test('async/await', async () =>{
        const res = await example.asyncFn()
        expect(res).toBe('Done!')
    }, 7000)

    test('async/await', async () =>{

        jest.spyOn(example, 'asyncFn')
            .mockResolvedValueOnce('Done!')
        const res = await example.asyncFn()
        expect(res).toBe('Done!')
    }, 7000)


})

 */