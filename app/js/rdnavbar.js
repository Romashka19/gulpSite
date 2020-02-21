let toggleButtonMenu = document.getElementsByClassName('toggle-button-menu')[0];
let menuBot = document.getElementsByClassName('menuBottom')[0]

toggleButtonMenu.addEventListener('click',function() {
	menuBot.classList.toggle('active')
});

let toggleButtonReg = document.getElementsByClassName('toggle-button-reg')[0];
let menuTop = document.getElementsByClassName('menuTop')[0]

toggleButtonReg.addEventListener('click',function() {
	menuTop.classList.toggle('active')
});