let menuBtn = document.getElementById('menu_btn');
let menuItem = document.querySelector('.menu .menu-ul');

let dropdownCategory = document.getElementById('dropdown_id');
let categorySection = document.getElementById('categories_id');
let productSection = document.getElementById('products_id');
let headingProductsMenu = document.getElementById('chose_heading_id');
/* let headingMenuText = undefined; */
let changeHeadingProducts = document.querySelector('.heading-products');
let searchInput = document.getElementById('search_id');
let selectOption = document.getElementById('options_id');
let modal = document.getElementById('modal');

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

/* Chose the Category with the dropdown link.
   Then change the Category heading with chosen link and
   close the modal if it's open.
   Then filter the Products by chosen Category */
const choseCategory = (e) => {
    let itemChild = e.querySelector('a');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;
    modal.style.display = 'none';

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
};

/* Chose the Category with onclick the image.
   Then change the Category heading with chosen image.
   Then filter the Products by chosen Category */
const choseCategoryByImage = (e) => {
    let itemChild = e.querySelector('h1');
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = filterProducts.filter(item => 
        item.category.name === itemText);
        displayProducts(filterItem);
}

const showAllHeading = () => {
    displayProducts(filterProducts)
}

//Search by name in this category
searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    let filterByNameCategory = filterProducts.filter(item => 
        item.title.toLowerCase().includes(value) && item.category.name ===  changeHeadingProducts.innerText);

    let filterByNameAll = filterProducts.filter(item => 
        item.title.toLowerCase().includes(value));

    if(changeHeadingProducts.innerText === 'All Products'){
        displayProducts(filterByNameAll);
    } else {
        displayProducts(filterByNameCategory);
    }
});

//Filter with options
selectOption.addEventListener('change', (e) => {
    let value = e.target.value;

    switch(value){
        case 'all':
            if (changeHeadingProducts.innerText !== 'All Products') {
                displayProducts(filterProducts);
                changeHeadingProducts.innerText = 'All Products';
            }
            
            break;

        case 'lower_price':
            let sortByLowerPrice = filterProducts.sort((a,b) => 
                a.price - b.price);
            
            let sortLowerCategory = sortByLowerPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

            if(changeHeadingProducts.innerText === 'All Products'){
                displayProducts(filterProducts);
            } else {
                displayProducts(sortLowerCategory);
            }
            break;

        case 'higher_price':
            let sortByHigherPrice = filterProducts.sort((a,b) => 
                b.price - a.price);

            let sortHigherCategory = sortByHigherPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

            if(changeHeadingProducts.innerText === 'All Products'){
                displayProducts(filterProducts)
            } else {    
                displayProducts(sortHigherCategory);
            }
            break;     
    }
});



//Replace empty property of images with category image
const itemCategory = (item) => {
    let imageUrl = item.images[0];

    switch (imageUrl){
        case '':
        case 'string':
        case 'https://www.cike.ws':
        case 'https://www.cojef.tv':
        case 'https://www.mugoqifokyf.co.uk':
        case 'https://paceimg.com/640/480/any':
            item = imageUrl;
            break;
    }

    return item;
}
     
/* Replace the data in the category and dropdown template and
   set this templates category section and menu dropdown   */
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
    headingProductsMenu.innerHTML += showDropdown;

    /* headingMenuText = headingProductsMenu.querySelectorAll('li a');
    headingMenuText.forEach(item => {
        if(changeHeadingProducts.innerText === item.innerText){
            item.classList.add('active-title');
        }
    }) */
}

/* Replace the data in the template products and
   set this template in the product section */
const displayProducts = async (data) => {
    let showData = data?.map((item) => {
        template_product = products_template_id.innerHTML;

        template_product = template_product.replaceAll('${id}', item['id']);
        template_product = template_product.replaceAll('${image}', item['images'][0] === itemCategory(item) ? item['category']['image'] : item['images'][0]);
        template_product = template_product.replaceAll('${name}', item['title']);
        template_product = template_product.replaceAll('${price}', item['price']);

        return template_product;
        
    }).join('');

    productSection.innerHTML = showData;
}

/* Open the modal and fetch the product Id if
   this Id is equal with button parent element Id */
const openModal = async (btn) => {
    let idModal = btn.parentElement.parentElement.parentElement.getAttribute('id');
    idModal = parseInt(idModal);

    try{
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${idModal}`);
        const data = await response.json();
        console.log(data)
        displayItemId(data);  
    } catch (e) {
        console.log('There was a problem: ', e);
    }
       
}

/* Replace the data in the modal template and
   set this template in the modal section
   Open Modal */
const displayItemId = (item) => {
    template_item = template_modal.innerHTML;

    template_item = template_item.replaceAll('${name}', item['title']);

    modal.innerHTML = template_item;
    modal.style.display = 'block';

}



//initalization
fetchData();
fetchProducts();