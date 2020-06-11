<template>
    <default>
        <search
                v-shortkey="['meta', 'r']"
                @shortkey.native="show = !show"
                v-show="show"
                @selected="doAutocomplete"
                @close="show = !show"
        />
        <editor
                v-model="content"
                :configs="config"
                :key="$store.state.refresh"
                ref="editor"
                @initialized="doInitialize"
                @input="Object.keys(replaceChar).forEach(cb => replaceChar[cb]($store.state.codemirror))"
        />

    </default>
</template>

<script>
    import Search from "./components/Search"

    export default {
        data: () => ({
            show: false,
            replaceChar: {
                quote: (cm) => {
                    const openQuote = "« "
                    const closeQuote = " »"

                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()

                    const currentChar = doc.getLine(cursor.line).substr(cursor.ch - 1, 1)
                    const previousChar = doc.getLine(cursor.line).substr(cursor.ch - 2, 1)

                    if (currentChar === '"') {
                        if (previousChar === ' ' || previousChar === '.') {
                            doc.replaceRange(openQuote, {line: cursor.line, ch: cursor.ch - 1}, {
                                line: cursor.line,
                                ch: cursor.ch
                            })
                        } else {
                            doc.replaceRange(closeQuote, {line: cursor.line, ch: cursor.ch - 1}, {
                                line: cursor.line,
                                ch: cursor.ch
                            })
                        }
                    }
                }
            }
        }),
        components: {
            'search': Search,
        },
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
        },
        methods: {
            doInitialize(el) {
                this.$store.state.codemirror = el.codemirror
            },
            doAutocomplete(value) {
                if(value.content==='') return

                if(value.type === 'content') {
                    this.$store.commit('select', value.content)
                    this.$store.commit('update', value.content.text)
                } else {
                    const doc = this.$store.state.codemirror.getDoc()
                    const cursor = doc.getCursor()

                    doc.replaceRange(value.content.content, cursor)
                    this.$store.state.codemirror.focus()
                }

                this.show = !this.show
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

            .cm-header-1
                line-height: 150% !important

            .cm-header-2
                line-height: 140% !important

            .CodeMirror-sizer
                @include middle-align-flex

            .CodeMirror-scroll,
            .CodeMirror-vscrollbar
                overflow-y: hidden !important
                overflow-x: hidden !important
</style>
