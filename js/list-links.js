class ListLinks {
  constructor(container, defaultList) {
    this.container = container
    this.list = JSON.parse(localStorage.getItem("listLinks")) || defaultList
  }

  init() {
    this.refresh()
  }

  pushEl(el) {
    const urls = this.list.map((el) => el.url)
    if (!urls.includes(el.url)) {
      this.list.push(el)
      this.refresh()
    }
  }

  remove(el) {
    const index = this.list.findIndex((item) => item === el)
    this.list.splice(index, 1)
    this.refresh()
  }

  refresh() {
    this.addToLocalStorage()
    this.render()
  }

  addToLocalStorage() {
    localStorage.setItem("listLinks", JSON.stringify(this.list))
  }

  render() {
    const ul = this.addUl()
    this.container.innerHTML = ""
    this.container.append(ul)
  }

  addUl() {
    const ul = this.createUlElement()
    for (let el of this.list) {
      const li = this.addLi(el)
      ul.append(li)
    }
    return ul
  }

  createUlElement() {
    const ul = document.createElement("ul")
    ul.classList.add("row", "list-unstyled", "mt-4")
    return ul
  }

  createLiElement() {
    const li = document.createElement("li")
    li.classList.add("border", "shadow-sm", "mb-3", "p-2")
    return li
  }

  createBtnElement() {
    const button = document.createElement("button")
    button.type = "button"
    button.classList.add("btn", "btn-warning", "btn-sm")
    return button
  }

  createTitleElement() {
    const h3 = document.createElement('h3')
    h3.classList.add('h3')
    return h3
  }

  createDescriptionElement() {
    return document.createElement('p')
  }

  createLinkElement() {
    const a = document.createElement('a')
    a.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'mr-2')
    return a
  }

  addLi(el) {
    const li = this.createLiElement()
    li.append(this.addTitle(el))
    li.append(this.addDescription(el))
    li.append(this.addLink(el))
    li.append(this.addButton(el))
    return li
  }

  addTitle({ title }) {
    const h3 = this.createTitleElement()
    h3.textContent = title
    return h3
  }

  addDescription({ description }) {
    let p = ''
    if (description) {
      p = this.createDescriptionElement()
      p.textContent = description
    }
    return p
  }

  addLink({ url }) {
    const a = this.createLinkElement()
    a.href = url
    a.textContent = 'visiter le lien'
    return a
  }

  addButton(el) {
    const button = this.createBtnElement()
    button.textContent = "Supprimer le lien"
    button.addEventListener("click", () => {
      this.remove(el)
    })
    return button
  }
}