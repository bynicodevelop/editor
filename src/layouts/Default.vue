<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                app
                stateless
        >
            <top-bar></top-bar>
            <list></list>
        </v-navigation-drawer>

        <v-content>
            <slot/>

            <v-list
                    class="toolbar"
            >
<!--                <v-list-item>-->
                    <!--                    <v-btn-->
                    <!--                            icon-->
                    <!--                            :ripple="false"-->
                    <!--                    >-->
                    <!--                        <v-icon>mdi-pencil</v-icon>-->
                    <!--                    </v-btn>-->
<!--                </v-list-item>-->
                <v-list-item>
                    <v-btn
                            icon
                            @click.stop="drawer = !drawer"
                            :ripple="false"
                            tile
                    >
                        <v-icon>mdi-code-equal</v-icon>
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: true,
        })
    };
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>

<style lang="sass">
    .toolbar
        z-index: 1000
        position: fixed
        bottom: 0
        right: 10px

        .v-btn:before
            background-color: inherit
</style>
