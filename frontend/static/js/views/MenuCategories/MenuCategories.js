import './MenuCategories.sass'
const LoadCategories = async () => {
    return await fetch('http://localhost:5000/categories');
}
let flag=false;
const categories = () => {
    LoadCategories().then(data => data.json()).then(data => renderTemplate(data))
}
const renderTemplate = (data) => {

    var temp,
        template,
        category,
        temp = document.getElementById("plp-categories");
    let orderedData = orderData(data)
   
        for (let i = 0; i < orderedData.length; i++) {
            template = document.importNode(temp.content, true);
            category = template.querySelector("a");
            category.innerHTML = orderedData[i].name
            category.href = `/listing/${
                orderedData[i].key
            }`
            category.setAttribute('data-link', true);
            category.setAttribute('key', 'subcategory');
            document.getElementById('menu-categories').appendChild(template);
        }
    }


const orderData = (data) => data.filter((el) => el.order !== -1).sort((a, b) => a.order - b.order)

export default categories
