<template>
    <v-row>
        <v-col>
            <show-task-content title="Result" :file=resultData />
            <show-task-content title="Solution" :file=solutionData />
        </v-col>
        <v-col>
            <show-task-content title=Task :file=taskData />
            <show-task-content title="Input data" :autoGrow="false" :file=inputData />
        </v-col>
    </v-row>
</template>

<script>
import ShowFileContentVue from '../components/ShowFileContent.vue'

export default {
    props: {
        taskData: String,
        inputData: String,
        solutionData: String,
        resultData: String,
    },
    components: {
        'show-task-content': ShowFileContentVue,
    },
    data() {
        return {
        }
    },
    mounted() {
    },
}
</script>

<style>

</style>