<template>
    <v-container fill-height>
        <v-flex>
            <v-autocomplete
                    v-model="model"
                    :items="filteredItems"
                    solo
                    label="Que cherchez-vous ?"
                    :search-input.sync="search"
                    item-value="title"
                    autofocus
                    append-icon=""
                    return-object
                    light
            >
                <template v-slot:item="{ item }">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.value"></v-list-item-subtitle>
                    </v-list-item-content>
                </template>
            </v-autocomplete>
        </v-flex>
    </v-container>

</template>

<script>
    export default {
        name: "autocomplete",
        data: () => ({
            model: '',
            search: '',
            filteredItems: []
        }),
        mounted() {
            this.filteredItems = this.items
        },
        computed: {
            items: {
                get() {
                    return this.$store.state.shortcuts
                },
            }
        },
        watch: {
            model(val) {
                this.$emit('selected', val)

                this.model = ''
                this.search = ''
            },
            search(val) {
                if (val === '' || val === null) {
                    this.filteredItems = this.items
                    return
                }

                this.filteredItems = this.items.filter(d => d.text.toLowerCase().includes(val.toLowerCase()))
            }
        }
    }
</script>

<style scoped lang="sass">
    .container
        z-index: 1000
        position: absolute
        top: 0
        left: 0

        .v-autocomplete
            position: relative
            margin: 0 auto 200px auto
            max-width: 550px
</style>
