
const TEST_TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

class ColorPanel {
  constructor(delay) {
    const ele = document.createElement('div')
    ele.innerHTML = TEST_TEXT
    ele.style.padding = '16px'
    ele.style.lineHeight = '26px'
    ele.style.background = "#"+((1<<24)*Math.random()|0).toString(16)
    ele.style.opacity = 0.0
    ele.style.overflow = 'hidden'

    this.ele = ele;
    this.appearOptions = {
      startTime: 0,
      duration: 300,
      delay,
    }
  }

  appear() {
    const { ele, appearOptions } = this
    const render = (time) => {
      const t = (Date.now() - appearOptions.startTime) / appearOptions.duration
      const a = this._ease((t <= 1.0) ? t : 1.0)
      ele.style.opacity = a;
      (t <= 1.0) ?
        requestAnimationFrame(render) : ''
    }

    setTimeout(() => {
      appearOptions.startTime = Date.now()
      requestAnimationFrame(render)
    }, appearOptions.delay)
  }

  appendTo(parent) {
    parent.appendChild(this.ele)

    this.appear()
  }

  _ease(t) { return t*t*t }
}


window.onload = () => {
  const app = document.getElementById('app')

  app.style.height = '100vh'
  app.style.display = 'flex'
  app.style.flexDirection = 'column'

  for(let i = 0; i < 2; i++) {
    const panel = new ColorPanel(200 * i)
    panel.ele.style.flex = 1
    panel.appendTo(app)
  }
}
