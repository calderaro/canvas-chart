import {Vec2} from './math'
import Grid from './Grid'
import Bar from './BarStacked'
import Tooltip from './Tooltip'

function getMousePos (canvas, evt) {
  const rect = canvas.getBoundingClientRect()
  const pos = new Vec2(evt.clientX - rect.left, evt.clientY - rect.top)
  return pos
}

export default class Graph {
  constructor () {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 1000
    this.canvas.height = 400
    this.grid = new Grid(this.canvas, this.context, 10)
    this.tooltip = new Tooltip(this.canvas, this.context)
    this.mousePos = new Vec2()
    this.data = []
    this.hover = 0

    this.canvas.style.border = '2px solid rgba(0, 0, 0, 0.3)'
    this.canvas.addEventListener('mousemove', e => this.onMouseOver(e))
    this.canvas.addEventListener('mouseout', e => this.onMouseOver(e))
    this.canvas.addEventListener('click', e => console.log('click'))
  }
  onMouseOver (e) {
    this.mousePos = getMousePos(this.canvas, e)
    this.draw(this.data)
  }
  onMouseOut (e) {
    this.mousePos = new Vec2(0, 0)
    this.draw(this.data)
  }
  setData (data) {
    const colWidth = 50
    const colMargin = 1.1
    const colsOffset = colWidth * 0.1

    this.data = data.map((b, index) => {
      const bar = new Bar(
        this.context,
        new Vec2((index * colWidth * colMargin) + colsOffset, 0),
        new Vec2(colWidth, this.canvas.height),
        b
      )

      return bar
    })
  }
  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.grid.draw()
    this.tooltip.collide(this.mousePos, this.data)
    this.data.forEach(bar => bar.draw(this.mousePos))
    this.tooltip.pos = this.mousePos
    this.tooltip.draw()
  }
}
