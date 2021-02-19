<template>
	<v-app v-if="false">
		<card-value-engine />
		<!-- <advent-of-code></advent-of-code> -->

	</v-app>
</template>

<script>

// import AdventOfCode from './adventofcode/adventofcode.vue'
import cardvalueengineVue from './cardvalueengine/cardvalueengine.vue'

export default {
	name: 'App',
	components: {
		// 'advent-of-code': AdventOfCode,
		'card-value-engine': cardvalueengineVue
	},
	data() {
		return {

		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
