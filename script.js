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


async function getAllApis() {
    let getApiSource = new Api();

    getCategory = await getApiSource.fetchCategory();
    console.log(getCategory);
    displayCategory(getCategory);

    getProducts = await getApiSource.fetchProducts();
    filterProducts = getProducts;
    console.log(getProducts);
    displayProducts(getProducts);
}


/* Chose the Category with the dropdown link.
   Then change the Category heading with chosen link and
   close the modal if it's open.
   Then filter the Products by the chosen Category */
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

//Display 'All Products' on the heading in the products section.
const showAllHeading = () => {
    displayProducts(filterProducts)
}

//Search by the name for all Categories or for the each diferent Category.
searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    let filterByNameAll = filterProducts.filter(item => 
        item.title.toLowerCase().includes(value));

    let filterByNameCategory = filterProducts.filter(item => 
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
            displayProducts(filterProducts);
        } else {
            displayProducts(diferentOption);
        }
    }

    switch(value){
        case 'all':
            displayProducts(filterProducts);
            changeHeadingProducts.innerText = 'All Products';
            break;

        case 'lower_price':
            let sortByLowerPrice = filterProducts.sort((a,b) => 
                a.price - b.price);
            
            let sortLowerCategory = sortByLowerPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

                diferentOfAllProducts(sortLowerCategory);
            break;

        case 'higher_price':
            let sortByHigherPrice = filterProducts.sort((a,b) => 
                b.price - a.price);

            let sortHigherCategory = sortByHigherPrice.filter(item => 
                item.category.name === changeHeadingProducts.innerText);

                diferentOfAllProducts(sortHigherCategory);
            break;     
    }
});



//Replace the wrong property of the images with the category image
//Stlill looking for the better solution :)
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
getAllApis();