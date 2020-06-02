<template>
  <default>
    <editor
            v-model="content"
            :configs="config"
    />
  </default>
</template>

<script>
export default {
data: () => ({
  content: "",
  config: {
    toolbar: false,
    status: false,
    autofocus: true,
    spellChecker: false
  }
})
};
</script>

<style lang="sass">
$min-height : 70px

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
    max-width: calc(50% + 24px)

  .CodeMirror-vscrollbar
    right: 0
    top: 0
    overflow-x: hidden
    overflow-y: hidden

  .CodeMirror-scroll
    min-height: $min-height
    overflow-y: hidden!important
    overflow-x: hidden!important
</style>
