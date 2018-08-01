import Graph from './graph'
import {getRandomInt} from './math'

const graph = new Graph()

document.body.appendChild(graph.canvas)

const data = [...Array(parseInt(18)).keys()]
  .map(i => ({
    id: 1,
    name: 'evaluation 1',
    stack: [
      {value: getRandomInt(1, 20), fillStyle: 'rgba(255, 0, 0, 0.6)'},
      {value: getRandomInt(1, 20), fillStyle: 'rgba(0, 220, 0, 0.6)'}
    ]
  }))

graph.setData(data)
graph.draw(data)
