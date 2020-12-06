<template>
	<v-app>
		<v-col
		cols="12"
		sm="6">
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

export default {
	name: 'App',
	components: {
		'no-content': NoContentVue,
		'day-1': Day1Vue,
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
				// }
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
