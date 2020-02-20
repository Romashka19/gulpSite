let toggleButton = document.getElementsByClassName('toggle-button')[0];
let menu = document.getElementsByClassName('menuBottom')[0]

toggleButton.addEventListener('click',function() {
    menu.classList.toggle('active')
});