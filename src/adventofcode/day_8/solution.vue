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

            for(let i = 0; i < inputData.length; i++) {
                var splittedElement = inputData[i].split(' ')
                inputData[i] = {
                    instruction: splittedElement[0],
                    value: splittedElement[1],
                    visited: false
                }
            }

            var Results = this.RunData(inputData)
            this.SetResult(Results.shift())

            // For phase two, add finishing command to the end of input. This is the sign that program should stop.
            inputData.push({
                instruction: 'finished',
                value: '+0',
                visited: true
            })

            // Filter out instructions that are not 'nop' or 'jmp'
            var filteredResults = Results.filter(x => inputData[x].instruction != 'nop' || inputData[x].instruction != 'jmp')
            
            // Sicne we have the route from phase 1, we can change one item one by one from the route to see, if we hit finish.
            for (let i = 0; i < filteredResults.length; i++) {

                let savedIndex = filteredResults[i]

                if (inputData[savedIndex].instruction == 'nop')
                    inputData[savedIndex].instruction = 'jmp'
                else if (inputData[savedIndex].instruction == 'jmp')
                    inputData[savedIndex].instruction = 'nop'

                Results = this.RunData(inputData)
                
                var accAmount = Results.shift()

                if (inputData[inputData.length - 1].instruction == 'Finito') {
                    // We hit finish, save the record
                    this.SetResult(accAmount)
                    break
                }
                else {
                    if (inputData[savedIndex].instruction == 'nop')
                        inputData[savedIndex].instruction = 'jmp'
                    else if (inputData[savedIndex].instruction == 'jmp')
                        inputData[savedIndex].instruction = 'nop'

                    inputData.map(x => x.visited = false)
                    inputData[inputData.length - 1].visited = true
                }
            }

        },
        RunData(inputData) {

            var Result = 0
            var CurrentIndex = [0]
            var breakOut = false

            while(!breakOut) {
                if (inputData[CurrentIndex[0]].visited) {
                    
                    if (inputData[CurrentIndex[0]].instruction == 'finished') {
                        inputData[CurrentIndex[0]].instruction = 'Finito'
                    }

                    breakOut = true

                    // For phase two, we need the route to result aswell. One of these will need to be changed for the phase two
                    // Unshift results to first so it can be shifted away
                    CurrentIndex.unshift(Result)
                    
                    return CurrentIndex
                }

                inputData[CurrentIndex[0]].visited = true;
                
                switch(inputData[CurrentIndex[0]].instruction) {
                    case 'nop':
                        CurrentIndex.unshift(CurrentIndex[0] +1)
                        break;
                    case 'acc':
                        Result += +inputData[CurrentIndex[0]].value
                        CurrentIndex.unshift(CurrentIndex[0] +1)
                        break;
                    case 'jmp':
                        CurrentIndex.unshift(CurrentIndex[0] + +inputData[CurrentIndex[0]].value)
                        break
                }
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