<template>
	<v-app v-if="false">
		<!-- <advent-of-code-2021 /> -->
		<!-- <advent-of-code-2020 /> -->
		<card-value-engine />
	</v-app>
</template>

<script>

// import AdventOfCode2020 from './adventofcode_2020/adventofcode.vue'
// import AdventOfCode2021 from './adventofcode_2021/adventofcode.vue'
import cardvalueengineVue from './cardvalueengine/cardvalueengine.vue'

export default {
	name: 'App',
	components: {
		// 'advent-of-code-2020': AdventOfCode2020,
		//'advent-of-code-2021': AdventOfCode2021,
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
