
const nameInput = document.getElementById('name');
const descrizioneInput = document.getElementById('descrizione');
const brandInput = document.getElementById('brand');
const immagineInput = document.getElementById('immagine');
const prezzoInput = document.getElementById('prezzo');
const form = document.getElementById('user-form');

const productInput = document.getElementById('product-id');
const params = new URLSearchParams(window.location.search)


const API_URL = "https://striveschool-api.herokuapp.com/api/product/"

const getRow = () => document.getElementById(`table-body`)

const getContainer = async () => {

    let response;

    try {
        
        response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg"
            }
        })
    }
    catch (error) {
        console.log("fetch errore", error);
    }

    try {
        if (response && response.ok) { 
            const res = await response.json();
            let product = res;
            console.log(product);
            getRow().innerHTML = "";
            setTimeout(() => {

                document.querySelector("#spinner-container").classList.add("d-none")
                document.querySelector("#user-form").classList.remove("d-none")

                for (let index = 0; index < product.length; index++) {
                    const element = product[index];

                    getRow().innerHTML += `
                <tr>

                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.brand}</td>
                    <td>${element.imageUrl}</td>
                    <td>${element.price}</td>
                    <td class="d-flex flex-wrap flex-md-nowrap"><button class="btn btn-success button-form" id="delete-btn" onclick="editProduct('${element._id}')">Modifica</button>
                        <button class="btn btn-success button-form" id="delete-btn" onclick=" deleteProduct('${element._id}')">Elimina</button>
                        </td>

                </tr>
                `;
                
                }
                messageAleart();
            }, 2000)
        } else {
            console.log("error: ", response.status, response.statusText);
            throw new Error(response ? response.status : "Unknown Status");
        }
    } catch (error) {
        console.log("parse error", error);
    }
}


function goEcommerce() {
    window.location.href = "ecommerce-index.html"
}

window.onload = () => {
    getContainer();
   
}

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const formValid = formComplete();

    if (!formValid) return false;

    const newProduct = {
        name: nameInput.value,
        description: descrizioneInput.value,
        brand: brandInput.value,
        imageUrl: immagineInput.value,
        price: prezzoInput.value,
    }

    try {

        messageAleart();
        const URL = productInput.value
            ? `${API_URL}/${productInput.value}`
            : `${API_URL}`

        const HTTP_METOD = productInput.value ? 'PUT' : 'POST'


        const response = await fetch(URL, {
            method: HTTP_METOD,
            body: JSON.stringify(newProduct),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg",
                'Content-type': 'application/json; charset=UTF-8',
            },

        })
        if (response.ok) {
            window.location.href = productInput.value ? "back-office.html?status=edit-ok" : "back-office.html?status=new-ok"
           

        } else {
            console.log("Errore:", response.status, response.statusText);
        }
    }

    catch (error) {
        console.error("Errore durante la chiamata", error);
    }
});



function formComplete() {
    const validate = validateForm();
    console.log(validate);
    let isValid = true;

    if (!validate.isValid) {
        for (const key in validate.errors) {
            console.log(key);
            const errorElement = document.getElementById(`${key}-error`);
            console.log(errorElement);
            if (errorElement) { // Verifica che l'elemento esista prima di modificarlo
                errorElement.innerHTML = ""; // Rimuovi il contenuto precedente
                errorElement.innerHTML = validate.errors[key]; // Assegna il nuovo messaggio di errore
            }
        }
        isValid = false;
    }
    return isValid
}



function validateForm() {
    const errors = {}

    const name = document.getElementById('name').value
    const descrizione = document.getElementById('descrizione').value
    const brand = document.getElementById('brand').value
    const immagine = document.getElementById('immagine').value
    const prezzo = document.getElementById('prezzo').value


    if (!name) errors.name = "Il campo nome è obbligatorio."
    else errors.name = "";

    if (!descrizione) errors.descrizione = "Il campo descrizione è obbligatorio."
    else errors.descrizione = "";

    if (!brand) errors.brand = "Il campo brand è obbligatorio."
    else errors.brand = "";

    if (!immagine) errors.immagine = "Il campo immagine è obbligatorio."
    else errors.immagine = "";

    if (!prezzo) errors.prezzo = "Il campo prezzo è obbligatorio."
    else errors.prezzo = "";



    return {
        isValid: Object.values(errors).every(value => value === ''),
        errors
    }

}

async function deleteProduct(elementId) {
    
    if (confirm("Sei sicuro di voler eliminare il prodotto?")) {
        try {
            await fetch(`${API_URL}/${elementId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg",
                },
            });
            window.location.href = "back-office.html?status=cancel-ok";
            
        }
        catch (error) {
            console.error("Errore durante la chiamata DELETE:", error);
        }
    
    }
    
}



async function editProduct(elementId) {
    window.location.href = `back-office.html?_id=${elementId}&status=edit`;

}


getProductData()

async function getProductData() {
    const userId = params.get("_id");
    console.log(userId);

    if (userId) {
        const editTitle = document.querySelector(".edit-title");
        editTitle.classList.remove("d-none");
        const title = document.querySelector(".title");
        title.classList.add("d-none");

        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg",
                },
            });
            const productData = await response.json();

            productInput.value = productData._id
            nameInput.value = productData.name;
            descrizioneInput.value = productData.description;
            brandInput.value = productData.brand;
            immagineInput.value = productData.imageUrl;
            prezzoInput.value = productData.price;
        } catch (error) {
            console.log('Errore nel recupero dei prodotti: ', error);
        }

    }

}

function messageAleart() {
    const status = params.get('status')

    if (status && status === "cancel-ok") showAlert('cancel');
    if (status && status === "edit-ok") showAlert('edit');
    if (status && status === "new-ok") showAlert('new');

    clearQueryString();
}

function showAlert(message) {

    const alertContainer = document.querySelector('#alert-container');
    alertContainer.classList.remove ('d-none');
    alertContainer.innerHTML = message === 'new'
        ? "Prodotto creato con successo"
        : message === 'edit'
            ? "Prodotto modificato con successo"
            : "Prodotto cancellato con successo"


    setTimeout(() => alertContainer.classList.add('d-none'), 4000);
    
}

function clearQueryString() {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
  }



