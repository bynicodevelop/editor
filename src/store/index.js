import Vue from 'vue'
import Vuex from 'vuex'

// import contents from '../../test/data'

Vue.use(Vuex)

const getLastId = (contents) => {
    const keys = Object.keys(contents).map(i => parseInt(i))

    if(!keys.length)
        return 0

    return Math.max(...keys)
}

export default new Vuex.Store({
    state: {
        selected: false,
        refresh: 0,
        localstorageSize: 0,
        search: "",
        contents: {},
        filteredContent: [],
        content: {
            id: "",
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
        refresh(state) {
            state.refresh += 1
        },
        select: function (state, value) {
            state.selected = true
            state.content = value
            this.commit("refresh")
        },
        create(state, value = "") {
            const newId = getLastId(state.contents) + 1

            state.content = {
                date: Date.now(),
                id: newId.toString(),
                text: value
            }

            state.contents[newId.toString()] = state.content

            this.commit('filter', state.search)
        },
        update(state, value) {
            if(state.content.text === "" && value !== "# ") {
                this.commit("create", value)
            } else if(value !== "") {
                if(state.selected === false) state.content.date = Date.now()

                state.content.text = value

                state.selected = false
            }

            this.commit('saveInLocalStorage')
        },
        search(state, value) {
            state.search = value
        },
        filter(state) {
            state.filteredContent = Object.values(state.contents).filter(el => {
                return el.text !== undefined ? el.text.toLowerCase().includes(state.search.toLowerCase()) : false
            }).sort((a, b) => b.date - a.date)
        },
        delete(state, value) {
            delete state.contents[value.id]

            if(state.content.id === value.id) {
                state.content = {
                    id: "",
                    text: ""
                }
            }

            this.commit("refresh")

            this.commit('saveInLocalStorage')
            this.commit('filter', state.search)
        },
        // LocalStorage
        calculateLocalStorageSize(state) {
            let total = 0,
                len, x;

            for (x in localStorage) {
                // eslint-disable-next-line no-prototype-builtins
                if (!localStorage.hasOwnProperty(x)) {
                    continue;
                }
                len = ((localStorage[x].length + x.length) * 2);
                total += len;
            }

            state.localstorageSize = ((total / 1024)/1000).toFixed(2)
        },
        loadLocalStorage(state) {
            let contents = localStorage.getItem('contents')
            state.contents =  contents === null ? {} : JSON.parse(contents)
        },
        saveInLocalStorage(state) {
            localStorage.setItem('contents', JSON.stringify(state.contents))
        }
    },
    actions: {},
    modules: {}
})
