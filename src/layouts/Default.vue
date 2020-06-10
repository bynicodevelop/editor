<template>
    <v-app
        dark
    >
        <v-navigation-drawer
                v-model="drawer"
                app
                stateless
        >
            <top-bar></top-bar>
            <list></list>
            <storage></storage>
        </v-navigation-drawer>

        <v-content>
            <slot/>

            <v-list
                    class="toolbar"
            >
                <v-list-item>

                    <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-width="200"
                            offset-y
                            top
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    icon
                                    :ripple="false"
                                    v-on="on"
                                    tile
                            >
                                <v-tooltip
                                        left

                                >
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-account-outline</v-icon>
                                    </template>
                                    <span>Configurations</span>
                                </v-tooltip>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-switch v-model="darkMode" color="purple"></v-switch>
                                    </v-list-item-action>
                                    <v-list-item-title>Mode sombre</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-switch v-model="displayPin" color="purple"></v-switch>
                                    </v-list-item-action>
                                    <v-list-item-title>Afficher les raccourcis</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </v-list-item>
                <v-list-item>
                    <v-btn
                            icon
                            @click.stop="drawer = !drawer"
                            :ripple="false"
                            v-shortkey="['meta', 'l']"
                            @shortkey.native="drawer = !drawer"
                            tile
                    >
                        <v-tooltip
                                left
                        >
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-code-equal</v-icon>
                            </template>
                            <span>Afficher la liste des contenus</span>
                        </v-tooltip>
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            menu: false,
            drawer: false,
        }),
        created() {
            this.$store.commit('setContents')
            this.$store.commit('setDisplayPin')
            this.$store.commit('setDarkMode')
        },
        computed: {
            darkMode: {
                get() {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.$vuetify.theme.dark = this.$store.state.darkMode

                    return this.$vuetify.theme.dark
                },
                set(value) {
                    this.$store.commit('toggleDarkMode', value)
                }
            },
            displayPin: {
                get() {
                    return this.$store.state.displayPin
                },
                set(value) {
                    this.$store.commit('toggleDisplayPin', value)
                }
            }
        }
    };
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>

<style lang="sass">
    $textcolor: #afafaf !important

    .theme--dark
        color: $textcolor

        &.v-application
            background: #212121

            .CodeMirror,
            .v-sheet
                background-color: inherit !important

            .grey
                &.lighten-5
                    background-color: #373737 !important
                    border-color: #373737 !important

                &.lighten-4
                    background-color: #444444 !important
                    border-color: #444444 !important

        &.v-navigation-drawer
            .v-divider
                border-color: #393939 !important


        .CodeMirror-cursor
            border-left: 1px solid $textcolor

        .CodeMirror-selected
            background-color: #2f2f2f !important

        .CodeMirror-placeholder,
        .CodeMirror-line,
        .v-list-item__title
            color: $textcolor

        .v-icon
            color: #484848 !important

    .toolbar
        z-index: 1000
        position: fixed
        bottom: 0
        right: 10px

        .v-btn:before
            background-color: inherit
</style>
