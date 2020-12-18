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
            
            ParsedDataContainer: [{
              dataId: String,
              containsIndex: []
            }],
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
            inputData = inputData.split('\n\n')

            // --- Part One ---
            var groupAnswers = []
            
            inputData.forEach(element => {
                element = element.split('\n')
                var subElements = []

                element.forEach(subElement => {
                    subElements.push(subElement)
                });
                
                groupAnswers.push(subElements)
            });
        
            var PartOneAnswer = 0;
            for (let i = 0; i < groupAnswers.length; i++) {
                if (groupAnswers.length == 0) {
                    console.log('Found empty')
                }

                var allGroupAnswers = new Array(0)
                groupAnswers[i].map(x => x.split('').map(y => allGroupAnswers.push(y)))

                var groupSingletonAnswers = new Array(0)
                allGroupAnswers.map(x => {
                    if (!groupSingletonAnswers.includes(x)) {
                        groupSingletonAnswers.push(x)
                    }
                })
                
                PartOneAnswer += groupSingletonAnswers.length
            }
            
            this.SetResult(PartOneAnswer)

            // --- Part Two ---
            var PartTwoAnswer = 0

            groupAnswers.map(x => {
                PartTwoAnswer += this.FindDuplicantsFromArray(x).length
            })

            this.SetResult(PartTwoAnswer)

        },
        FindDuplicantsFromArray(arrays) {
            var foundItems = new Array(0)

            if(arrays.length == 0)
                return foundItems

            arrays[0].split('').map(x => {
                var Found = false;
                
                // Starting from 0 counts 1 -length arrays aswell
                for (let i = 0; i < arrays.length; i++) {
                    Found = arrays[i].includes(x)

                    if (!Found)
                        break;
                }

                if (Found)
                    foundItems.push(x)
            })

            return foundItems;
        },
        GetDatacontainerIndex(dataId) {
          var data = this.ParsedDataContainer.find(x => x.dataId = dataId)
          
          if (!data) {
            data = this.ParsedContainer.push({
              dataId: dataId,
              containsIndex: new Array(),
            })
          }
          
          return this.ParsedDataContainer.indexOf(data)
        },
        AddToContainer(dataContainerIndex, dataId) {
          var dataIndex = this.ParsedDataContainer(dataId)
          
          this.ParsedDataContainer[dataContainerIndex].containsIndex.push(dataIndex)
        },
        SetResult(Result) {
            this.TaskResult += Result.toString() + '\n'
        }
    }
}
</script>

<style>

</style>