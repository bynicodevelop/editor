<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                app
                stateless
        >
            <v-container>
                <v-text-field
                        label="Recherche"
                        dense
                        hide-details
                        append-outer-icon="mdi-pencil-box-outline"
                        @click:append-outer="create"
                        clearable
                ></v-text-field>
            </v-container>

            <v-list dense>
                <v-list-item
                        v-for="(content, index) in contents"
                        :key="index"
                        link
                        three-line
                >
                    <v-list-item-content>
                        <v-list-item-title class="text-uppercase">{{ content.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ content.text }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <slot />

            <v-list
            class="toolbar"
            >
                <v-list-item>
                    <v-btn
                            icon
                            :ripple="false"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-list-item>
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
            contents: [
                {
                    title: "content 1",
                    text: "# test" +
                        "lorem lkd jls hqlshlqh kbqkjbsbf ksdjbf sdf" +
                        "d fsdf;,nsd;jbfs m%QLSJ FLS SDH SSD"
                },
                {
                    title: "content 2",
                    text: "# test" +
                        "lorem lkd jls hqlshlqh kbqkjbsbf ksdjbf sdf" +
                        "d fsdf;,nsd;jbfs m%QLSJ FLS SDH SSD"
                },
                {
                    title: "content 3",
                    text: "# test" +
                        "lorem lkd jls hqlshlqh kbqkjbsbf ksdjbf sdf" +
                        "d fsdf;,nsd;jbfs m%QLSJ FLS SDH SSD"
                }
            ]
        }),
        methods: {
            create() {
                console.log("coucou");
            }
        }
    };
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>

<style lang="sass">
    .toolbar
        z-index: 1000
        position: fixed
        bottom:  0
        right: 10px

    .v-btn:before
        background-color: inherit
</style>
