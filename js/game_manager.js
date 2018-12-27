const POINTS_PER_EGG = 2
const MAX_SCORE = 1000
const MAX_MISSES = 2
const STEPS_PER_SECOND = 1.25

class GameManager {
    constructor() {
        this.score = 0
        this.loss = 0
        this.over = false
        this.level = 1
        this.timeout = 1 / STEPS_PER_SECOND * 1000
        this.basket = { x: 0, y: 1 }

        const eggsCount = 4

        this.eggs = []
        for (var i = 0; i < eggsCount; i++) {
            this.eggs[i] = new Egg(i, i => this.onEggDrop(i))
        }

        this.keyboard = new KeyboardInputManager()
        this.keyboard.on('move', data => this.move(data))

        this.runStep()
    }

    move(data) {
        var x = this.basket.x
        var y = this.basket.y 

        switch (data.type) {
            case 'arrow':
                // 0: up, 1: right, 2: down, 3: left, 4: R - restart
                if (data.key % 2 == 0) {
                    y = (data.key > 0) ? 0 : 1
                }
                else {
                    x = (data.key > 2) ? 0 : 1
                }
                break;
            case 'button':
                x = data.x
                y = data.y
                break;
            case 'common':
                if (data.key == 'restart') {
                    this.restart()
                    return
                }
                break
        }
        this.basket.x = x
        this.basket.y = y

        HTMLredraw.updateBasketPosition({ x, y })
    }

    restart() {
        window.location.reload()
    }

    runStep() {
        const eggsInterval = this.timeout * 2.5
        this.gameTimer = setInterval(() => {
            var egg = this.findAvailableEgg()
            if (egg >= 0 && !this.over) {
                this.runEgg(egg)
            }
        }, eggsInterval)
    }

    levelUp() {
        this.level++

        if (this.level < 8) {
            this.timeout -= 50
        } else if (this.level > 19) {
            this.timeout += 0
        } else {
            this.timeout -= 25
        }

        clearInterval(this.gameTimer)
        this.runStep()
    }

    onEggDrop(egg) {
        if (
            Grid.list[egg].x == this.basket.x &&
            Grid.list[egg].y == this.basket.y
        ) {
            this.score += POINTS_PER_EGG

            HTMLredraw.updateScore(this.score)
            
            if (this.score >= MAX_SCORE) {
                this.gameWin()
            } else if (this.score % 50 === 0) {
                this.levelUp()
            }

        } else {
            this.loss++

            HTMLredraw.updateLossCount({ loss: this.loss })
            if (this.loss > MAX_MISSES && !this.over) {
                this.gameOver()
            }
        }

        Grid.release(egg)
    }

    findAvailableEgg() {
        var availableIds = Grid.getAvailableIds()
        if (!availableIds) return null

        const randomIndex = Math.floor(Math.random() * availableIds.length)
        var egg = availableIds[randomIndex]

        Grid.hold(egg)

        return egg
    }

    runEgg(id) {
        this.eggs[id].run(this.timeout)
    }

    gameOver() {
        this.endGame()

        HTMLredraw.gameOver()
    }

    gameWin() {
        this.endGame()

        HTMLredraw.gameWin()
    }

    endGame() {
        clearInterval(this.gameTimer)
        this.over = true
    }
}
