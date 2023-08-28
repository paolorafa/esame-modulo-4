function goEcommerce() {
    window.location.href = "ecommerce-index.html"
}

const API_URL = "https://striveschool-api.herokuapp.com/api/product/"
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg"

const prodDetailsContainer = document.getElementById("product-details");
const descrizioneProd = document.getElementById("descr");
const searchParams = new URLSearchParams(location.search);

const id = searchParams.get("_id");
const specificDUrl = `${API_URL}/${id}`;

window.onload = () => {

    if (id) {
        console.log(specificDUrl);
        fetchDescr(specificDUrl);
    } else {
        fetchDescr();
    }
};

function fetchDescr(specificDUrl) {
    console.log(specificDUrl);
    if (specificDUrl) {
        return fetch(specificDUrl, {
            headers: {
                'Authorization': API_KEY
            }
        });
    }
}


fetchDescr(specificDUrl)
    .then((response) => response.json())
    .then((product) => {
        console.log(product);
        displayProduct(product);

    })
    .catch((error) => console.error(error));



const displayProduct = (prod) => {
    console.log(prod);
    prodDetailsContainer.innerHTML = `
    
    <div class="card-body">
        <img class='card-img-top' src='${prod.imageUrl}'/></div>

    `;
    descrizioneProd.innerHTML = ` 
    
    <h5 class="card-title">${prod.name}</h5>
    <p class="card-text">${prod.description}</p>
    
        <li class="list-group-item">Codice Prodotto: ${prod._id}</li>
        <li class="list-group-item">Prezzo: € ${prod.price} <button class="btn btn-success rb-3">Acquista</button></li>
 
    
    `
};

