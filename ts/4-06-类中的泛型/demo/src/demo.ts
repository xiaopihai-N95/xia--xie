interface Item {
  name: string
}

class DataManager<T extends Item> {
  constructor(private data: T[]) { }
  getItem(index: number): string {
    return this.data[index].name
  }
}

/* const data = new DataManager<string>(['1'])

const res = data.getItem(0)

console.log(res) */

const data = new DataManager([{
  name: '2'
}])

const res = data.getItem(0)

console.log(res)

