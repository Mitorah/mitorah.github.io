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
            
            // Part One
            inputData = inputData.split('\n\n')
            var correctPassports = []
            var allPassports = []
            
            inputData.forEach(passport => {
                var splittedArray = passport.split('\n').join(' ').split(' ')
                
                if (splittedArray.length == 8 || (splittedArray.length >= 7 && !passport.includes('cid'))) {
                    correctPassports.push(splittedArray)
                }
                allPassports.push(splittedArray)
            });
            this.SetResult(correctPassports.length)

            // Part Two

            this.SetResult(this.Validate(correctPassports))
        },
        Validate(inputData) {
            var validatedPassports = 0
            
            inputData.forEach(element => {
                var validationNumber = 0

                element.forEach(passportData => {
                    passportData = passportData.split(':')
                    
                    switch(passportData[0]) {
                        case 'byr':
                            if (passportData[1].length == 4) {
                                if (passportData[1] >= 1920 && passportData[1] <= 2002)
                                    validationNumber++
                            }
                            break;
                        case 'iyr':
                            if (passportData[1].length == 4) {
                                if (passportData[1] >= 2010 && passportData[1] <= 2020)
                                    validationNumber++
                            }
                            break;
                        case 'eyr':
                            if (passportData[1].length == 4) {
                                if (passportData[1] >= 2020 && passportData[1] <= 2030)
                                    validationNumber++
                            }
                            break;
                        case 'hgt':
                            var sliced = passportData[1].slice(passportData[1].length - 2)

                            if (sliced == 'cm') {
                                sliced = passportData[1].slice(0, passportData[1].length - 2)
                                if (sliced >= 150 && sliced <= 193)
                                    validationNumber++
                            }
                            else if (sliced == 'in') {
                                sliced = passportData[1].slice(0, passportData[1].length - 2)
                                if (sliced >= 59 && sliced <= 76)
                                    validationNumber++
                            }
                            break;
                        case 'hcl':
                            if (passportData[1].split('')[0] == '#') {
                                passportData[1] = passportData[1].substring(1)

                                // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript/23476587
                                if (passportData[1].length == 6 && /^[0-9a-f]+$/.test(passportData[1])) {
                                    validationNumber++
                                }
                            } 
                            break;
                        case 'ecl':
                            if (passportData[1].length == 3) {
                                var conditions = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
                                if (conditions.includes(passportData[1])) {
                                    validationNumber++
                                }
                            }
                            break;
                        case 'pid':
                            if (passportData[1].length == 9) {
                                if (!isNaN(passportData[1])) {
                                    validationNumber++
                                }
                            }
                            break;
                        case 'cid':
                            validationNumber++
                            break;
                    }
                    
                if (element.length >= 7 && validationNumber == element.length) {
                    validatedPassports++
                }
                });
            });
            return validatedPassports
        },
        SetResult(Result) {
            this.TaskResult.push(Result.toString() + '\n')
        }
    }
}
</script>

<style>

</style>