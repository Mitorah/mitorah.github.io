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

            // --- Part 1 ---
            var result = 0;

            for (let i = 1; i < inputData.length; i++) {
                result = (Number(inputData[i]) > Number(inputData[i-1])) ? result + 1 : result;
            }

            this.SetResult(result)

            // --- Part 2 ---
            let lastDepth = 0;
            result = 0
            for (let i = 0; i < inputData.length -3; i++) {
                let newDepth = Number(inputData[i]) + Number(inputData[i+1]) + Number(inputData[i+2])

                if (newDepth > lastDepth)
                    result++

                lastDepth = newDepth
            }

            this.SetResult(result)
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>