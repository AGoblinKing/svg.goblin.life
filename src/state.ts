import { Value } from "./value";

// Window State
export const isTall = new Value(window.innerHeight > window.innerWidth)
window.addEventListener("resize", () => {
    isTall.setIfChanged(window.innerHeight > window.innerWidth)
})

// Editing State
export const show_editor = new Value(false)

export enum ETool { Erase, Paint, Select }
export const tool = new Value<ETool>(undefined)

export enum ETransform { Rotate, Scale, Translate }
export const transform = new Value(ETransform.Translate)
export const local = new Value(false)

export const selection = new Value<any>()

export enum EGrid { Item = 1 / 5, Cell = 1, Area = 5 }
export const grid = new Value<number>(EGrid.Cell)


// Timing
export const tick = new Value(0)
function Tock() {
    requestAnimationFrame(Tock)
    tick.set(tick.$ + 1)
}
Tock()