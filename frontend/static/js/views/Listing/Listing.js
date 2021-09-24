import categories from "../MenuCategories/MenuCategories.js"
import './Listing.sass'
export const fetchProducts = async () => {
    return await fetch(`http://localhost:5000/products`)
}
const Listing = (categoryId) => {
    if (!document.querySelector('#menu-categories')) {
        let aside = document.createElement('aside')
        aside.id = 'menu-categories'
        document.querySelector('.main-container').insertBefore(aside, document.querySelector('.main-container').firstChild)

    }
    !categoryId && categories()
    fetchProducts().then(data => data.json()).then(data => {
        let filteredData = data.filter(el => el.category === categoryId)
        renderTemplate(categoryId ? filteredData : data)

    })
}

const renderTemplate = (data) => {
    var temp,
        img,
        template,
        description,
        heading,
        price,
        buyNow

    var storedProducts = JSON.parse(localStorage.getItem("products"))
temp = document.getElementById("plp-product");
document.querySelectorAll('.product-container').forEach(el => el.remove())
// create containr back;
if (document.querySelector('.main-container .cart-items')) {
    document.querySelector('.cart-items').remove()

}
if (!document.querySelector('.container')) {
    var g = document.createElement('article');
    g.id = 'container';
    g.classList.add('container')
    document.querySelector('.main-container').appendChild(g)
}

for (let i = 0; i < data.length; i++) {
    template = document.importNode(temp.content, true)
    heading = template.querySelector(".product-description-heading")
    img = template.querySelector("img")
    description = template.querySelector(".product-description")
    buyNow = template.querySelector(".buy-now-btn")
    price = template.getElementById("price")
    img.src = data[i].imageURL
    img.setAttribute('alt', data[i].name)
    heading.innerHTML = data[i].name
    description.innerHTML = data[i].description
    price.innerHTML += ' ' + data[i].price
    buyNow.setAttribute('id', data[i].id)
    storedProducts ?. indexOf(data[i].id) > -1 && buyNow.setAttribute('disabled', true)
    document.getElementById('container').appendChild(template)
}

function detectMob() {
    return ( ( window.innerWidth <= 767 ) );
  }

console.log(detectMob())
// add click listener to menu categories
if (detectMob()) {
    let container = document.getElementById('container')
    let collection = document.querySelectorAll('.subcategory')
    for (let i = 0; i < collection.length; i++) {
        collection[i].addEventListener('click', function () {
            if (! container.classList.contains('is-visible')) {
                container.classList.add('is-visible')
                collection[i].appendChild(container)
            } else {
                container.classList.remove('is-visible')
            }
        })
    }
}

document.querySelectorAll('.buy-now-btn').forEach(el => {
    el.addEventListener('click', () => {
        el.innerHTML = 'Added To Cart';
        el.setAttribute('disabled', true)
        let count = + localStorage.getItem('count') + 1;

        localStorage.setItem('count', count)
        if (!localStorage.getItem('products')) {
            let arr = []
            arr.push(el.getAttribute('id'))
            localStorage.setItem('products', JSON.stringify(arr))
        } else {
            let arr = JSON.parse(localStorage.getItem('products'))
            arr.push(el.getAttribute('id'))
            localStorage.setItem('products', JSON.stringify(arr))
        }
        document.getElementById('nav-items-total').innerHTML = localStorage.getItem('count')
    })
})
}
export default Listing
