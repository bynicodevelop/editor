<template>
        <v-list-item-content
                :id="id"
                class="swiper-container"
                @click="doSelect"
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
                            class="pl-5 pr-5 mt-2"
                    >
                       <v-btn
                       tile
                       icon
                       dark
                       @click.stop="doDelete"
                       >
                           <v-icon>mdi-delete</v-icon>
                       </v-btn>
                    </v-list-item-action>

                </div>
            </div>
        </v-list-item-content>

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
        methods: {
            doSelect() {
                this.$store.commit('select', this.content)
            },
            async doDelete() {
                await this.$store.commit('delete', this.content)

                this.swiper.slideTo(1, 0)
            }
        }
    }
</script>

<style scoped lang="sass">
.swiper-container
    padding: 0
    cursor: default

    >:active
        cursor: grab

    .swiper-wrapper
        display: flex

        .swiper-slide
            padding: 15px 10px 8px 10px

            .v-list-item__title
                margin-bottom: 8px
</style>
