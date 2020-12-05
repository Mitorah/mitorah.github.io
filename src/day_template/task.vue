<template>
    <v-row>
        <v-col>
            <task-app />
        </v-col>
        <v-col>
            <show-task-content title=Task :file=CurrentTaskData />
            <show-task-content title="Input data" :file=CurrentInputData />
        </v-col>
    </v-row>
</template>

<script>
import ShowTaskContentVue from '../components/ShowTaskContent.vue'
import taskData from 'raw-loader!./task'
import inputData from 'raw-loader!./input'
import task_appVue from './task_app.vue'

export default {
    components: {
        'show-task-content': ShowTaskContentVue,
        'task-app': task_appVue
    },
    data() {
        return {
            CurrentTaskData: taskData,
            CurrentInputData: inputData
        }
    },
    mounted() {
    },
}
</script>

<style>

</style>