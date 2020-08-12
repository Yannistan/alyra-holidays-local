"use strict"
const form = document.getElementById("form")

class ListLinks {
  constructor(container) {
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
    const ul = document.createElement("ul")
    ul.classList.add("row", "list-unstyled", "mt-4")
    for (let el of this.list) {
      const li = this.addLi(el)
      ul.append(li)
    }
    return ul
  }

  addLi(el) {
    const li = document.createElement("li")
    li.classList.add("border", "shadow-sm", "mb-3", "p-2")
    li.innerHTML = this.addTitle(el)
    li.innerHTML += this.addDescription(el)
    li.innerHTML += this.addLink(el)
    li.append(this.addButton(el))
    return li
  }

  addTitle({ title }) {
    return `<h3 class="h6">${title}</h3>`
  }

  addDescription({ description }) {
    return description ? `<p>${description}</p>` : ""
  }

  addLink({ url }) {
    return `<a class="btn btn-sm btn-outline-warning mr-2" href="${url}">visitez le lien</a>`
  }

  addButton(el) {
    const button = document.createElement("button")
    button.type = "button"
    button.classList.add("btn", "btn-warning", "btn-sm")
    button.textContent = "Supprimer le lien"
    button.addEventListener("click", () => {
      this.remove(el)
    })
    return button
  }
}
const container = document.getElementById("container")
const listLinks = new ListLinks(container)
listLinks.init()

form.addEventListener("submit", (e) => {
  e.preventDefault()
  listLinks.pushEl({
    title: form.elements.title.value.trim(),
    url: form.elements.url.value.trim(),
    description: form.elements.description.value.trim(),
    category: form.elements.category.value,
  })
  form.reset()
})
