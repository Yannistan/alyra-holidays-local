"use strict"
const container = document.getElementById("container")
const form = document.getElementById("form")

const listLinks = new ListLinks(container, defaultList)
listLinks.init()

//console.log(listLinks)

// quand l'événement "submit" pour le formulaire est déclanché
form.addEventListener("submit", (event) => {
  /* le code dans la linge ci-dessous previent le formulaire d'envoyer des données, 
  on remplace le comportement par détaut par notre js */
  event.preventDefault()
  // méthode pushEl
  listLinks.pushEl({
    title: form.elements.title.value.trim(),
    url: form.elements.url.value.trim(), // @todo : de la même façon on peut récupérer la valeur d'url depuis le formulaire
    description: form.elements.description.value.trim(), // @todo : et la valeur de description depuis le formulaire,
    category: form.elements.category.value, // @todo : et la valeur de category depuis le formulaire,
  })
  // la ligne ci-dessous fait un reset du formulaire (les champs redeviennent vides)
  form.reset()
})
