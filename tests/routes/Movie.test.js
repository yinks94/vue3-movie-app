import { shallowMount } from '@vue/test-utils'
import router from '~/routes/index.js'
import store from '~/store/index.js'
import loadImage from '~/plugins/loadImage.js'
import Movie from '~/routes/Movie.vue'

describe('routes/Movie.vue', () => {

    let wrapper;

    beforeEach( async () => {
        window.scrollTo = jest.fn()
        router.push('/movie/tt1234567')
        await router.isReady()
        wrapper = shallowMount(Movie, {
            global:{
                plugins:[
                    store,
                    router,
                    loadImage
                ]
            }
        })
    })

    test('최초 접속한 URL의 파라미터를 확인합니다.', () =>{
        expect(wrapper.vm.$route.params.id).toBe('tt1234567')
    })

    test('지정한 이미지 크기로 URL을 변경합니다.', ()=>{
        const url = 'https://google.com/sample_image_SX300.jpg'
        expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
        expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900')
    })

    test('정상적인 이미지 주소가 아닌 경우 빈 문자열을 변환합니다.', () =>{
        expect(wrapper.vm.requestDiffSizeImage('')).toBe('')
        expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('')

    })
})