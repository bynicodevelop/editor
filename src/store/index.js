import Vue from 'vue'
import Vuex from 'vuex'

import ShortcutText from '../dataset/shortcut-text'

Vue.use(Vuex)

const getLastId = (contents) => {
    const keys = Object.keys(contents).map(i => parseInt(i))

    if (!keys.length)
        return 0

    return Math.max(...keys)
}

export default new Vuex.Store({
    state: {
        codemirror: null,
        shortcuts: [],
        displayPin: false,
        darkMode: false,
        selected: false,
        refresh: 0,
        localstorageSize: 0,
        search: "",
        contents: {},
        filteredContent: [],
        content: {
            id: "",
            text: "",
            pin: false
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
                text: value,
                pin: false
            }

            state.contents[newId.toString()] = state.content

            this.commit('filter', state.search)
        },
        update(state, value) {
            if (state.content.text === "" && value !== "# ") {
                this.commit("create", value)
            } else if (value !== "") {
                if (state.selected === false) state.content.date = Date.now()

                state.content.text = value

                state.selected = false
            }

            this.commit('saveContents')
        },
        search(state, value) {
            state.search = value
        },
        filter(state) {
            state.filteredContent = Object.values(state.contents).filter(el => {
                if (state.displayPin === true) {
                    return el.text !== undefined ? el.text.toLowerCase().includes(state.search.toLowerCase()) : false
                } else {
                    return el.text !== undefined && el.pin === false ? el.text.toLowerCase().includes(state.search.toLowerCase()) : false
                }
            }).sort((a, b) => b.date - a.date)
        },
        delete(state, value) {
            delete state.contents[value.id]

            if (state.content.id === value.id) {
                state.content = {
                    id: "",
                    text: "",
                    pin: false
                }
            }

            this.commit("refresh")

            this.commit('saveContents')
            this.commit('filter', state.search)
        },
        // Shortcut
        toggleToShortcut(state, value) {
            state.content = value

            this.commit("refresh")

            this.commit('saveContents')
            this.commit('filter', state.search)
        },
        updateShortcut(state) {
            state.shortcuts = [
                ...ShortcutText,
                ...Object.keys(state.contents)
                    .filter(i => state.contents[i].pin)
                    .map(i => {
                        const contentExploded = state.contents[i].text.split("\n")

                        return {
                            text: contentExploded.shift(),
                            value: state.contents[i].text.substr(0, 200),
                            content: contentExploded.join("\n")
                        }
                    })];
        },
        // Config
        toggleDisplayPin(state, value) {
            state.displayPin = value

            this.commit('saveDisplayPin')
        },
        toggleDarkMode(state, value) {
            state.darkMode = value

            this.commit('saveDarkMode')
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

            state.localstorageSize = ((total / 1024) / 1000).toFixed(2)
        },
        setContents(state) {
            let contents = JSON.parse(localStorage.getItem('contents'))
            state.contents = contents === null ? {} : contents

            this.commit('updateShortcut')
        },
        saveContents(state) {
            localStorage.setItem('contents', JSON.stringify(state.contents))

            this.commit('updateShortcut')
        },
        setDisplayPin(state) {
            state.displayPin = localStorage.getItem('displayPin') === 'true'
        },
        saveDisplayPin(state) {
            localStorage.setItem('displayPin', JSON.stringify(state.displayPin))
        },
        setDarkMode(state) {
            state.darkMode = localStorage.getItem('darkMode') === 'true'
        },
        saveDarkMode(state) {
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
        }
    },
    actions: {},
    modules: {}
})
