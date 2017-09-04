import Vue from 'vue'
import Index from '@/pages/index.vue'

describe('index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    console.log(vm);
    /*expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')*/
  })
})
