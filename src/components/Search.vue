<template>
    <v-container
            fill-height
            @click="click"
    >
        <v-flex>
            <v-autocomplete
                    no-filter
                    v-model="model"
                    :items="filteredItems"
                    solo
                    label="Recherche..."
                    :search-input.sync="search"
                    :item-value="value"
                    autofocus
                    append-icon=""
                    return-object
            >
                <template v-slot:item="{ item }">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text.split('\n')[0].replace('# ', '')"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                    </v-list-item-content>
                </template>
            </v-autocomplete>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "search",
        data: () => ({
            value: 'text',
            model: '',
            search: '',
            filteredItems: []
        }),
        methods: {
           click(e) {
               if(e.target.classList.value !== '') {
                   this.$emit('close')
               }
           }
        },
        watch: {
            model(value) {
                this.$nextTick(() => {
                    this.model = ''
                    this.search = null
                })

                this.$emit('selected', {
                    content: value,
                    type: this.value === 'text' ? 'content' : 'shortcut'
                })
            },
            search(val) {
                let searchString = val
                this.value = 'text'
                let values = Object.keys(this.$store.state.contents).map(i => this.$store.state.contents[i])

                if (searchString === '' || searchString === null) {
                    this.filteredItems = values
                    return
                }

                if (val.substr(0, 1) === '/') {
                    this.value = 'value'

                    searchString = val.substr(1, val.length)
                    values = this.$store.state.shortcuts
                }

                this.filteredItems = values.filter(d => d.text.toLowerCase().includes(searchString.toLowerCase()))
            }
        }
    }
</script>

<style scoped lang="sass">
    .container
        background-color: rgba(0, 0, 0, 0.5)
        z-index: 1000
        position: fixed
        top: 0
        left: 0
        max-width: inherit !important

        .v-autocomplete
            position: relative
            margin: 0 auto 200px auto
            max-width: 550px
</style>
