<template>
    <v-container
            class="pl-0 pr-0"
            fluid
    >
        <v-list
                dense
        >
            <template
                    v-for="(content, index) in filteredContent"
            >
                <list-item
                        :key="index"
                        :id="`${index}`"
                        :content="content"
                ></list-item>
                <v-divider
                        v-if="index + 1 < filteredContent.length"
                        :key="`item-${index}`"></v-divider>
            </template>
        </v-list>
    </v-container>
</template>

<script>
    import ListItem from "./ListItem";

    export default {
        name: "list",
        data: () => ({
            edit: false
        }),
        components: {
            'list-item': ListItem
        },
        computed: {
            filteredContent() {
                this.$store.commit("filter")

                return this.$store.state.filteredContent
            }
        }
    }
</script>

<style scoped lang="sass">
    p
        width: 100%
        margin-bottom: 153px

    .list-toolbar
        z-index: 1000
        position: fixed
        bottom: 0
        right: 10px

        .v-btn:before
            background-color: inherit
</style>
