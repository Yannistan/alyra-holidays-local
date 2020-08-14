"use strict";
class ListLinks {
  constructor(container, defaultList) {
    this.container = container;
    this.list = JSON.parse(localStorage.getItem("listLinks")) || defaultList;
  }
  init() {
    // this.render_trie();
    this.render();
  }

  pushEl(el) {
    /* @todo : remplacer array vide [] dans const urls = [], par l'array qui contient tous les urls
    trouvés dans this.list */
    console.log(this.list);
    const urls = this.list.map((el) => el.url);
    console.log(urls);
    if (!urls.includes(el.url)) {
      // si el.url n'est pas dans la liste des urls
      // je l'ajoute
      this.list.push(el);
      // et j'appelle la méthode refresh
      this.refresh();
    } else {
      alert("Ce lien est déjà inclu");
    }
  }
  remove(el) {
    const i = this.list.findIndex((item) => item === el); // <- ce code trouve index de l'élément récherché
    this.list.splice(i, 1); // <- ce code enleve l'élément avec index i de this.list
    console.log(this.list);
    this.refresh();
  }
  refresh() {
    this.render();
    this.addToLocalStorage();
  }
  addToLocalStorage() {
    /*
     le code ci-dessous convertis l'array list (array qui contients des objet) en format JSON afin de la
     sauvegarder en localStorage dans la clé "listLinks"
    */
    localStorage.setItem("listLinks", JSON.stringify(this.list));
  }
  render() {
    const ulEl = this.addUl();

    this.container.innerHTML = "";
    this.container.append(ulEl);

    this.methodsortatoz();
    // this.methodsortztoa();
    /*  const selectEl = document.getElementById("trie");
    const selectedValue = selectEl.value;
    //const option = document.querySelector("option");
     selectEl.addEventListener('change', () =>{
     if (selectedValue == "A-Z") {
         this.list.sort(function (a, b) {
             if (a.title < b.title) {
               return -1;
             }
             if (a.title > b.title) {
               return 1;
             }
             return 0;
           });
           
          } */
    //this.methodsortztoa();
    //console.log(this.list);
    //});
    this.render();
  }

  render_trie() {
    const selectEl = document.getElementById("trie");
    const option = document.querySelector("option");
    selectEl.addEventListener("change", () => {
      if (option.value == "A-Z") {
        this.list.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        this.render();
        // console.log(this.list);
      } else if (option.value == "Z-A") {
        this.list.sort(function (b, a) {
          if (b.title > a.title) {
            return -1;
          }
          if (b.title < a.title) {
            return 0;
          }
          return 0;
        });
        this.render();
      }
    });
  }

  addUl() {
    const ulEl = this.createUlElement();
    console.log(this.list);
    for (let el of this.list) {
      const li = this.addLi(el);
      ulEl.append(li);
    }
    return ulEl;
  }

  addLi(el) {
    const liEl = this.createLiElement();
    liEl.append(this.addTitle(el));
    liEl.append(this.addDescription(el));
    liEl.append(this.addLink(el));
    liEl.append(this.addButton(el));
    return liEl;
  }

  createUlElement() {
    const ulEl = document.createElement("ul");
    ulEl.classList.add("row", "list-unstyled", "mt-4");
    return ulEl;
  }

  createLiElement() {
    const liEl = document.createElement("li");
    liEl.classList.add("border", "shadow-sm", "mb-3", "p-2");
    return liEl;
  }

  createTitleElement() {
    const el = document.createElement("h3");
    el.classList.add("h6", "mb-0");
    return el;
  }

  createDescriptionElement() {
    const el = document.createElement("p");
    return el;
  }

  createLinkElement() {
    const el = document.createElement("a");
    el.classList.add("btn", "btn-sm", "btn-outline-warning", "mr-2");
    return el;
  }

  createButtonElement() {
    // <button type="button" class="btn btn-warning btn-sm"></button>
    const el = document.createElement("button");
    el.type = "button";
    el.classList.add("btn", "btn-warning", "btn-sm");
    return el;
  }

  addTitle(el) {
    const title = this.createTitleElement();
    title.textContent = el.title;
    return title;
  }

  addDescription(el) {
    const description = this.createDescriptionElement();
    description.textContent = el.description;
    return description;
  }

  addLink(el) {
    const a = this.createLinkElement();
    a.textContent = "visiter le lien";
    a.href = el.url;
    return a;
  }

  addButton(el) {
    const buttonEl = this.createButtonElement();
    buttonEl.textContent = "Supprimer le lien";
    buttonEl.addEventListener("click", () => {
      this.remove(el);
    });
    return buttonEl;
  }

  filtercategorie() {
    const catEl = document.getElementById("trie-cat");
    const catElval = document.getElementById("trie-cat").value;
    const listfiltercat = this.list.filter((el) => {
      if (catElval === "toutes") {
        return true;
      } else {
        return el.category.includes(catElval);
      }
    });
    this.render();
  }

  methodsortatoz() {
    // console.log(this.list);
    this.list.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    this.render();
  }

  methodsortztoa() {
    this.list.sort(function (b, a) {
      if (b.title > a.title) {
        return -1;
      }
      if (b.title < a.title) {
        return 0;
      }
      return 0;
    });
    this.render();
  }
}
