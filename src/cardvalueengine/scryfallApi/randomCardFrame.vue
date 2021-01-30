<template>
    <v-app>
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
    </v-app>
</template>

<script>



export default {
    props: {
        GetNewCard: Boolean
    },
    data() {
        return {
            // https://scryfall.com/docs/api/cards/random
            JSONCardData: '',
            ButtonDisabled: false,
            ImageScale: 15
        }
    },
    watch: {
        GetNewCard() {
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
            return this.JSONCardData ? this.JSONCardData.image_uris ? this.JSONCardData.image_uris.large : '' : ''
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
            this.ButtonDisabled = true
            this.axios
                .get('https://api.scryfall.com/cards/random?-t:token%3A-t:basic')
                .then((data) => {
                    this.JSONCardData = data.data
                    this.ButtonDisabled = false
                })

            // https://api.scryfall.com
            // cards/random
        },
        ChooseCard() {
            // This card was chosen. Send it to database and load new cards
            this.$emit('CardChosen', this.JSONCardData)
        },
    }

}
</script>

<style>

</style>