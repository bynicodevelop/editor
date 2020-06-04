<template>
    <default>
        <editor
                v-model="content"
                :configs="config"
                :key="markdownEditor"
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
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    if(this.$store.state.content.text === "" || this.$store.state.changedSelection) this.markdownEditor += 1

                    this.$store.commit('changedSelectionToggle')
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
    $min-height: 70px

    .vue-simplemde
        width: 100%
        height: 100%
        align-items: center
        display: flex
        flex-wrap: wrap

        .CodeMirror
            position: relative
            margin: 0 auto
            border-width: 0
            min-height: $min-height
            flex: 1 1 100%
            max-width: 630px

        .CodeMirror-vscrollbar
            right: 0
            top: 0
            overflow-x: hidden
            overflow-y: hidden

        .CodeMirror-scroll
            min-height: $min-height
            overflow-y: hidden !important
            overflow-x: hidden !important
</style>
