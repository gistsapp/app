"use client"
interface ItemWithID {
  id: string
}

class DataStorage<T extends ItemWithID> {
  private data: Map<string, T> = new Map()
  set(data: T) {
    this.data.set(data.id, data)
  }
  getItems(offset?: number, limit?: number): T[] {
    if (offset !== undefined && limit !== undefined) {
      return Array.from(this.data.values()).slice(offset, offset + limit)
    }

    return Array.from(this.data.values())
  }
}

export default DataStorage
