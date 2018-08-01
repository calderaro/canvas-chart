import {Vec2} from './math'
import Bar from './Bar'

function mouseCollition (mousePos, col) {
  if ((mousePos.x > col.pos.x && mousePos.x < col.pos.x + col.size.x) &&
      (mousePos.y > col.pos.y && mousePos.y < col.pos.y + col.size.y)) {
    return true
  } else {
    return false
  }
}

export default class BarStacked {
  constructor (context, pos, size, data) {
    this.context = context
    this.pos = pos || new Vec2(0, 0)
    this.size = size || new Vec2(0, 0)
    this.strokeStyle = 'rgba(0, 0, 0, 0.4)'
    this.total = data.stack.reduce((a, b) => a + b.value, 0)
    this.data = data
    this.stack = data.stack
      .reduce((array, b, index) => {
        const height = this.context.canvas.height * (b.value / this.total)
        const posY = index ? array[index - 1].pos.y + array[index - 1].size.y : 0
        const bar = new Bar(context, new Vec2(pos.x, posY), new Vec2(size.x, height))
        bar.fillStyle = b.fillStyle
        return [...array, bar]
      }, [])
  }
  collide (mousePos) {
    if (mouseCollition(mousePos, this)) {
      this.strokeStyle = '#2E2EFE'
      return true
    } else {
      this.strokeStyle = 'rgba(0, 0, 0, 0.4)'
    }
  }
  draw (mousePos) {
    this.stack.forEach(bar => {
      bar.draw()
    })
    this.context.beginPath()
    this.context.lineWidth = 1
    this.context.strokeStyle = this.strokeStyle
    this.context.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    this.context.stroke()
  }
}
