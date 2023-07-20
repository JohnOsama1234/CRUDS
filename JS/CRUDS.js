//* Gets Elements
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDesc = document.getElementById("productDesc")
var addBtn = document.getElementById("addBtn")
var display = document.getElementById("display")
var search = document.getElementById("search")
var updateBtn = document.getElementById("updateBtn")



//* Variables
var prodArr;
var box;


//* Functions
(function () {
    if (localStorage.getItem("Products") != null) {
        prodArr = JSON.parse(localStorage.getItem("Products"))
        displayProd(prodArr)
    }
})()


function addProduct() {
    if(nameRegex() && priceRegex()){
        var proObj = {
            prodName: productName.value,
            prodPrice: productPrice.value,
            prodCat: productCategory.value,
            prodDesc: productDesc.value
        }
        prodArr.push(proObj)
        localStorage.setItem("Products", JSON.stringify(prodArr))
        displayProd(prodArr)
        clearForm()
    }
}

function displayProd(arr) {
    box = ''
    for (var i = 0; i < arr.length; i++) {
        box += `
            <tr>
                <td>${i + 1}</td>
                <td>${arr[i].prodName}</td>
                <td>${arr[i].prodPrice}</td>
                <td>${arr[i].prodCat}</td>
                <td>${arr[i].prodDesc}</td>
                <td><button class="btn btn-warning" onclick="setFormForUpdate(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProd(${i})">Delete</button></td>
            </tr>    
    `
    }

    display.innerHTML = box
}

function clearForm() {
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDesc.value = ""
}
function deleteProd(index) {
    prodArr.splice(index, 1)
    localStorage.setItem("Products", JSON.stringify(prodArr))
    displayProd(prodArr)
}

function searchProd(input) {
    var prodArrSearch = []
    for (var i = 0; i < prodArr.length; i++) {
        if (prodArr[i].prodName.toLowerCase().includes(input.toLowerCase())) {
            prodArrSearch.push(prodArr[i])
            displayProd(prodArrSearch)
        }

    }

}
var globalIndex ;
function setFormForUpdate (index){
    globalIndex = index;
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productName.value = prodArr[index].prodName
    productPrice.value = prodArr[index].prodPrice
    productCategory.value = prodArr[index].prodCat
    productDesc.value = prodArr[index].prodDesc
}
function updateProdact(){
    prodArr[globalIndex].prodName = productName.value
    prodArr[globalIndex].prodPrice = productPrice.value
    prodArr[globalIndex].prodCat = productCategory.value
    prodArr[globalIndex].prodDesc = productDesc.value
    localStorage.setItem("Products" , JSON.stringify(prodArr))
    displayProd(prodArr)
    clearForm()
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
}

function nameRegex(){
    var regex = /^(\w+\S+)$/
    if (regex.test(productName.value)){
        return true
    }
    else {
        alert("Invalid Data")
        return false
    }
}
function priceRegex(){
    var regex = /^(\w+\S+)$/
    if (regex.test(productPrice.value)){
        return true
    }
    else {
        alert("Invalid Data")
        return false
    }
}


//* Events
addBtn.addEventListener("click", addProduct)
