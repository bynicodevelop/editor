<template>
    <v-hover v-slot:default="{ hover }">
        <v-list-item-content
                :id="id"
                class="swiper-container"
                @click="doSelect"
                :class="{ 'grey lighten-5': hover, 'grey lighten-4' : contentSelected.id === content.id  }"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <v-list-item-title
                            class="text-uppercase"
                    >
                        {{ '' || content.text.split('\n')[0].replace('# ', '') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ content.text }}
                    </v-list-item-subtitle>
                </div>
                <div class="swiper-slide red darken-1">
                    <v-list-item-action
                            class="pl-5 mt-2 mr-0"
                    >
                        <v-btn
                                tile
                                icon
                                dark
                                @click.stop="doDelete"
                        >
                            <v-tooltip
                                    top
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">mdi-delete</v-icon>
                                </template>
                                <span>Supprimer</span>
                            </v-tooltip>
                        </v-btn>

                    </v-list-item-action>

                    <v-list-item-action
                            class="mt-2"
                    >
                        <v-btn
                                tile
                                icon
                                dark
                                @click.stop="doPin"
                        >
                            <v-tooltip
                                    top
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon v-if="!content.pin" v-on="on">mdi-pin</v-icon>
                                    <v-icon v-else>mdi-pin-off</v-icon>
                                </template>
                                <span>Créer un raccourci</span>
                            </v-tooltip>
                        </v-btn>

                    </v-list-item-action>
                </div>
            </div>
        </v-list-item-content>
    </v-hover>
</template>

<script>
    import {Swiper} from 'swiper/js/swiper.esm'

    export default {
        name: 'list-item',
        data: () => ({
            swiper: null
        }),
        props: {
            id: {
                type: String
            },
            content: {
                type: Object
            }
        },
        mounted() {
            //const self = this
            const el = '#' + this.id

            // Initialize Swiper
            this.swiper = new Swiper(el, {
                initialSlide: 0,
                resistanceRatio: 0,
                speed: 150,
                loop: true
            })
        },
        computed: {
            contentSelected() {
                return this.$store.state.content
            },
        },
        methods: {
            doSelect() {
                this.$store.commit('select', this.content)
            },
            async doDelete() {
                await this.$store.commit('delete', this.content)

                this.swiper.slideTo(1, 0)
            },
            doPin() {
                this.content.pin = !this.content.pin

                this.$store.commit('toggleToShortcut', this.content)

                this.swiper.slideTo(1, 0)
            }
        }
    }
</script>

<style scoped lang="sass">
    .swiper-container
        padding: 0
        cursor: default
        transition: background-color .4s ease-in-out

        > :active
            cursor: grab

        .swiper-wrapper
            display: flex

            .swiper-slide
                padding: 15px 10px 8px 10px

                &.swiper-slide-active
                    .v-icon
                        color: #FFF !important

                .v-list-item__title
                    margin-bottom: 8px

</style>
