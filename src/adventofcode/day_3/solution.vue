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
            
            // Prepare data to have array of arrays, where each index contains one line as array
            inputData = inputData.split('\n')
            for(let i = 0; i < inputData.length; i++) {
                inputData[i] = inputData[i].split('')
            }

            // Part One
            this.SetResult(this.SolveRoute(inputData, {x:0, y:0}, {right:3, down:1}, '#'))

            // Part Two

            // Setup input data
            var userInput = [
                {
                    input: {right: 1, down: 1},
                    symbol: '#'
                },
                {
                    input: {right: 3, down: 1},
                    symbol: '#'
                },
                {
                    input: {right: 5, down: 1},
                    symbol: '#'
                },
                {
                    input: {right: 7, down: 1},
                    symbol: '#'
                },
                {
                    input: {right: 1, down: 2},
                    symbol: '#'
                },
            ]
            
            var result = 1

            // Multiply results together as they finish
            userInput.forEach(input => {
                result = result * this.SolveRoute(
                    inputData,
                    {x:0, y:0},
                    input.input,
                    input.symbol
                    )
            });
            
            this.SetResult(result)

        },
        SolveRoute(inputData, startingPosition, input, symbol) {
            var symbolsFound = 0
            var currentPosition = startingPosition

            do {
                // Check if symbol matches
                if (inputData[currentPosition.y][currentPosition.x] == symbol)
                    symbolsFound++

                // Add input to current position
                currentPosition.x += input.right
                currentPosition.y += input.down
                
                // Check if out of bounds
                if (currentPosition.y >= inputData.length)
                    break;
                
                // If x-axis has moved over the limit of array, move it back to the start, in correct position
                currentPosition.x = currentPosition.x >= inputData[currentPosition.y].length ? currentPosition.x - inputData[currentPosition.y].length : currentPosition.x
                
            } while (currentPosition.y < inputData.length)

            return symbolsFound
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>