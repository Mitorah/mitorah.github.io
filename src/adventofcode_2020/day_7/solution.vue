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

            ParsedDataContainer: [],
            Counter: 0 
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

            inputData = inputData.split(".\n")
            inputData.forEach(element => {

                element = element.split(" contain ")
                element[0] = element[0].split(' ')
                element[0][element[0].length - 1] = 'bag'
                element[0] = element[0].join(' ')

                var parsedContainsData = element[1].split(", ")
                
                var containerIdx = this.GetDatacontainerIndex(element[0])

                parsedContainsData.forEach(includeElement => {
                
                    if (includeElement != "no other bags") {
                        var splitted = includeElement.split(' ')
                        var amount = Number(splitted.shift())
                        splitted[splitted.length - 1] = 'bag'
                        
                        for (let i = 0; i < amount; i++) {
                            var bagId = splitted.join(' ')
                            
                            this.AddToContainer(containerIdx, bagId)
                        }
                    }
                });
            });

            var PhaseOneResult = 0;

            for (let i = 0; i < this.ParsedDataContainer.length; i++) {
                var value = this.ContainsBagId(i, "shiny gold bag")
                
                this.ParsedDataContainer[i].containsGoldBag = value

                if (value) {
                    PhaseOneResult++
                }
            }

            this.SetResult(PhaseOneResult)

            // -- Phase Two --
            var goldBagId = this.ParsedDataContainer.find(x => x.dataId == 'shiny gold bag')
            
            this.SetResult(this.TotalBagsFoundInside(this.ParsedDataContainer.indexOf(goldBagId), 0))

        },
        GetDatacontainerIndex(dataId) {
            var data = this.ParsedDataContainer.find(x => x.dataId == dataId)
            var idx = -1
            if (!data) {

                data = {
                    dataId: dataId,
                    containsIndex: new Array(0),
                }

                this.ParsedDataContainer.push(data)
            }

            idx = this.ParsedDataContainer.indexOf(data)
            return idx
        },
        AddToContainer(dataContainerIndex, dataId) {
            var dataIndex = this.GetDatacontainerIndex(dataId)
            
            this.ParsedDataContainer[dataContainerIndex].containsIndex.push(dataIndex)
        },
        ContainsBagId(bagIdx, bagIDToFind) {
            if (this.ParsedDataContainer[bagIdx].containsGoldBag)
                return true

            var alreadyChecked = []

            for (let i = 0; i < this.ParsedDataContainer[bagIdx].containsIndex.length; i++) {
                
                if (alreadyChecked.includes(this.ParsedDataContainer[bagIdx].containsIndex[i]))
                    continue

                alreadyChecked.push(this.ParsedDataContainer[bagIdx].containsIndex[i])
                
                var returnValue = false
                
                if (bagIDToFind == this.ParsedDataContainer[this.ParsedDataContainer[bagIdx].containsIndex[i]].dataId) {
                    return true
                }
                
                returnValue = this.ContainsBagId(this.ParsedDataContainer[bagIdx].containsIndex[i], bagIDToFind)

                if (returnValue) {
                    this.ParsedDataContainer[bagIdx].containsGoldBag = true
                    return true
                }
            }

            return false
        },
        TotalBagsFoundInside(bagIdx, amount) {
            amount += this.ParsedDataContainer[bagIdx].containsIndex.length
            
            for (let i = 0; i < this.ParsedDataContainer[bagIdx].containsIndex.length; i++) {
                amount = this.TotalBagsFoundInside(this.ParsedDataContainer[bagIdx].containsIndex[i], amount)
            }

            return amount
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>