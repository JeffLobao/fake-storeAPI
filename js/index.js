let lista = [];

function getCategories(){
    fetch('https://fakestoreapi.com/products/categories')
    .then (response => response.json())
    .then (response => {
        categorias.innerHTML += `<option>todos</option>`;
        for(let i = 0; i < response.length; i++) {
            categorias.innerHTML += `<option>${response[i]}</option>`;
        }
    })
}

getCategories();

async function getProducts(){
    try {
        const request = await fetch('https://fakestoreapi.com/products');
        const response = await request.json();
            
            lista = response;
            renderList(response);
            return;
        } catch (error) {
            alert("Produtos não encontrados :/");
            produtos.innerHTML = error.message;
    }
}

getProducts();

function orderingBy() {
    if (ordenacao.value == 1) {
        renderList(lista.toSorted((a, b) => a.price - b.price))
    } else {
        renderList(lista.toSorted((a, b) => b.rating.rate - a.rating.rate))
    }
}

function filteredBy(){
    if (categorias.value === 'todos') {
    renderList(lista)
    } else {
        renderList(lista.filter((item) => item.category == categorias.value))
    }
}

function renderList(arr){
    produtos.innerHTML = '';
    arr.map(produto => {
        produtos.innerHTML += `            <li class="card">
        <div class="card-imagem">
            <img src="${produto.image}" alt="">
            <div class="card-nota">${produto.rating.rate}</div>
        </div>
        <div class="card-info">
            <h3${produto.title}</h3>
            <h6> ${produto.category}</h6>
            <h4>R$${produto.price}</h4>
        </div>
    </li>`;
    })
}
