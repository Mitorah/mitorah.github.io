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

            var PhaseTwoInputData = inputData.slice(0)
            inputData = inputData.split('\n')
            PhaseTwoInputData = PhaseTwoInputData.split('\n')

            for (let i = 0; i < inputData.length; i++) {
                inputData[i] = inputData[i].split('')
                PhaseTwoInputData[i] = PhaseTwoInputData[i].split('')
            }

            var resultChanged = true
            var Rounds = 0
            // Phase 1
            while (resultChanged && Rounds < 10000) {
                resultChanged = false
                var nextRoundData = []

                for (let i = 0; i < inputData.length; i++) {
                    nextRoundData.push(inputData[i].slice(0)) // new data
                }
                
                for (let y = 0; y < inputData.length; y++) {
                    for (let x = 0; x < inputData[y].length; x++) {
                        if (inputData[y][x] == 'L') {
                            if (this.FindAdjacentOccupiedAmount(x, y, inputData) == 0) {
                                nextRoundData[y][x] = '#'
                            }
                        }
                        else if (inputData[y][x] == '#') {
                            if (this.FindAdjacentOccupiedAmount(x, y, inputData) >= 4) {
                                nextRoundData[y][x] = 'L'
                            }
                        }

                        if (!resultChanged)
                            resultChanged = nextRoundData[y][x] != inputData[y][x]
                    }
                }

                inputData = []
                for (let i = 0; i < nextRoundData.length; i++) {
                    inputData.push(nextRoundData[i].slice(0))
                }

                Rounds++
            }

            // inputData = inputData.join('')
            // console.log(inputData)
            inputData = inputData.join('').split('')
            this.SetResult(inputData.filter((x) => x == "#").length)

            // Phase 2
            resultChanged = true
            Rounds = 0
            while (resultChanged && Rounds < 1000) {
                resultChanged = false
                nextRoundData = []

                for (let i = 0; i < PhaseTwoInputData.length; i++) {
                    nextRoundData.push(PhaseTwoInputData[i].slice(0))
                }

                for (let y = 0; y < PhaseTwoInputData.length; y++) {
                    for (let x = 0; x < PhaseTwoInputData[y].length; x++) {
                        if (PhaseTwoInputData[y][x] == 'L') {
                            if (this.FindForwardOccupiedAmount(x, y, PhaseTwoInputData) == 0) {
                                nextRoundData[y][x] = '#'
                            }
                        }
                        else if (PhaseTwoInputData[y][x] == '#') {
                            if (this.FindForwardOccupiedAmount(x, y, PhaseTwoInputData) >= 5) {
                                nextRoundData[y][x] = 'L'
                            }
                        }

                        if (!resultChanged)
                            resultChanged = nextRoundData[y][x] != PhaseTwoInputData[y][x]
                    }
                }

                PhaseTwoInputData = []
                for (let i = 0; i < nextRoundData.length; i++) {
                    PhaseTwoInputData.push(nextRoundData[i].slice(0))
                }
                
                Rounds++
            }

            PhaseTwoInputData = PhaseTwoInputData.join('').split('')
            this.SetResult(PhaseTwoInputData.filter((x) => x == '#').length)
        },
        FindAdjacentOccupiedAmount(x, y, inputData) {
            var result = []
            for (let i = y-1; i <= y+1; i++) {
                if (i < 0 || i >= inputData.length) {
                    continue
                }

                for (let j = x-1; j <= x+1; j++) {
                    
                    if (j < 0 || j >= inputData[i].length) {
                        continue
                    }
                        
                    if (i != y || j != x) {
                        result.push(inputData[i][j])
                    }
                }
            }
            result = result.filter((x) => x == '#')
            
            return result ? result.length : 0
        },
        FindForwardOccupiedAmount(x, y, inputData) {
            var result = []
            for (let xD = -1; xD <= 1; xD++) {
                for (let yD = -1; yD <= 1; yD++){
                    if (xD == 0 && yD == 0)
                        continue

                    result.push(this.FindFirstInDirection(x, y, xD, yD, inputData))
                }
            }
            result = result.filter((x) => x == '#')

            return result ? result.length : 0
        },
        FindFirstInDirection(xPos, yPos, xDir, yDir, inputData) {
            var xEof = false
            var yEof = false

            while (!xEof && !yEof) {
                
                xPos += xDir
                yPos += yDir
                
                if (yPos < 0) {
                    yEof = true
                    yPos = 0
                }
                else if (yPos > inputData.length -1) {
                    yEof = true
                    yPos = inputData.length - 1
                }
                
                if (xPos < 0) {
                    xEof = true
                    xPos = 0
                }
                else if (xPos > inputData[yPos].length -1) {
                    xEof = true
                    xPos = inputData[yPos].length - 1
                }


                if (!xEof && !yEof && inputData[yPos][xPos] != '.') {
                    return inputData[yPos][xPos]
                }
            }

            return ''
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>