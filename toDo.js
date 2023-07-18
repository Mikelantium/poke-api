const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const emptyMessage = document.querySelector('.empty');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = input.value.trim();
  
  if (task !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>${task}</p>
      <button class="btn-delete">X</button>
    `;
    ul.appendChild(li);
    input.value = '';
    emptyMessage.style.display = 'none';
  }
});

ul.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-delete')) {
    const li = e.target.parentNode;
    ul.removeChild(li);
    if (ul.children.length === 0) {
      emptyMessage.style.display = 'block';
    }
  }
});