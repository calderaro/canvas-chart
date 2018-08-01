import {Vec2} from './math'

export default class Bar {
  constructor (context, pos, size, data) {
    this.context = context
    this.pos = pos || new Vec2(0, 0)
    this.size = size || new Vec2(0, 0)
    this.data = data
    this.fillStyle = `rgba(56, 229, 56, 0.6)`
    this.strokeStyle = `rgba(56, 229, 56, 1)`
  }
  draw (mousePos) {
    this.context.fillStyle = this.fillStyle
    this.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y)

    /*
    this.context.beginPath()
    this.context.lineWidth = 1
    this.context.strokeStyle = this.strokeStyle
    this.context.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    this.context.stroke()
    */
  }
}
