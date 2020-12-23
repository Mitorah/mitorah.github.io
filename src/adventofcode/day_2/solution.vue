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

            var numberOfResultsPartOne = 0
            var numberOfResultsPartTwo = 0

            inputData.map(x => {
                var rowData = x.split(' ')
                var letterToBeFound = rowData[1][0]
                var limits = Array.from(rowData[0].split('-'),Number)
                var minAmount = Math.min(...limits)
                var maxAmount = Math.max(...limits)
                var passwordData = rowData[2].split('')

                var lettersFound = 0;
                
                // Part One
                passwordData.map(y => {
                    if (y == letterToBeFound)
                        lettersFound++

                    if (lettersFound > maxAmount)
                        return false

                    return true
                })
                
                if (lettersFound >= minAmount && lettersFound <= maxAmount) {
                    numberOfResultsPartOne++
                }


                // Part Two
                if ((passwordData[minAmount - 1] == letterToBeFound) != (passwordData[maxAmount - 1] == letterToBeFound))
                    numberOfResultsPartTwo++
            })

            this.SetResult(numberOfResultsPartOne)
            this.SetResult(numberOfResultsPartTwo)
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>