
export default class Grid {
  constructor (canvas, context, linesX) {
    this.canvas = canvas
    this.context = context
    this.linesX = linesX
  }
  draw () {
    for (let x = 0; x <= this.linesX; x++) {
      this.context.strokeStyle = `rgba(0, 0, 0, .3)`
      this.context.beginPath()
      this.context.setLineDash([5, 15])
      this.context.moveTo(0, x * (this.canvas.height / this.linesX))
      this.context.lineTo(this.canvas.width, x * (this.canvas.height / this.linesX))
      this.context.stroke()
      this.context.setLineDash([])
    }
  }
}
