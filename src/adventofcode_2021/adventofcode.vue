<template>
	<v-app>
		<v-col
		cols="12"
		sm="6">
			Advent of code christmas challenge.
			Check out <a href="https://adventofcode.com/">adventofcode.com </a><br/>
			Source code can be found at <a href="https://github.com/Mitorah/mitorah.github.io">GitHub</a>
			<v-select
				v-model="SelectedDay"
				:items="DayTitles"
				label="Day"
			/>
		</v-col>
		<component :is="DayValue(SelectedDay)" />
	</v-app>
</template>

<script>
import NoContentVue from '../components/NoContent.vue';
import Day1Vue from './day_1/solution.vue'
// import Day2Vue from './day_2/solution.vue'
// import Day3Vue from './day_3/solution.vue'
// import Day4Vue from './day_4/solution.vue'
// import Day5Vue from './day_5/solution.vue'
// import Day6Vue from './day_6/solution.vue'
// import Day7Vue from './day_7/solution.vue'
// import Day8Vue from './day_8/solution.vue'
// import Day9Vue from './day_9/solution.vue'
// import Day10Vue from './day_10/solution.vue'
// import Day11Vue from './day_11/solution.vue'
// import Day12Vue from './day_12/solution.vue'
// import Day13Vue from './day_13/solution.vue'

export default {
	name: 'AdventOfCode',
	components: {
		'no-content': NoContentVue,
		'day-1': Day1Vue,
		// 'day-2': Day2Vue,
		// 'day-3': Day3Vue,
		// 'day-4': Day4Vue,
		// 'day-5': Day5Vue,
		// 'day-6': Day6Vue,
		// 'day-7': Day7Vue,
		// 'day-8': Day8Vue,
		// 'day-9': Day9Vue,
		// 'day-10': Day10Vue,
		// 'day-11': Day11Vue,
		// 'day-12': Day12Vue,
		// 'day-13': Day13Vue,
	},
	data() {
		return {
			Days: [
				{
					Title: "Day 1",
					Value: "day-1"
				},
				// {
				// 	Title: "Day 2",
				// 	Value: "day-2"
				// },
				// {
				// 	Title: "Day 3",
				// 	Value: "day-3"
				// },
				// {
				// 	Title: "Day 4",
				// 	Value: "day-4"
				// },
				// {
				// 	Title: "Day 5",
				// 	Value: "day-5"
				// },
				// {
				// 	Title: "Day 6",
				// 	Value: "day-6"
				// },
				// {
				// 	Title: "Day 7",
				// 	Value: "day-7"
				// },
				// {
				// 	Title: "Day 8",
				// 	Value: "day-8"
				// },
				// {
				// 	Title: "Day 9",
				// 	Value: "day-9"
				// },
				// {
				// 	Title: "Day 10",
				// 	Value: "day-10"
				// },
				// {
				// 	Title: "Day 11",
				// 	Value: "day-11"
				// },
				// {
				// 	Title: "Day 12",
				// 	Value: "day-12"
				// },
				// {
				// 	Title: "Day 13",
				// 	Value: "day-13"
				// },
			],
				SelectedDay: '',
				FoundComponent: false
			}
	},
	computed: {
		DayTitles() {
			return this.Days.map(x => x.Title)
		},
	},
	methods: {
		DayValue(title) {
			var FoundDay = this.Days.find(x => x.Title == title)
			
			if (FoundDay) {
				this.FoundComponent = true
				return this.Days.find(x => x.Title == title).Value
			}
		}
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
