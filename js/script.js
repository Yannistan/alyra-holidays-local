"use strict"


const container = document.getElementById("container")
const form = document.getElementById("form")

const listLinks = new ListLinks(container, defaultList)
listLinks.init()

form.addEventListener("submit", (event) => {
  event.preventDefault()
  listLinks.pushEl({
    title: form.elements.title.value.trim(),
    url: form.elements.url.value.trim(),
    description: form.elements.description.value.trim(),
    category: form.elements.category.value,
  })
  form.reset()
})
