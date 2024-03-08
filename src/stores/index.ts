import { defineStore } from "pinia"

export const useStore = defineStore('useStore', {
    state: () => ({
        leftVisible: false,
    }),

    actions: {
        setLeftVisible(visible) {
            this.leftVisible = visible;
        }
    }
})
