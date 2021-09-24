import Listing from "./views/Listing/Listing.js"
import getCategoryId from "./views/FilterListing/FilterListing.js"
import Cart from "./views/Cart/Cart.js"
import SignIn from "./views/SignIn/SignIn.js"
import './style.sass'
const navigateTo = (url,filter) => {
    history.pushState(null, null, url)
    router(filter)
}
const router = async (filter) => {
    const routes = [
        {
            path: '/listing',
            viewToRender: () => Listing()
        }, {
            path: '/',
            viewToRender: () => Listing()
        }, {
            path: `/listing/${filter}`,
            viewToRender: () => getCategoryId(filter)
        }, {
            path: '/cart',
            viewToRender: () => Cart()
        },
        {
            path: '/signIn',
            viewToRender: () => SignIn()
        }
    ]
    const matchStatus = routes.map(route => ({
        ...route,
        isMatch: route.path === location.pathname
    }))

    const matchedRoute = matchStatus.find(route => route.isMatch === true)
    console.log(matchedRoute.viewToRender())
}

window.addEventListener('popstate', router)
window.onload =  function(){
    if(!localStorage.getItem('count')){
        localStorage.setItem('count',0);
    }else{
        document.getElementById('nav-items-total').innerHTML = localStorage.getItem('count')
    }
   
    navigateTo('/');
}
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        let link
        if (e.target.matches('[data-link]')) {
            link = e.target.href ? e.target.href : e.path[1].href
            console.log(e)
            e.preventDefault()
           navigateTo(link ,link.split('/').pop())
        }
    })

    
})
