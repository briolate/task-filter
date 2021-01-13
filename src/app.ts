import API from "./api/fetch";
const url = "https://jsonplaceholder.typicode.com/todos";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

(async () => {
  const response = (await API(url, "get")) as Todo[];
  if (response) {
    hideloader();
  }
  show(response);

  function hideloader() {
    document.getElementById("loading")!.style.display = "none";
  }

  // Create table from json
  function show(response: Todo[]) {
    let tab = `<tr> 
        <th>User ID</th> 
        <th>Task</th> 
        <th>Completed</th>
       </tr>`;

    for (let todo of response) {
      tab += `<tr>  
      <td>${todo.userId}</td> 
      <td>${todo.title}</td> 
      <td>${todo.completed}</td>        
      </tr>`;
    }
    document.getElementById("tasks")!.innerHTML = tab;
  }

  const table = document.getElementById("tasks") as HTMLTableElement;
  let rows = Array.from(table.tBodies[0].rows);

  // Filter by user id
  const select = <HTMLInputElement>document.getElementById("select");
  select.addEventListener("change", selectFilter);

  function selectFilter(): void {
    const selectValue = select.value;
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].getElementsByTagName("td")[0];
      if (td) {
        let userId = td.textContent || td.innerText;
        if (userId === selectValue) {
          rows[i].classList.remove("selected");
        } else {
          rows[i].classList.add("selected");
        }
        if (selectValue === "") {
          rows[i].classList.remove("selected");
        }
      }
    }
  }

  // Filter by text
  const searchInput = <HTMLInputElement>document.getElementById("search-input");
  searchInput.addEventListener("keyup", textFilter);

  function textFilter(): void {
    const filterValue = searchInput.value.toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].getElementsByTagName("td")[1];
      if (td) {
        let text = td.textContent || td.innerText;
        if (text.toLowerCase().indexOf(filterValue) > -1) {
          rows[i].classList.remove("typed");
        } else {
          rows[i].classList.add("typed");
        }
      }
    }
  }

  //Filter by status
  const trueButton = <HTMLInputElement>document.getElementById("trueButton");
  const falseButton = <HTMLInputElement>document.getElementById("falseButton");
  trueButton.addEventListener("click", () => {
    buttonFilter("true");
    trueButton.classList.toggle("clicked");
  });
  falseButton.addEventListener("click", () => {
    buttonFilter("false");
    falseButton.classList.toggle("clicked");
  });

  const buttonFilter = (textContent: string): void => {
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].getElementsByTagName("td")[2];
      if (td) {
        let boolVal = td.innerText;
        if (boolVal === textContent) {
          rows[i].classList.toggle("toggled");
        } else {
          rows[i].classList.toggle("untoggled");
        }
      }
    }
  };

  // Scroll header
  const className = "inverted";
  const scrollTrigger = 60;
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  window.onscroll = function () {
    if (
      window.scrollY >= scrollTrigger ||
      window.pageYOffset >= scrollTrigger
    ) {
      document.getElementById("header")!.classList.add(className);
      document.querySelector("#header h1")!.classList.add(className);
    } else {
      document.getElementById("header")!.classList.remove(className);
      document.querySelector("#header h1")!.classList.remove(className);
    }
  };
})();
