class KeyboardInputManager {
    constructor() {
        this.events = {}
        this.map = {
            38: { key: 0, type: 'arrow' }, // up
            39: { key: 1, type: 'arrow' }, // right
            40: { key: 2, type: 'arrow' }, // down
            37: { key: 3, type: 'arrow' }, // left
            81: { x: 0, y: 1, type: 'button' }, // q
            69: { x: 1, y: 1, type: 'button' }, // e
            68: { x: 1, y: 0, type: 'button' }, // d
            65: { x: 0, y: 0, type: 'button' }, // a
            82: { key: 'restart', type: 'common' } // r
        }

        document.addEventListener('keydown', e => this.handleKeydown(e))
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    emit(event, data) {
        var callbacks = this.events[event]
        if (!callbacks) return

        callbacks.forEach(callback => callback(data))
    }

    handleKeydown(event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

        var data = this.map[event.which]
        if (!data) return

        event.preventDefault()
        this.emit('move', data)
    }
}
