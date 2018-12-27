const SCORE_DIGITS = 4
const HTMLredraw = {
    updateEggPosition(data) {
        const egg = document.querySelector(`.egg.e-${data.egg}`)
        egg.className = `egg e-${data.egg} pos-${data.position}`
    },

    updateBasketPosition(data) {
        document.getElementById('wolf').className = `x${data.x}`
        document.getElementById('basket').className = `x${data.x} y${data.y}`
    },

    updateLossCount(data) {
        document.getElementById('loss').className = `loss${data.loss}`
    },

    updateScore(value) {
        var elements = document.getElementById('score').getElementsByClassName('li')
        var score = value.toString()
        var emptyElements = (SCORE_DIGITS - score.length)

        for (var i = 0; i < elements.length; i++) {
            var num = (i < emptyElements) ? 0 : parseInt(score.charAt(i - emptyElements))
            elements[i].className = `li n-${num}`
        }
    },

    gameOver() {
        this.showMessage('Game Over')
    },

    gameWin() {
        this.showMessage('You\'ve Won!')
    },

    showMessage(message) {
        var wrap = document.createElement('div')
        wrap.id = 'message'
        wrap.innerHTML = `<h3>${message}</h3><p>Press R to restart</p>`
        
        document.getElementById('game').appendChild(wrap)
    },
}
