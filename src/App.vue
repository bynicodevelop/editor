<template>
    <default>
        <editor
                v-model="content"
                :configs="config"
                :key="$store.state.refresh"
                ref="editor"
                @initialized="doInitialize"
                v-shortkey="['ctrl', 'space']"
                @shortkey.native="show = !show"
                @input="Object.keys(replaceChar).forEach(cb => replaceChar[cb](codemirror))"
        />
        <autocomplete
         v-show="show"
         @selected="doAutocomplete"
        />
    </default>
</template>

<script>
    import Autocomplete from "./components/Autocomplete";

    export default {
        data: () => ({
            codemirror: null,
            show: false,
            replaceChar: {
                quote: (cm) => {
                    const openQuote = "« "
                    const closeQuote = " »"

                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()

                    const currentChar = doc.getLine(cursor.line).substr(cursor.ch - 1, cursor.ch)
                    const previousChar = doc.getLine(cursor.line).substr(cursor.ch - 2, 1)

                    if (currentChar === '"') {
                        if (previousChar === ' ') {
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
            'autocomplete': Autocomplete
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
                this.codemirror = el.codemirror
            },
            doAutocomplete(value) {
                if(value==='') return

                this.show = !this.show

                const doc = this.codemirror.getDoc()
                const cursor = doc.getCursor()

                doc.replaceRange(value.content, cursor)
                this.codemirror.focus()
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
