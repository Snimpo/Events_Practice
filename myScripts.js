let input = document.getElementById("userInput");
let selectedType = document.getElementById("selectType");
let sButton = document.getElementById("searchButton");
let list = document.getElementById("list");

let fileType = "peliculas.json";


selectedType.addEventListener('change', changeType);
selectedType.addEventListener('changeT', showChosenType);
input.addEventListener('keydown', verificarInput);
sButton.addEventListener('click', startSearch);


function verificarInput(event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode > 47 && keyCode < 58 || keyCode > 95 && keyCode < 107) {
        event.preventDefault();
    }
}

function changeType() {
    fileType = selectedType.value;
    let event = new CustomEvent('changeT');
    selectedType.dispatchEvent(event);
}

function showChosenType() {
    console.log("Te base file was set to: " + selectedType.value);
}

function startSearch() {
    list.innerHTML = "";

    fetch(fileType)
        .then(answer => answer.json())
        .then(function (output) {
            for (let variable of output.data) {
                if (variable.nombre.startsWith(input.value.toUpperCase())) {
                    let p = document.createElement('p');
                    p.id = variable.nombre;
                    p.innerHTML = variable.sinopsis;
                    p.style.display = "none";

                    let li = document.createElement('li');
                    li.innerHTML = variable.nombre;
                    li.addEventListener('mouseover', function () {
                        let p = document.getElementById(variable.nombre);
                        p.style.display = 'block';
                    });

                    li.addEventListener('mouseout', function () {
                        let p = document.getElementById(variable.nombre);
                        p.style.display = 'none';
                    });
                    li.appendChild(p);
                    list.appendChild(li);
                }
            }
        })
}







