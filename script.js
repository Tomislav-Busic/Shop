let menuBtn = document.getElementById('menu_btn');
let menuItem = document.querySelector('.menu .menu-ul');
let categorySection = document.getElementById('categories_id');
let productSection = document.getElementById('products_id');
let dropdownCategory = document.getElementById('dropdown_id');
let changeHeadingProducts = document.querySelector('.heading-products');
let filterProducts = [];

let today = new Date;
footer_copyrights.innerText += today.getFullYear();


//Menu button open/close
menuBtn.addEventListener("click", (e) => {
    if(e.target.innerText === 'MENU'){
        menuBtn.innerText = 'CLOSE';
        menuItem.style.right = '0rem';
    } else{
        menuBtn.innerText = 'MENU';
        menuItem.style.right = '-15rem';
    }
});

//Menu close when scrolling
window.addEventListener('scroll', () => {
    menuBtn.innerText = 'MENU';
    menuItem.style.right = '-15rem';
});

//Fetching category
async function fetchData() {
    try{
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data =  await response.json();
        console.log(data);
        displayData(data);
    } catch(e){
        console.log('There was a problem: ', e)
    }
}

//Fetching products
async function fetchProducts() {
    try{
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        console.log(data);
        filterProducts = data;
        displayProducts(data);
    } catch (e) {
        console.log('There was a problem: ', e);
    }
}

const choseCategory = (e) => {
    let itemChild = e.querySelector('a');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
};

const choseCategoryByImage = (e) => {
    let itemChild = e.querySelector('h1');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
}

//Display category
const displayProducts = async (data) => {
    let showData = data?.map((item) => {

        template_category = products_template_id.innerHTML;

        template_category = template_category.replaceAll('${id}', item['id']);
        template_category = template_category.replaceAll('${image}', item['images'][0]);
        template_category = template_category.replaceAll('${name}', item['title']);
        template_category = template_category.replaceAll('${description}', item['description'].substring(0, 50));

        return template_category;

    }).join('');


    productSection.innerHTML = showData;
}
      
//Display category
const displayData = async (data) => {
    let showData = data?.map((item) => {

        template_category = category_template_id.innerHTML;

        template_category = template_category.replaceAll('${image}', item['image']);
        template_category = template_category.replaceAll('${name}', item['name']);

        return template_category;

    }).join('');

    let showDropdown =  await data?.map((item) => {

        template_dropdown = template_dropdown_id.innerHTML;

        template_dropdown = template_dropdown.replaceAll('${name}', item['name']);

        return template_dropdown;
    }).join('');

    categorySection.innerHTML = showData;
    dropdownCategory.innerHTML = showDropdown;
}

fetchData();
fetchProducts();