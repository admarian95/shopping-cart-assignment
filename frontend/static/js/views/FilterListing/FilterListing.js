import Listing from "../Listing/Listing.js"
// import './FilterListing.css'


const fetchCategory = async () => {
    return await fetch(`http://localhost:5000/categories`)
}

const getCategoryId =   async (categoryName) =>  {
   
    await fetchCategory().then(data => data.json()).then(data => {
    Listing(data.filter(el=>el.key === categoryName)[0].id)
    })
}
export default getCategoryId
