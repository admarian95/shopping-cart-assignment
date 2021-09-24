import  { fetchProducts }  from '../Listing/Listing.js'


let flag = false;
import './Cart.sass'

const Cart = async () => {
    let cartProductIds = JSON.parse(localStorage.getItem('products'))
   
    fetchProducts().then(data => data.json()).then(data => {
        let cartProducts = data.filter(el => cartProductIds.indexOf(el.id)>-1)
        console.log(cartProducts)
        renderCartTemplate(cartProducts)
    })
}

const renderCartTemplate = (data) => {
    let template,
        temp,productImage,productHeading,totalPrice,itemPrice

        // add main heading for cart
        // <div class="cart-heading"> My Cart <span id="cart-items"></span><span>Items</span></div>
    temp = document.getElementById('cart')
   
        while (document.querySelector('.main-container').firstChild) {
            document.querySelector('.main-container').removeChild(document.querySelector('.main-container').firstChild);
        }
        if(!document.querySelector('.cart-items')){
            let section = document.createElement('section')
            section.classList.add( 'cart-items')
            document.querySelector('.main-container').insertBefore(section , document.querySelector('.main-container').firstChild)
            
        }
    for (let i = 0; i < data.length; i++) {
        template = document.importNode(temp.content, true);
        totalPrice = template.getElementById('total-item-price')
        itemPrice = template.getElementById('cart-item-price');
        productImage = template.querySelector(".cart-item-img");
        productImage.src = data[i].imageURL
        productImage.setAttribute('alt',data[i].name)
        productHeading = template.querySelector(".cart-item-heading")
        productHeading.innerHTML = data[i].name
        totalPrice.innerHTML = 'Rs '+ data[i].price
        itemPrice.innerHTML = 'Rs' + data[i].price
         document.querySelector('.cart-items').appendChild(template)
    }
    let headings = document.querySelectorAll('.cart-heading')
    for(let i =1 ;i<headings.length;i++){
        headings[i].remove()
    }
    let cartItems = +localStorage.getItem('count')
    document.getElementById('cart-items').innerHTML = ' (' + cartItems + ') '
    document.querySelector('.main-container').appendChild( document.querySelector('.cart-items'))
    
}
 export default Cart