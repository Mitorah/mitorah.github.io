<template>
        <v-col
        cols="12"
        md="12">
            {{title}}
            <v-textarea
            outlined
            auto-grow
            :value=file>
            </v-textarea>
        </v-col>
</template>

<script>
export default {
    props: {
        title: String,
        file: String,
    },
    data() {
        return {
            TaskTitle: 'newTitle'
        }
    },
}
</script>

<style>

</style>