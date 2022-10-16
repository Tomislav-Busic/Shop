let menuBtn = document.getElementById('menu_btn');
let menuItem = document.querySelector('.menu .menu-ul');
let categorySection = document.getElementById('categories_id');
let productSection = document.getElementById('products_id');
let dropdownCategory = document.getElementById('dropdown_id');
let changeHeadingProducts = document.querySelector('.heading-products');
let searchInput = document.getElementById('search_id');
let selectOption = document.getElementById('options_id');
let categoryTitle = document.querySelector('.heading-products');
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

//Chose category with dropdown link
const choseCategory = (e) => {
    let itemChild = e.querySelector('a');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
};

//Chose category with dropdown link
const choseCategoryByImage = (e) => {
    let itemChild = e.querySelector('h1');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
}

//Search by name in this category
searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    let filterByNameCategory = filterProducts.filter(item => 
        item.title.toLowerCase().includes(value) && item.category.name ===  categoryTitle.innerText);

    let filterByNameAll = filterProducts.filter(item => 
        item.title.toLowerCase().includes(value));

    if(categoryTitle.innerText === 'All Products'){
        displayProducts(filterByNameAll);
    } else {
        displayProducts(filterByNameCategory);
    }
});

//Filter with options
selectOption.addEventListener("onchange", (e) => {
    
})


//Replace empty property of images with category image
const iteemCategory = (item) => {
    switch (item){
        case "Furniture":
            item = "https://api.lorem.space/image/furniture?w=640&h=480&r=3563";
            break;
        case "Clothes":
            item = "https://api.lorem.space/image/fashion?w=640&h=480&r=8681";
            break;
        case "Electronics":
            item = "https://api.lorem.space/image/watch?w=640&h=480&r=7135";
            break;
        case "Shoes":
            item = "https://api.lorem.space/image/shoes?w=640&h=480&r=5563";
            break;
        case "Others":
            item = "https://api.lorem.space/image?w=640&h=480&r=9518";
    }
    return item;
}

//Display products
const displayProducts = async (data) => {
    let showData = data?.map((item) => {
        template_category = products_template_id.innerHTML;

        template_category = template_category.replaceAll('${id}', item['id']);
        template_category = template_category.replaceAll('${image}', item['images'][0] === '' ? iteemCategory(item.category.name) : item['images'][0]);
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