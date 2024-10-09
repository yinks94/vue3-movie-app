
<template>
  <Headline />
  <Search />
  <MoveList />
</template>

<script>
import Headline from "~/components/Headline.vue"
import Search from "~/components/Search.vue"
import MoveList from "../components/MoveList.vue";

export default {
  name: "Home",
  components: {
    MoveList,
    Headline,
    Search
  },
  created () {
    this.$store.commit('movie/resetMovies')
  }
}
</script>

<style scoped>

</style>