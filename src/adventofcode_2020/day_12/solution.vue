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
            
            // Phase one
            inputData = inputData.split('\n')
            var ShipDirections = ['N','E','S','W']
            var ShipPosition = {
                EW: 0,
                NS: 0
            } // EW, NS, position
            var CurrentDirection = 1 // Starting direction is east (E)

            var command, c1, c2, cached

            for (let i = 0; i < inputData.length; i++) {
                command = inputData[i].split('')
                c1 = command.shift()
                c2 = +command.join('')

                if (c1 == 'F')
                    c1 = ShipDirections[CurrentDirection]

                switch (c1) {
                    case 'N':
                        ShipPosition.NS += c2
                        break
                    case 'S':
                        ShipPosition.NS -= c2
                        break
                    case 'E':
                        ShipPosition.EW += c2
                        break
                    case 'W':
                        ShipPosition.EW -= c2
                        break
                    case 'R':
                        c2 = c2 / 90
                        CurrentDirection += c2
                        CurrentDirection = CurrentDirection > 3 ? CurrentDirection - 4 : CurrentDirection
                        break
                    case 'L':
                        c2 = c2 / 90
                        CurrentDirection -= c2
                        CurrentDirection = CurrentDirection < 0 ? CurrentDirection + 4 : CurrentDirection
                        break
                    default:
                        break
                }
            }

            this.SetResult(Math.abs(+ShipPosition.EW) + Math.abs(+ShipPosition.NS))

            // Phase two
            ShipPosition = {
                EW: 0,
                NS: 0
            }
            var NavigationPosition = {
                EW: 10,
                NS: 1
            }

            for (let i = 0 ; i < inputData.length; i++) {
                command = inputData[i].split('')
                c1 = command.shift()
                c2 = +command.join('')
                switch(c1) {
                    case 'F':
                        var NSDirection = NavigationPosition.NS - ShipPosition.NS
                        var EWDirection = NavigationPosition.EW - ShipPosition.EW

                        for (let j = 0; j < c2; j++) {
                            ShipPosition.EW += EWDirection
                            ShipPosition.NS += NSDirection
                        }

                        NavigationPosition.EW = (ShipPosition.EW + EWDirection)
                        NavigationPosition.NS = (ShipPosition.NS + NSDirection)
                        break
                    case 'N':
                        NavigationPosition.NS += c2
                        break
                    case 'S':
                        NavigationPosition.NS -= c2
                        break
                    case 'E':
                        NavigationPosition.EW += c2
                        break
                    case 'W':
                        NavigationPosition.EW -= c2
                        break
                    case 'R':
                        c2 = c2 / 90
                        NavigationPosition.EW = NavigationPosition.EW - ShipPosition.EW
                        NavigationPosition.NS = NavigationPosition.NS - ShipPosition.NS
                        for (let j = 0; j < c2; j++) {
                            cached = NavigationPosition.EW
                            NavigationPosition.EW = NavigationPosition.NS
                            NavigationPosition.NS = cached * -1
                        }
                        NavigationPosition.EW = NavigationPosition.EW + ShipPosition.EW
                        NavigationPosition.NS = NavigationPosition.NS + ShipPosition.NS
                        break
                    case 'L':
                        c2 = c2 / 90
                        NavigationPosition.EW = NavigationPosition.EW - ShipPosition.EW
                        NavigationPosition.NS = NavigationPosition.NS - ShipPosition.NS
                        for (let j = 0; j < c2; j++) {
                            cached = NavigationPosition.NS
                            NavigationPosition.NS = NavigationPosition.EW
                            NavigationPosition.EW = cached * -1
                        }
                        NavigationPosition.EW = NavigationPosition.EW + ShipPosition.EW
                        NavigationPosition.NS = NavigationPosition.NS + ShipPosition.NS
                        break
                    default:
                        break
                }
            }

            this.SetResult(Math.abs(+ShipPosition.EW) + Math.abs(+ShipPosition.NS))

        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>