import {Vec2} from './math'

export default class Tooltip {
  constructor (canvas, context) {
    this.canvas = canvas
    this.context = context
    this.pos = new Vec2(0, 0)
    this.size = new Vec2(180, 80)
    this.offset = new Vec2(10, 10)
    this.visible = true
    this.text = ''
    this.questions = 0
    this.answers = 0
  }
  collide (mousePos, bars) {
    const collition = bars.filter(bar => bar.collide(mousePos)).pop()
    if (collition) {
      this.visible = true
      this.text = collition.data.name
      this.questions = collition.data.stack.reduce((a, b) => a + b.value, 0)
      this.answers = collition.data.stack[1].value
    } else {
      this.visible = false
    }
  }
  draw () {
    if (!this.visible) return
    this.context.font = '14px Arial'
    this.context.fillStyle = 'rgba(0, 0, 0, 0.6)'
    this.context.fillRect(this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.size.x, this.size.y)
    this.context.fillStyle = '#FFF'
    this.context.fillText(this.text, this.pos.x + 20, this.pos.y + 35)
    this.context.fillText('Total Preguntas: ' + this.questions, this.pos.x + 20, this.pos.y + 60)
    this.context.fillText('Respuestas Correctas: ' + this.answers, this.pos.x + 20, this.pos.y + 75)
  }
}
