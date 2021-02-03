<template>
    <v-card class="pa-2" outlined tile> 
        <v-btn :disabled=IsButtonDisabled :width=ImageMaxWidth :height=ImageMaxHeight @click="ChooseCard">
            <v-img :width=ImageMaxWidth :height=ImageMaxHeight 
            :src=CardImageUrl
            :lazy-src=CardBackImageUrl>
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center">
                        <v-progress-circular
                        indeterminate
                        color="grey lighten-5">
                        </v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-btn>
    </v-card>
</template>

<script>



export default {
    props: {
        GetNewCard: Boolean,
        GetNewCardDelay: Number,
        CardSlot: String
    },
    data() {
        return {
            // https://scryfall.com/docs/api/cards/random
            JSONCardData: '',
            ButtonDisabled: true,
            ImageScale: 7,
        }
    },
    watch: {
        GetNewCard() {
            this.JSONCardData = null
            this.GetRandomCard()
        }
    },
    computed: {
        ImageMaxHeight() {
            return 35 * this.ImageScale
        },
        ImageMaxWidth() {
            return 25 * this.ImageScale
        },
        IsButtonDisabled() {
            return this.ButtonDisabled
        },
        CardName() {
            return this.JSONCardData ? this.JSONCardData.name : ''
        },
        CardImageUrl() {
            return this.JSONCardData ? this.JSONCardData.image_uris ? this.JSONCardData.image_uris.normal : this.CardBackImageUrl : this.CardBackImageUrl
        },
        CardBackImageUrl() {
            return require('@/cardvalueengine/images/mtg_card_back.jpg')
        },
    },
    mounted() {
        this.GetRandomCard()
    },
    methods: {
        GetRandomCard() {
            setTimeout(() => {
                
            this.ButtonDisabled = true

            this.axios
                .get('https://api.scryfall.com/cards/random?q=-t%3Atoken+-t%3Aland+t%3Aplaneswalker&version=normal')
                .then((data) => {
                    this.JSONCardData = data.data
                    this.ButtonDisabled = false
                    this.$emit('CardReceived', this.JSONCardData)
                })
                .catch(() => {
                    console.error("Retrying...")
                    this.GetRandomCard()
                })

            // https://api.scryfall.com
            // cards/random
            }, this.GetNewCardDelay)
        },
        ChooseCard() {
            // This card was chosen. Send it to database and load new cards
            this.ButtonDisabled = true
            this.$emit('CardChosen')
        },
    }

}
</script>

<style>

</style>