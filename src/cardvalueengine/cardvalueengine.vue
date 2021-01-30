<template>
    <v-app>
        <v-row>
        <random-card-frame :GetNewCard=GetNewCard @CardChosen=CardChosen />
        <random-card-frame :GetNewCard=GetNewCard @CardChosen=CardChosen />
        <firebase-api :CardChosen=ChosenCardName></firebase-api>
        </v-row>
    </v-app>
</template>

<script>
import firebaseApiVue from './firebaseApi/firebaseApi.vue'
import randomCardFrameVue from './scryfallApi/randomCardFrame.vue'


export default {
    components: {
        'random-card-frame': randomCardFrameVue,
        'firebase-api': firebaseApiVue
    },
    data() {
        return {
            GetNewCard: false,
            ChosenCardName: ""
        }
    },
    methods: {
        CardChosen(data) {
            this.ChosenCardName = data.name
            this.GetNewCard = !this.GetNewCard
        },
    }

}
</script>

<style>

</style>