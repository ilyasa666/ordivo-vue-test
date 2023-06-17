<template>
    <div>
        <h2>Starships</h2>
        <a-input v-model:value="searchQuery" placeholder="Search starships" @input="searchStarships" style="margin: 10px 0;" />
        <a-list v-infinite-scroll="fetchStarships" :disabled="loading">
            <a-list-item v-for="starship in starships" :key="starship.name" @click="showStarship(starship)">
                {{ starship.name }}
            </a-list-item>
            <a-spin v-if="loading" />
        </a-list>
        <div v-if="selectedStarship">
            <h2>{{ selectedStarship.name }}</h2>
            <p>Model: {{ selectedStarship.model }}</p>
            <p>Manufacturer: {{ selectedStarship.manufacturer }}</p>
            <p>Cost in credits: {{ selectedStarship.cost_in_credits }}</p>
            <p>Length: {{ selectedStarship.length }}</p>
            <p>Crew: {{ selectedStarship.crew }}</p>
            <p>Passengers: {{ selectedStarship.passengers }}</p>
            <p>Starship class: {{ selectedStarship.starship_class }}</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            starships: [],
            searchQuery: '',
            selectedStarship: null,
            nextPageUrl: 'https://swapi.dev/api/starships/',
            loading: false
        };
    },
    mounted() {
        this.fetchStarships();
    },
    methods: {
        fetchStarships() {
            if (this.loading) return;

            this.loading = true;

            axios.get(this.nextPageUrl)
                .then(response => {
                    this.starships = [...this.starships, ...response.data.results];
                    this.nextPageUrl = response.data.next;
                    this.loading = false;
                })
                .catch(error => {
                    console.error(error);
                    this.loading = false;
                });
        },
        showStarship(starship) {
            this.selectedStarship = starship;
        },
        searchStarships() {
            if (this.searchQuery === '') {
                this.selectedStarship = null;
                return;
            }
            axios.get(`https://swapi.dev/api/starships/?search=${this.searchQuery}`)
                .then(response => {
                    this.selectedStarship = null;
                    this.starships = response.data.results;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    directives: {
        infiniteScroll: {
            inserted(el, binding) {
                el.addEventListener('scroll', function () {
                    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
                        binding.value();
                    }
                });
            }
        }
    }
};
</script>
  
<style>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    cursor: pointer;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #f0f0f0;
}

li:hover {
    background-color: #e0e0e0;
}
</style>
  