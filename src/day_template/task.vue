<template>
    <v-row>
        <v-col>
            <show-task-content title="Solution" :file=CurrentSolution />
            <task-app />
        </v-col>
        <v-col>
            <show-task-content title=Task :file=CurrentTaskData />
            <show-task-content title="Input data" :autoGrow="false" :file=CurrentInputData />
        </v-col>
    </v-row>
</template>

<script>
import ShowTaskContentVue from '../components/ShowTaskContent.vue'
import taskData from 'raw-loader!./task'
import inputData from 'raw-loader!./input'
import solutionData from 'raw-loader!./solution'
import task_appVue from './task_app.vue'

export default {
    components: {
        'show-task-content': ShowTaskContentVue,
        'task-app': task_appVue
    },
    data() {
        return {
            CurrentTaskData: taskData,
            CurrentInputData: inputData,
            CurrentSolution: solutionData
        }
    },
    mounted() {
    },
}
</script>

<style>

</style>