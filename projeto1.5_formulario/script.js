function calcular(event) {
    event.preventDefault();
    
    let valorA = document.getElementById("numeroA").value.trim()
    let valorB = document.getElementById("numeroB").value.trim()

    const resultado = document.getElementById("resultado")
    const inputs = document.querySelectorAll("#all input")
    
    valorA = Number(valorA);
    valorB = Number(valorB);

    if(isNaN(valorA) || isNaN(valorB)) {
        resultado.textContent = "Por favor, insira valores numéricos válidos!"
        return;
    }
    
    if( valorA === valorB) {
        resultado.textContent = " O valor B é igual ao valor A"
        resultado.style.color = "#FFCCCC"

    } else if(valorA < valorB) {
        resultado.textContent = "O Valor B é maior que o valor A"
        resultado.style.color = "#0bff0b"
    } else {
        resultado.textContent = "O Valor B não é maior que o valor A"
        resultado.style.color = "#FFCCCC"
        
    }

    inputs.forEach(input => input.value = "")
    document.getElementById("numeroA").focus();

}
document.getElementById("all").addEventListener("submit", calcular);
