<template>
    <default>
        <editor
                v-model="content"
                :configs="config"
                :key="$store.state.refresh"
        />
    </default>
</template>

<script>
    export default {
        data: () => ({
            markdownEditor: 0
        }),
        computed: {
            config: {
                get() {
                    return this.$store.state.config
                }
            },
            content: {
                get() {
                    return this.$store.state.content.text
                },
                set(value) {
                    this.$store.commit('update', value)
                }
            }
        }
    };
</script>

<style lang="sass">
    @mixin middle-align-flex
        height: 100%
        align-items: center
        display: flex
        flex-wrap: wrap

    $min-height: 200px

    .vue-simplemde
        @include middle-align-flex
        width: 100%

        .CodeMirror
            width: 100%
            height: 100%
            position: relative
            margin: 0 auto
            border-width: 0 !important
            max-width: 630px

            .CodeMirror-sizer
                @include middle-align-flex


            .CodeMirror-scroll,
            .CodeMirror-vscrollbar
                overflow-y: hidden !important
                overflow-x: hidden !important
</style>
