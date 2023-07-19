function planner() {
  const list = document.querySelector(".li-container ul");
  const input = document.querySelector("#taskInput");
  const li = document.createElement("li");
  const btn = document.createElement("p");

  li.innerText = input.value;
  btn.innerText = "X";
  btn.classList.add("btn-delete");

  li.appendChild(btn);
  list.appendChild(li);

  btn.addEventListener("click", () => li.remove());
}

document.querySelector(".btn-add").addEventListener("click", function (event) {
  event.preventDefault();
  planner();
});
