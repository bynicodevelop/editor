<template>
    <v-footer
            absolute
            color="transparent"
    >
        <v-progress-linear
                :value="size"
                color="grey lighten-1"
        ></v-progress-linear>
    </v-footer>

</template>

<script>
    export default {
        name: "storage",
        data: () => ({
            size: 0
        }),
        created() {
            this.$store.commit('calculateLocalStorageSize')

            this.size = this.$store.state.localstorageSize / 5 * 100
        }
    }
</script>
