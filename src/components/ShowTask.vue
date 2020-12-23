<template>
    <v-row>
        <v-col>
            <show-task-content 
              v-for = "(item, index) in resultData"
              :key="index"
              :title="('Part '+(index+1)).toString()"
              :file=item 
              :autoGrow="true"
              :height="60" />
            <show-task-content 
            title="Solution" 
            :file=solutionData 
            :height="height"/>
        </v-col>
        <v-col>
            <show-task-content 
            title=Task 
            :file=taskData 
            :height="height"/>
            <show-task-content 
            title="Input data" 
            :autoGrow="false" 
            :file=inputData 
            :height="height"/>
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
        resultData: Array,
        height:{
            type: Number,
            default: 600
        }
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