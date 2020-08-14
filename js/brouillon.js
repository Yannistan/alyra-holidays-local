trieatoz() {
   const selectEl = document.getElementById("trie");
   const option = document.querySelector("option");
    selectEl.addEventListener('change', () =>{
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
    } elseif (option.value == "Z-A") {
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
    })
    
     
    
}

function createtrie() {
    const selectEl = document.getElementById("trie");
    const option = document.querySelector("option");
    
    
    selectEl.addEventListener("change", () => {
      trie = selectEl.value;
      console.log("trie", trie);
      this.render();
    });
  }