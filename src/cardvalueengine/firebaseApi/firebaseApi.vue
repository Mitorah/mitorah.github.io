<template>
    <v-app>
        <v-card
        class="mx-auto"
        max-width="300"
        tile>
            <v-list dense>
                <v-list-item-group>
                <v-list-item
                v-for="(card, i) in ChosenCards"
                :key=i
                >
                <v-list-item-content>
                    <v-list-item-title v-text=card />
                </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-app>
</template>

<script>
export default {
    props: {
        CardChosen: String
    },
    data() {
        return {
            ChosenCards: []
        }
    },
    watch: {
        CardChosen: function (val) {
            this.AddToChosenCards(val)
        }
    },
    methods: {
        AddToChosenCards(value) {
            this.ChosenCards.push(value)
        }
    }
}
</script>

<style>

</style>