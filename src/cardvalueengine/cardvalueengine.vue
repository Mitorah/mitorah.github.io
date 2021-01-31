<template>
    <v-app>
        <v-row>
        <card-value-engine-database :ResultData=CardSelectionResult />
        <random-card-frame :GetNewCard=GetNewCard @CardChosen=CardOneChosen @CardReceived=Card1 />
        <random-card-frame :GetNewCard=GetNewCard @CardChosen=CardTwoChosen @CardReceived=Card2 />
        </v-row>
    </v-app>
</template>

<script>
import randomCardFrameVue from './scryfallApi/randomCardFrame.vue'
import databaseApiVue from '../database.github.io/cardvalueengine.database/databaseApi.vue'


export default {
    components: {
        'random-card-frame': randomCardFrameVue,
        'card-value-engine-database': databaseApiVue
    },
    data() {
        return {
            GetNewCard: false,
            CardSelectionResult: null,
            ChosenCardName: "",
            Card1Data: null,
            Card2Data: null
        }
    },
    methods: {
        CardOneChosen() {
            this.CardSelectionResult = {
                cardWon: this.Card1Data,
                cardLost: this.Card2Data
            }
            this.GetNewCard = !this.GetNewCard
        },
        CardTwoChosen() {
            this.CardSelectionResult = {
                cardWon: this.Card2Data,
                cardLost: this.Card1Data
            }
            this.GetNewCard = !this.GetNewCard
        },
        Card1(val) {
            this.Card1Data = val
        },
        Card2(val) {
            this.Card2Data = val
        }
    }

}
</script>

<style>

</style>