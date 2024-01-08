let gameContainer = document.querySelector('#gameContainer')
let playAgain = document.querySelector('#replay')
let menuContainer = document.querySelector('#menuContainer')
let modePvp = document.querySelector('.pv')
let modePvcpu = document.querySelector('.pv')
let isPlayerOne = true
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
        // cpuMode = false
        displayGrid()
        menuContainer.style.display = 'none'
    })
    modePvcpu.addEventListener('click', () => {
        // cpuMode = true
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