<template>
        <v-col
        cols="12"
        md="12">
            {{title}}
            <v-textarea
            readonly
            outlined
            dense
            :auto-grow=autoGrow
            :value=file
            :height=height>
            </v-textarea>
        </v-col>
</template>

<script>
export default {
    props: {
        title: String,
        file: String,
        height:Number,
        autoGrow: {
            type: Boolean,
            default: false    
        },
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>