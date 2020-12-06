<template>
        <v-col
        cols="12"
        md="12">
            {{title}}
            <v-textarea
            readonly
            outlined
            :auto-grow=autoGrow
            :value=file>
            </v-textarea>
        </v-col>
</template>

<script>
export default {
    props: {
        title: String,
        file: String,
        autoGrow: {
            type: Boolean,
            default: true    
        }
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>