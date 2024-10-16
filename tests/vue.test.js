import { mount } from '@vue/test-utils'
import Example from './Example.vue'


test('메시지를 변경합니다.',async () => {
    const wrapper = mount(Example)
    // wrapper.vm === this
    expect(wrapper.vm.msg).toBe('Hello Vue test utils!')
    //wrapper.vm.msg = 'Hello HEROPY!'
    await wrapper.setData({
        msg: 'Hello HEROPY!'
    })
    expect(wrapper.find('div').text()).toBe('Hello HEROPY!')
})