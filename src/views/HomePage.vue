<template>
  <div>
    <h1>Starship App</h1>
    <SearchBox />
    <StarshipList />
  </div>
</template>

<script>
import StarshipList from '../components/StarshipList.vue';
import SearchBox from '../components/SearchBox.vue';

export default {
  name: 'HomePage',
  components: {
    StarshipList,
    SearchBox,
  },
};
</script>
