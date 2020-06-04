import Vue from 'vue'
import Vuex from 'vuex'

import contents from '../../test/data'

Vue.use(Vuex)

const getLastId = (contents) => {
    const keys = Object.keys(contents).map(i => parseInt(i))

    return Math.max(...keys)
}

export default new Vuex.Store({
    state: {
        changedSelection: false,
        search: "",
        contents,
        filteredContent: [],
        content: {
            text: ""
        },
        config: {
            toolbar: false,
            status: false,
            autofocus: false,
            spellChecker: false,
            placeholder: "# Laissez libre cours à votre imagination..."
        }
    },
    getters: {
        search: state => state.search
    },
    mutations: {
        select: function (state, value) {
            state.content = value
            state.changedSelection = true
        },
        create(state, value = "") {
            const newId = getLastId(state.contents) + 1

            state.content = {
                id: newId.toString(),
                text: value
            }

            state.contents[newId.toString()] = state.content

            this.commit('filter', state.search)
            state.changedSelection = true
        },
        update(state, value) {
            if(state.content.text === "" && value !== "") {
                this.commit("create", value)
            } else if(value !== "") {
                state.content.text = value
            }
        },
        search(state, value) {
            state.search = value
        },
        filter(state) {
            state.filteredContent = Object.values(state.contents).filter(el => {
                return el.text !== undefined ? el.text.toLowerCase().includes(state.search.toLowerCase()) : false
            })
        },
        changedSelectionToggle(state) {
            state.changedSelection = false
        },
        delete(state, value) {
            delete state.contents[value.id]

            this.commit('filter', state.search)
        }
    },
    actions: {},
    modules: {}
})
