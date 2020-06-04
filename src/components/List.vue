<template>
    <div>
        <v-list dense>
            <template
                    v-for="(content, index) in filteredContent"
            >
                <list-item
                        direction="left"
                        :key="index"
                        :id="`${index}`"
                        :content="content"
                ></list-item>
                <v-divider
                        v-if="index + 1 < filteredContent.length"
                        :key="`item-${index}`"></v-divider>
            </template>
        </v-list>
    </div>
</template>

<script>
    import ListItem from "./ListItem";

    export default {
        name: "list",
        data: () => ({
            edit: false
        }),
        components:{
            'list-item': ListItem
        },
        computed: {
            contents: {
                get() {
                    return this.$store.state.contents
                }
            },
            filteredContent() {
                this.$store.commit("filter")

                return this.$store.state.filteredContent
            }
        }
    }
</script>

<style scoped lang="sass">
    .list-toolbar
        z-index: 1000
        position: fixed
        bottom: 0
        right: 10px

        .v-btn:before
            background-color: inherit
</style>
