<template>
    <v-container>
        <v-text-field
                v-model="search"
                label="Recherche"
                dense
                hide-details
                append-outer-icon="mdi-pencil-box-outline"
                v-shortkey="['meta', 'n']"
                @shortkey.native="doCreate"
                @click:append-outer="doCreate"
                clearable
        ></v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: "top-bar",
        computed: {
            search: {
                get() {
                    return this.$store.state.search
                },
                set(value) {
                    this.$store.state.search = value === null ? "" : value
                    this.$store.commit("filter")
                }
            },
        },
        methods: {
            doCreate() {
                this.$store.commit('create', "# ")
                this.$store.commit('refresh')
            },
        }
    }
</script>
