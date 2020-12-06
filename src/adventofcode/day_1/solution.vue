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

            TaskResult: '', // Result value
        }
    },
    mounted() {
        this.Solve(inputData)
    },
    methods: {
        Solve(inputData) {
            // Split data to array
            inputData = inputData.split('\n')

            // --- Part One ---
            inputData.find(x => inputData.find(y => {
                if (parseInt(x) + parseInt(y) == 2020) {
                    // Result found!
                    this.SetResult(x * y)
                    return true;
                }

                return false
            }))

            // --- Part Two ---
            inputData.find(x => inputData.find(y => inputData.find(z => {
                if (parseInt(x) + parseInt(y) + parseInt(z) == 2020) {
                    // Result found!
                    this.SetResult(x * y * z)
                    return true
                }

                return false
            })))
        },
        SetResult(Result) {
            this.TaskResult += Result.toString() + '\n'
        }
    }
}
</script>

<style>

</style>