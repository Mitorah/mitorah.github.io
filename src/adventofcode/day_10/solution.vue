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

            inputData.sort((x, y) => {
                return +x < +y ? -1 : 1
            })

            inputData.unshift(0)
            inputData.push((+inputData[inputData.length - 1] + 3))

            var calculatedData = {
                1: 0,
                2: 0,
                3: 0
            }
            
            for (let i = 1; i < inputData.length; i++) {
                for (let j = i - 1; j >= i-2; j--) {
                    
                    var diff = +inputData[i] - +inputData[j]

                    if (diff > 3)
                        break;

                    if (diff == 1 || diff == 3)
                        calculatedData[diff] += 1

                }
            }
            this.SetResult(calculatedData[1] * calculatedData[3])


            // Split data so it can be handled with recursion.
            var splittedInputData =[]

            for (let i = 1; i < inputData.length - 1; i++) {
                if (+inputData[i] - +inputData[i-1] >= 3) {
                    splittedInputData.push(inputData.splice(0, i))
                    i = 0
                }
            }
            splittedInputData.push(inputData.splice(0))
            
            var Result = 1

            for (let i = 0; i < splittedInputData.length; i++) {
                Result *= this.CalculatePossibilities(splittedInputData[i], [splittedInputData[i]], 1).length
            }

            this.SetResult(Result)
        },
        CalculatePossibilities(inputData, results, idx) {
            for (let i = idx; i < inputData.length - 1; i++) {
                
                if (+inputData[i+1] - +inputData[i-1] <= 3) {
                    var removedItem = inputData.splice(i, 1)

                    results.push(inputData.slice(0))
                    
                    this.CalculatePossibilities(inputData, results, i)

                    inputData.splice(i,0,+removedItem)
                }
            }
            
            return results
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>