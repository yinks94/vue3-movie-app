<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        class="nav-item"
        v-for="nav in navigations"
        :key="nav.name">
        <RouterLink
          class="nav-link"
          active-class="active"
          :class="{active: isMatch(nav.path)}"
          :to="nav.href">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div class="user" @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo.vue";
import {mapState} from "vuex";

export default {
  components: {
    Logo
  },
  computed: {
    ...mapState('about', [
        'image',
        'name'
    ])
  },
  data(){
    return {
      navigations:[
        {
          name:'Search',
          href:'/',
        },
        {
          name:'Movie',
          href:'/movie/tt4520988',
          path: /^\/movie/
        },
        {
          name:'About',
          href:'/about'
        },
        {
          name: 'SCSS',
          href:'/scss'
        }
      ]
    }
  },
  methods:{
    isMatch(path){
      if( !path ) return false
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      console.log('goto about')
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>


header{
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: 0.4s;
    &:hover{
      background-color: darken($gray-200, 10%);
    }
    img{
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm){
    .nav{
      display: none;
    }
  }
}
</style>
