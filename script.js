let menuBtn = document.getElementById('menu_btn');
let menuItem = document.querySelector('.menu .menu-ul');
let cartOpen = document.getElementById('cart_open_id');
let cart = document.getElementById('cart_id');

let dropdownCategory = document.getElementById('dropdown_id');
let categorySection = document.getElementById('categories_id');
let productSection = document.getElementById('products_id');
let headingProductsMenu = document.getElementById('chose_heading_id');
let changeHeadingProducts = document.querySelector('.heading-products');
let searchInput = document.getElementById('search_id');
let selectOption = document.getElementById('options_id');

let allproductsArray = [];
let allCategoryArray = [];

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

//Close the menu and cart when user scrolling
window.addEventListener('scroll', () => {
    menuBtn.innerText = 'MENU';
    menuItem.style.right = '-15rem';
});

//Get the data for the category and products form the class Api.js
async function getAllApis() {
    let getApiSource = new Api();

    getCategory = await getApiSource.fetchCategory();
    console.log(getCategory);
    displayCategory(getCategory);
    

    getProducts = await getApiSource.fetchProducts();
    allproductsArray = getProducts;
    console.log(getProducts);
    displayProducts(getProducts);
    
}

/* Replace the data in the category and dropdown template.
   Then set this templates category section and
   menu dropdown in corresponding place. 
   + set the heading choices in the Products section*/
   const displayCategory = async (data) => {
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
    headingProductsMenu.innerHTML = showDropdown; 
}

/* Replace the data in the template products and
   set this template in the product section */
   const displayProducts = async (data) => {
    let showData = data?.map((item) => {
        template_product = products_template_id.innerHTML;

        template_product = template_product.replaceAll('${id}', item['id']);
        template_product = template_product.replaceAll('${image}', item['images'][0] ? item['images'][0] : item['category']['image']);
        template_product = template_product.replaceAll('${image1}', item['images'][0] ? item['images'][0] : item['category']['image']);
        template_product = template_product.replaceAll('${image2}', item['images'][1] ? item['images'][1] : item['category']['image']);
        template_product = template_product.replaceAll('${image3}', item['images'][2] ? item['images'][2] : item['category']['image']);
        template_product = template_product.replaceAll('${name}', item['title']);
        template_product = template_product.replaceAll('${price}', item['price']);

        return template_product;
        
    }).join('');

    productSection.innerHTML = showData;  
}

/* Chose the Category with the dropdown link.
   Then change the Category heading text with chosen link and
   close the modal if it's open.
   Then filter the Products by the chosen Category */
const choseCategory = (e) => {
    let itemChild = e.querySelector('a');
    choseAndFilterCategory(itemChild);
    changeHeadingColor();
};


/* Chose the Category with onclick the image.
   Then change the Category heading with chosen image.
   Then filter the Products by chosen Category */
const choseCategoryByImage = (e) => {
    let itemChild = e.querySelector('h1');
    choseAndFilterCategory(itemChild);
    changeHeadingColor();
}

const choseAndFilterCategory = (itemChild) => {
    
    let itemText = itemChild.innerText;
    changeHeadingProducts.innerText = itemText;

    let filterItem = allproductsArray.filter(item => 
        item.category.name === itemText);
    displayProducts(filterItem);
}

const changeHeadingColor = () => {
    let text = headingProductsMenu.querySelectorAll('li');
    text.forEach(item => {
        let eachHeading = item.querySelector('a');
        
        if(eachHeading.innerText !== changeHeadingProducts.innerText){
            eachHeading.style.color = '#333';
        } else {
            eachHeading.style.color = 'crimson';
        }
    });
}

/*Display 'All Products' on the heading in the products section and
  change the heading name with this element name*/
const showAllHeading = (liName) => {
    displayProducts(allproductsArray);
    let thisText = liName.innerText;
    changeHeadingProducts.innerText = thisText;
}

//Search by the name for all Categories or for the each diferent Category.
searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    let filterByNameAll = allproductsArray.filter(item => 
        item.title.toLowerCase().includes(value));

    let filterByNameCategory = allproductsArray.filter(item => 
        item.title.toLowerCase().includes(value) && item.category.name ===  changeHeadingProducts.innerText);

    if(changeHeadingProducts.innerText === 'All Products'){
        displayProducts(filterByNameAll);
    } else {
        displayProducts(filterByNameCategory);
    }
});

/* Filter with the options.
   After the user chose 'All Products', it will be displayed all
   but also it will be change the heading in the products section.
   If the user chose the 'lower' or 'higher' price, it will be displayed 
   for all products lower or higher price. 
   But if before the chosen option the displayed products are not 'All Products', 
   it will be desplayed the 'lower' or 'higher' price for only type of the chosen products.  
    */
selectOption.addEventListener('change', (e) => {
    let value = e.target.value;

    const diferentOfAllProducts = (diferentOption) => {
        if(changeHeadingProducts.innerText === 'All Products'){
            displayProducts(allproductsArray);
        } else {
            displayProducts(diferentOption);
        }
    }
    
    switch(value){
        case 'all':
            displayProducts(allproductsArray);
            changeHeadingProducts.innerText = 'All Products';
            changeHeadingColor();
            break;

        case 'lower_price':
            let sortByLowerPrice = allproductsArray.sort((a,b) => 
                a.price - b.price);
            
            let sortLowerCategory = sortByLowerPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

                diferentOfAllProducts(sortLowerCategory);
            break;
            
        case 'higher_price':
            let sortByHigherPrice = allproductsArray.sort((a,b) => 
                b.price - a.price);

            let sortHigherCategory = sortByHigherPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

                diferentOfAllProducts(sortHigherCategory);
            break;     
    }
});

//Change the smoll icon on the product card to the background image of this card
const smollIcon = (img) => {
    let thisHref = img.getAttribute('src');
    let parentOfImg = img.closest('.card-product');
    let currentImg = parentOfImg.querySelector('.large-img');
    currentImg.src = thisHref;
}

/*After user onclick this button get the data-id 
  of this element from the parent element and send 
  this id to localStorage.setItem*/
const openDetails = (btn) => {
    let thisProductId = btn.parentElement.parentElement.parentElement.getAttribute('data-id');
    thisProductId = parseInt(thisProductId);

    localStorage.setItem('id-modal', thisProductId);
    console.log(thisProductId)
    window.location.href = 'product.html';
}

//initalization
getAllApis();