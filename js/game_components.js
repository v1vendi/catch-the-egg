const Grid = {
    list: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
    ],
    ids: [0, 1, 2, 3],
    fallingIds: [],

    hold(key) {
        this.fallingIds.push(key)
    },

    release(key) {
        this.fallingIds = this.fallingIds.filter(i => i !== key)
    },
    
    getAvailableIds() {
        return this.ids.filter(i => !this.fallingIds.includes(i))
    },
}

const EGG_STEPS = 5
class Egg {
    constructor(id, callback) {
        this.id = id
        this.step = 0
        this.callback = callback
    }

    run(timeout) {
        this.timer = setInterval(() => this.nextStep(), timeout)
    }

    nextStep() {
        this.step++
        HTMLredraw.updateEggPosition({ egg: this.id, position: this.step })

        if (this.step <= EGG_STEPS) return

        clearInterval(this.timer)
        this.step = 0
        HTMLredraw.updateEggPosition({ egg: this.id, position: 0 })
        this.callback(this.id)
    }
}
