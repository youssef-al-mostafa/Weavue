import type { city } from '@/types/city'
import { reactive } from 'vue'

export const cities = reactive({
  list: [] as Array<string>,
  addCity(city: string) {
    this.list.push(city)
  },
  removeCity(index: number) {
    this.list.splice(index, 1)
  },
  clearCities() {
    this.list = []
  }
})