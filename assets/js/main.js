let gameContainer = document.querySelector('#gameContainer')
let playAgain = document.querySelector('#replay')
let menuContainer = document.querySelector('#menuContainer')
let modePvp = document.querySelector('#pvp')
let modePvcpu = document.querySelector('#pvcpu')
let cpuMode = true
let isPlayerOne = true
let isOver = false
let turn = 0

playAgain.style.display = 'none'
playAgain.addEventListener('click', () => {
    replay()
    startMenu()
})
let grid = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]
//Rejouer
let replay = () => {
    turn = 0
    grid = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ]
    isPlayerOne = true
    playAgain.style.display = 'none'
    menuContainer.style.display = 'block'
    gameContainer.innerHTML = ""
    isOver = false

}
//Menu début de jeu
let startMenu = () => {

    modePvp.addEventListener('click', () => {
        cpuMode = false
        displayGrid()
        menuContainer.style.display = 'none'
    })
    modePvcpu.addEventListener('click', () => {
        cpuMode = true
        displayGrid()
        menuContainer.style.display = 'none'
    })
}
replay()
startMenu()

// Afficher grille
let displayGrid = () => {
    playAgain.style.display = 'block'
    gameContainer.innerHTML = ""
    grid.forEach((el, i) => {
        let rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        gameContainer.appendChild(rowContainer)
        el.forEach((cells, j) => {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.addEventListener('click', () => {
                play(cell, i, j)
            }, { once: true })
            rowContainer.appendChild(cell)
            cell.innerHTML = ""
        });
    });
}

//Afficher choix joueurs
let play = (cell, i, j) => {
    if (!isOver) {
        if (isPlayerOne) {
            cell.innerHTML = "X"
            cell.style.background = "grey"
            cell.style.color = "white"
            grid[i][j] = cell.innerHTML
            victory("X")
            isPlayerOne = !isPlayerOne
            turn++
            if (cpuMode == true) {
                playCpu(cell)
            }
        } else {
            cell.innerHTML = "O"
            grid[i][j] = cell.innerHTML
            victory("O")
            isPlayerOne = !isPlayerOne
            turn++
        }

    }
}
//Mode aleatoire cpu
let playCpu = (cell) => {
    console.log(turn);
    if (turn < 42) {
        let random = randomize(0, document.querySelectorAll('.cell').length - 1)
        while (document.querySelectorAll('.cell')[random].innerHTML != "?") {
            random = randomize(0, document.querySelectorAll('.cell').length - 1)
        }
        document.querySelectorAll('.cell').forEach((e) => {
            e.style.pointerEvents = 'none'
        });
        setTimeout(() => {
            document.querySelectorAll('.cell')[random].click()
            document.querySelectorAll('.cell').forEach((e) => {
                e.style.pointerEvents = 'auto'
            });
        }, 1000)

    }
}
//Verification victoire
function victory(val) {
    let winner = document.createElement('div')
    winner.classList.add('winner')
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] != "") {
                if (grid[i][j] == grid[i][j + 1] && grid[i][j + 1] == grid[i][j + 2] && grid[i][j + 2] == grid[i][j + 3]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return
                }
            }
        }

    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i + 2] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j] && grid[i + 1][j] == grid[i + 2][j] && grid[i + 2][j] == grid[i + 3][j]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return

                }
            }
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i + 3] && grid[i + 3][j + 3] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j + 1] && grid[i + 1][j + 1] == grid[i + 2][j + 2] && grid[i + 2][j + 2] == grid[i + 3][j + 3]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return

                }
            } else if (grid[i + 3] && grid[i + 3][j - 3] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j - 1] && grid[i + 1][j - 1] == grid[i + 2][j - 2] && grid[i + 2][j - 2] == grid[i + 3][j - 3]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return
                }
            }

        }
    }
    if (turn >= 41) {
        gameContainer.appendChild(winner)
        winner.innerHTML = "DRAW"
    }
}



function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}