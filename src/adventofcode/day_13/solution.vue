<template>
    <div>
        <show-task
        :resultData="TaskResult"
        :taskData="CurrentTaskData"
        :inputData="CurrentInputData"
        :solutionData="CurrentSolutionData"
        ></show-task>
    </div>
</template>

<script>
import inputData from 'raw-loader!./input'
import taskData from 'raw-loader!./task'
import solutionData from 'raw-loader!./solution'
import ShowTaskVue from '../../components/ShowTask.vue'

export default {
    components: {
        'show-task': ShowTaskVue
    },
    data() {
        return {
            CurrentInputData: inputData,
            CurrentTaskData: taskData,
            CurrentSolutionData: solutionData,
            InputData: inputData,

            TaskResult: [], // Result value
        }
    },
    mounted() {
        this.Solve(inputData)
    },
    methods: {
        Solve(inputData) {
            // Solve the task there and then call 'SetResult(Result)'
            // with the correct answer
            // The answer can be checked at 'https://adventofcode.com/'

            inputData = inputData.split('\n')
            inputData[1] = inputData[1].split(',').filter((x) => x != 'x')

            var divisionData = inputData[1].map((x) => (inputData[0] / x).toString())
            var resultIdx = 0
            console.log(divisionData)
            for (let i = 1; i < divisionData.length; i++) {
                if (+divisionData[i].split('.')[1].slice(0,5) > +divisionData[resultIdx].split('.')[1].slice(0,5)) {
                    resultIdx = i
                }
            }
            console.log(`${resultIdx}: ${divisionData[resultIdx]} -> ${Math.ceil(divisionData[resultIdx])}`)

            this.SetResult(
                ((Math.ceil(+divisionData[resultIdx]) * inputData[1][resultIdx]) - inputData[0]) * inputData[1][resultIdx]
                )
            // Part 2
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>