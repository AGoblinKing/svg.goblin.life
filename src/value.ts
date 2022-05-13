import { ImmortalStorage, IndexedDbStore } from "immortal-db"

export type ICancel = () => void
export type FSubscribe<T> = (value: T) => any

const db = new ImmortalStorage([IndexedDbStore])

export class Value<T> {
  $: T
  dbUpdated: Promise<boolean>

  protected reactions: Set<FSubscribe<T>>

  constructor(value: T = undefined as any) {
    this.$ = value
  }

  set(value: T) {
    this.$ = value
    this.poke()

    return this
  }

  on(subscribe: FSubscribe<T>): ICancel {
    if (this.reactions === undefined) {
      this.reactions = new Set()
    }

    this.reactions.add(subscribe)

    subscribe(this.$)
    return () => this.reactions.delete(subscribe)
  }

  subscribe(subscribe: FSubscribe<T>) {
    return this.on(subscribe)
  }

  log(msg) {
    this.on(() => console.log(msg, this.$))
    return this
  }

  poke() {
    if (this.reactions === undefined) return

    for (let callback of this.reactions) {
      callback(this.$)
    }

    return this
  }

  not(store: Value<boolean>) {

    store.on(($v) => {
      if (!$v || !this.$) return
      // @ts-ignore
      this.set(false)
    })

    this.on(($v) => {
      if (!$v || !store.$) return
      store.set(false)
    })

    return this
  }

  // leaky
  save(where: string) {
    let first = true;

    this.dbUpdated = new Promise(async (resolve, reject) => {
      window[`_${where}`] = this
      try {
        const v = JSON.parse(await db.get(where))

        if (v !== undefined && v !== null) {
          this.set(v)
          if (first) {
            first = false
            resolve(v)
          }
        }
      } catch (ex) {
        reject(false)
        throw ex
      }

      // the leak
      this.on(async (v) => {
        await db.set(where, JSON.stringify(v))
      })
    })


    return this
  }

  setIfChanged(value: T) {
    if (this.$ !== value) {
      this.set(value)
    }
    return this
  }
}