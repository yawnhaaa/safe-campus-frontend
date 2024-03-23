import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      infoId: 0
    }
  },
  getters: {},
  actions: {
    storeInfoId(infoId: number) {
      this.infoId = infoId
    }
  },
})
