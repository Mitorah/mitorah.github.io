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
import NoContentVue from './components/NoContent.vue';
import Day1Vue from './adventofcode/day_1/solution.vue'
import Day2Vue from './adventofcode/day_2/solution.vue'
import Day3Vue from './adventofcode/day_3/solution.vue'
import Day4Vue from './adventofcode/day_4/solution.vue'
import Day5Vue from './adventofcode/day_5/solution.vue'
import Day6Vue from './adventofcode/day_6/solution.vue'
// import Day7Vue from './adventofcode/day_7/solution.vue'
import Day8Vue from './adventofcode/day_8/solution.vue'

export default {
	name: 'App',
	components: {
		'no-content': NoContentVue,
		'day-1': Day1Vue,
		'day-2': Day2Vue,
		'day-3': Day3Vue,
		'day-4': Day4Vue,
		'day-5': Day5Vue,
		'day-6': Day6Vue,
		// 'day-7': Day7Vue,
		'day-8': Day8Vue,
	},
	data() {
		return {
			Days: [
				{
					Title: "Day 1",
					Value: "day-1"
				},
				{
					Title: "Day 2",
					Value: "day-2"
				},
				{
					Title: "Day 3",
					Value: "day-3"
				},
				{
					Title: "Day 4",
					Value: "day-4"
				},
				{
					Title: "Day 5",
					Value: "day-5"
				},
				{
					Title: "Day 6",
					Value: "day-6"
				},
				// {
				// 	Title: "Day 7",
				// 	Value: "day-7"
				// }
				{
					Title: "Day 8",
					Value: "day-8"
				},
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
