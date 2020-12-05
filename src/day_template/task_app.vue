<template>
    <div>
        <show-task-content :title=TaskNumber :file=TaskResult></show-task-content>
    </div>
</template>

<script>
import ShowTaskContentVue from '../components/ShowTaskContent.vue'
export default {
    components: {
        'show-task-content': ShowTaskContentVue
    },
    data() {
        return {
            TaskNumber: 'This variable contains the title. Maybe Day 1 or so.',
            TaskResult: 'This variable contains the result'
        }
    }

}
</script>

<style>

</style>