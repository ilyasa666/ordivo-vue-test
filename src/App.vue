<template>
  <div id="app">
    <StarshipList @showDetail="showStarshipDetail" />
  </div>
</template>

<script>
import StarshipList from './components/StarshipList.vue';

export default {
  components: {
    StarshipList,
  },
  data() {
    return {
      selectedStarship: null
    };
  },
  methods: {
    showStarshipDetail(starship) {
      this.selectedStarship = starship;
    }
  }
};
</script>
