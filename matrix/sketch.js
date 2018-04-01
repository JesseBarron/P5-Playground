let symbolSize = 15
let globalStreams

function generateStreams() {
    streams = []
    let x = 0
    for(var i = 0; i < width / symbolSize; i++) {
        stream = new Stream()
        stream.generateSymbols(x, random(-500, 0))
        streams.push(stream)
        x += symbolSize
    }
    return streams;
}

function setup() {
    createCanvas (
        window.innerWidth,
        window.innerHeight
    )
    background(0)
     globalStreams = generateStreams()
    textSize(symbolSize)
}

function draw() {
    background(0, 150)
    globalStreams.forEach(el => el.render())

}

function Symbol(x, y, speed, first) {
    this.x = x
    this.y = y
    this.speed = speed
    this.value;
    this.first = first;
    this.switchInterval = round(random(5, 25))
    this.lightUp = round(random(5, 20))

    this.setToRandomSymbol = function() {
        if(frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            )
        }
    }

    this.render = function() {
        (this.first && (frameCount % this.lightUp >= 5 && frameCount % this.lightUp <= 50))
        ? fill(180, 255, 180)
        : fill(0, 255, 70)
        text(this.value, this.x, this.y)
        this.setToRandomSymbol()
        this.rain()
    }

    this.rain = function () {
        if(this.y > height){
            this.y = 0
        }
        this.y += this.speed
    }
}

function Stream() {
    this.symbols = []
    this.totalSymbols = round(random(5, 30))
    this.speed = random(5, 10)

    this.generateSymbols = function generateSymbols(x, y) {
        let first = round(random(0, 5)) == 1
        this.symbols = [...Array(this.totalSymbols)]
        this.symbols.forEach((el, i) => {
            this.symbols[i] = new Symbol(x, y, this.speed, first)
            this.symbols[i].setToRandomSymbol()
            y -= symbolSize;
            first = false
        })
    }

    this.render = function() {
        this.symbols.forEach(el => {
            el.render()
        })
    }
}