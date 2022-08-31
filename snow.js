const screenWidth = window.screen.width
const screenHeight = window.screen.height
let snowFlakeCoordsMap = new Map()
const speed = 5000
let movingRight = true
let movingLeft = false

function drawSnowFlakes(amount) {
    for (let i = 0; i < amount; i++) {
        drawSnowFlake(false, snowFlakeFallVertical)
    }
}

drawSnowFlakes(50)

function drawSnowFlake(random, fallVertical) {
    const snowflake = document.createElement('div')
    let top
    let relatriveSpeed
    const left = generateRandom(0, screenWidth)
    if (random) {
        top = generateRandom(0, screenHeight)
        relatriveSpeed = calculateRelativeSpeed(screenHeight, 0, top)
    } else {
        top = generateRandom(0, -screenHeight)
        relatriveSpeed = calculateRelativeSpeed(screenHeight, -10, top)
    }
    const size = generateRandom(2,7)
    snowflake.style.width = size + 'px'
    snowflake.style.height = size + 'px'
    snowflake.style.borderRadius = 50 + '%'
    snowflake.style.backgroundColor = 'white'
    snowflake.style.position = 'absolute'
    snowflake.style.top = top + 'px'
    snowflake.style.left = left + 'px'
    snowflake.style.transition = relatriveSpeed + 'ms'
    snowflake.style.transitionTimingFunction = 'ease-in'
    snowFlakeCoordsMap.set(snowflake, {top:top, left:left})
    document.body.append(snowflake)
    fallVertical(snowflake)
    //snowFlakeFallHorizontal(snowflake)
    //fallHorizontal()
}

function snowFlakesPositionCheck() {
    setInterval(() => {
        snowFlakeCoordsMap.forEach((value, snowFlake, map) => {
            const rect = snowFlake.getBoundingClientRect();
            if (rect.top > screenHeight - 150 || rect.left < 20 || rect.right > screenWidth - 20) {
                snowFlake.remove()
                snowFlakeCoordsMap.delete(snowFlake)
                drawSnowFlake(false, snowFlakeFallVertical)
            }
        })
    },  10)
}
snowFlakesPositionCheck()

function calculateRelativeSpeed(max, min, input) {
    const range = max - min
    const correctedStartValue = input - min
    const percentage = parseInt(100 - ((correctedStartValue * 100) / range))
    return parseInt(speed / 100 * percentage) 
}

function snowFlakeFallVertical(snowFlake) {
    setTimeout(() => {
        snowFlake.style.top = screenHeight + 'px'
    }, 10)
}

function snowFlakeFallHorizontal(snowflake) {
    moveRight()
    setInterval(() => {
        if (movingRight) moveRight(snowflake)
        else moveLeft(snowflake)
    }, 2000)
}

snowFlakeFallHorizontal()

function moveRight() {
    setTimeout(() => {
        movingRight = false
        movingLeft = true
        snowFlakeCoordsMap.forEach((value, key, map) => {
            const left = value.left + generateRandom(200,1200)
            key.style.left = left + 'px'
        })
    }, 10)
}

function moveLeft() {
    setTimeout(() => {
        movingRight = true
        movingLeft = false 
        snowFlakeCoordsMap.forEach((value, key, map) => {
            const left = value.left - generateRandom(200,1200)
            key.style.left = left + 'px'
        })
    },10)
}

function generateRandom(min, max) {
    let difference = max - min
    let rand = Math.random()
    rand = Math.floor(rand * difference)
    rand = rand + min
    return rand
}