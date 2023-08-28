function goBack() {
    window.location.href = "back-office.html";
}

const API_URL = "https://striveschool-api.herokuapp.com/api/product/"

const getRow = () => document.getElementById(`container`)

const getContainer = async () => {

    let response;

    try {
        response = await fetch(`${API_URL}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTE5ZjFmMTc1YzAwMTRjNTU4YmIiLCJpYXQiOjE2OTI2MDI3ODMsImV4cCI6MTY5MzgxMjM4M30.dki3jT4RgUPsHYO_eHTqHOaQ5txVX0fovK6HT3RrZEg"
            }
        })
        console.log(response);
    }
    catch (error) {
        console.log("fetch errore", error);
    }

    try {
        if (response && response.ok) {
            const res = await response.json();
            let product = res;
            console.log(product);

            for (let index = 0; index < product.length; index++) {
                const element = product[index];

                getRow().innerHTML += `

                <div class='col col-3 container-card '> <div class="card mb-4 shadow-sm  ">
                <img src='${element.imageUrl} class="image" ' />
                
                <div class=" middle">
                    <button class='btn btn-primary text' data-bs-toggle="modal" data-bs-target="#exampleModal "onclick="addToBasket('${element.name}', '${element.price}', '${element.imageUrl}')"> Aggiungi </button>
                    
                </div>
                <div class="d-flex flex-column align-items-center">
                <div class="card-body d-flex justify-content-center gap-2">
                <p class='font-weight-bold text-truncate'> ${element.name} </p>
                <a href="eyeProduct.html?_id=${element._id}"><i class="bi bi-eye"></i></a>
                
                </div>
                <div class="card-body">
                <p class='font-weight-bold text-truncate'>€ ${element.price} </p></div></div>
             `
            }
        } else {
            console.log("error: ", response.status, response.statusText);
            throw new Error(response ? response.status : "Unknown Status");
        }
    } catch (error) {
        console.log("parse error", error);
    }
}
window.onload = () => {

    getContainer()
}

function addToBasket(name, price, img) {
    const modalInstance = document.querySelector(".modal-body")
    console.log(modalInstance);
    const container = document.getElementById("table-body")

    container.innerHTML += ` <tr>
    <td><div class="card" style="width: 5rem;">
    <img src="${img}" class="card-img-top" alt="...">
  </div></td>
    <td>${name}</td>
    <td>${price}</td>
    <td><i class="bi bi-trash3" onclick="deletBasket(${price},event)"></i></td>
    
    </tr>`

    const total = document.querySelector(".totale ")
    const activeSpan= document.querySelector(".badge")
    activeSpan.classList.remove("d-none")

    total.innerHTML = Number(total.innerText) + Number(price)
    const counter= document.querySelector(".icon-container .badge")
    console.log(counter);
    counter.innerText = Number(counter.innerText) + 1
    

}

function deletBasket( price,event) {
    
    const removeRow= event.target.closest("tr");
    if (removeRow) {
        removeRow.remove(); // Rimuovi la riga dalla tabella
    }
    const total = document.querySelector(".totale ")
    total.innerHTML = Number(total.innerText) - Number(price)
    const counter= document.querySelector(".icon-container .badge")
    counter.innerText = Number(counter.innerText) - 1
    if (counter.innerText==="0") {
        const activeSpan= document.querySelector(".badge")
    activeSpan.classList.add("d-none")
    }
    
}

















