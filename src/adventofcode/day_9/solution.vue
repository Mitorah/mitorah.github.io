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

            var preambleValue = 25
            var startingIndex = preambleValue

            // Save the result for Phase 2
            var foundValue = 0

            for (let i = startingIndex; i < inputData.length; i++) {
                if (this.FindSum(inputData, inputData[i], i, preambleValue))
                    continue

                foundValue = inputData[i]
                this.SetResult(inputData[i])
                break
            }

            var PhaseTwoResult = 0;

            for (let i = 0; i < inputData.length; i++) {
                PhaseTwoResult = this.FindSumFromGroup(inputData, foundValue, i)

                if (PhaseTwoResult) {
                    this.SetResult(+Math.min(...PhaseTwoResult) + +Math.max(...PhaseTwoResult))
                    break;
                }
            }

        },
        FindSum(inputData, sumToFind, startIndex, length) {

            for (let i = 1; i < length+1; i++) {
                for (let j = i+1; j < length+1; j++) {
                    if (+inputData[startIndex - i] + +inputData[startIndex - j] == sumToFind)
                        return true
                }
            }

            return false
        },
        FindSumFromGroup(inputData, sumToFind, startingIndex) {
                var result = +inputData[startingIndex]

                for (let i = startingIndex + 1; i < inputData.length; i++) {
                    result += +inputData[i]

                    if (result == sumToFind) {
                        return inputData.slice(startingIndex, i+1)
                    }
                    
                    if (result > sumToFind)
                        return null;
                }
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>