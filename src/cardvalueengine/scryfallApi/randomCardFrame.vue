<template>
    <v-app>
        <v-btn :disabled=IsButtonDisabled :width=ImageMaxWidth :height=ImageMaxHeight @click="ChooseCard">
            <v-img :width=ImageMaxWidth :height=ImageMaxHeight :src=CardImageUrl />
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
        }
    },
    mounted() {
        this.GetRandomCard()
    },
    methods: {
        GetRandomCard() {
            this.ButtonDisabled = true
            this.axios
                .get('https://api.scryfall.com/cards/random')
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