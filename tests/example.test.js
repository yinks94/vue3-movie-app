import {double } from './example'


describe('그룹1', ()=>{

/*    beforeAll(()=>{
        console.log('beforeAll')
    })

    afterAll(()=>{
        console.log('afterAll')
    })

    beforeEach(()=>{
        console.log('beforeEach')
    })

    afterEach(()=>{
        console.log('afterEach')
    })*/

    test('테스트1', () => {
        console.log('테스트1')
        expect(double(3)).toBe(6)
    })

    test('테스트2', () => {
        console.log('테스트2')
        expect(123).toBe(123)
    })

})
