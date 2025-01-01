let tasks = [
    {id: 1, description: "Comprar pão", checked: false},
    {id: 2, description: "Fazer o almoço", checked: false},
    {id: 3, description: "Escovar os Dentes", checked: false},
]

const getCheckBoxInput = ({id, description, checked}) => {
    const checkBox = document.createElement("input");//CRIANDO O ELEMENTO DE INPUT
    const label = document.createElement("label");//CRIANDO O ELEMENTO DE LABEL
    const wrapper = document.createElement("div");//CRIANDO O ELEMENTO DE DIV (deixando esses 2 elemtnso dentro da DIV)
    const chackBoxId = `${id}-checkbox`;

    checkBox.type = "checkbox";
    checkBox.id = chackBoxId;
    checkBox.checked = checked;

    label.textContent = description;
    label.htmlFor = chackBoxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkBox);
    wrapper.appendChild(label);

    return wrapper;
}

//window.onload - O que está dentro da função atribuída ao window.onload será executado após o carregamento completo da página.
window.onload = function() {
    tasks.forEach(function(task) { //O método forEach é usado para percorrer cada item no array tasks. Para cada tarefa no array, ele executa a função que está dentro do forEach
        const checkbox = getCheckBoxInput(task);

        const list = document.getElementById("to-do-list");//A variável list pega o elemento HTML com o id igual a "to-do-list", usando document.getElementById.
        const toDo = document.createElement("li");//A variável toDo cria um novo elemento <li> (lista) para ser adicionado à lista.
        //const button = document.createElement("button");//A variável button cria um novo botão para ser adicionado ao <li> criado acima.

        toDo.id = task.id;
        toDo.appendChild(checkbox);
        //toDo.appendChild(button)

        list.appendChild(toDo);//O método appendChild adiciona o elemento <li> criado (toDo) como um filho do elemento list (a <ul> com id="to-do-list").
        //Esse passo insere o <li> dentro do <ul>
    })
}