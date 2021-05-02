let canvas = document.querySelector('canvas')

canvas.width = 800
canvas.height = 600

let context = canvas.getContext('2d')


let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40

let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener('resize', function (){
    canvas.width = window.innerWidth - 10
    canvas.height = window.innerHeight - 10

    init()

})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        context.beginPath()
        context.arc(this.x, this.y ,this.radius,0,Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth - 10 || this.x - this.radius < 0){
            this.dx = -this.dx

        }if (this.y  + this.radius > innerHeight - 10 || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius){
                this.radius += .8
            }else {
                this.radius += 0.2
            }
        }else if (this.radius > this.minRadius){
            this.radius -=1
        }

        this.draw()
    }
}
let circles = []

function init() {
    circles = []
    for (let i = 0; i < 500; i++) {
        let radius = Math.random() * 5 + 1
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = (Math.random() - 0.5)
        let dy = (Math.random() - 0.5)
        circles.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight)

    for (let i = 0; i < circles.length; i++) {
        circles[i].update()
    }
}
init()
animate()
