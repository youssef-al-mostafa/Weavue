import { reactive } from 'vue'
import { location } from './locationStore'

export const cities = reactive({
  list: [] as Array<string>,
  addCity(city: string) {
    const maxCities = location.lat !== null && location.long !== null ? 5 : 6;
    if (this.list.includes(city)) {
      return; 
    }
    if (this.list.length >= maxCities) {
      this.list.shift(); 
    }
    this.list.push(city);
  },
  removeCity(index: number) {
    this.list.splice(index, 1);
  },
  clearCities() {
    this.list = [];
  }
});