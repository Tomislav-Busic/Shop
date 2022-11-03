let sectionProduct = document.getElementById('section_product_id');
let productSection = document.querySelector('.product-section');
let imagesAll = undefined;
let imgNum = 0;



/*Get the id of product from localStorage.getItem and
  send this id to function fetchProductId in Api class.
  Then this class will return the data of this product id */
async function fetchProduct() {
    let idProduct = localStorage.getItem('id-modal');
    idProduct = parseInt(idProduct);

    let fetchProData = new Api();
    fetchProData.productId = idProduct;
    fetchProData = await fetchProData.fetchProductId(fetchProData.productId);

    displayProductById(fetchProData); 
    console.log(fetchProData);
}

 /* Replace the data in the product template and
set this template in the product section*/
 const displayProductById = (item) => {
    template_item = template_product.innerHTML; 

    template_item = template_item.replaceAll('${category}', item['category']['name']); 
    template_item = template_item.replaceAll('${image}', item['images']['0']); 
    template_item = template_item.replaceAll('${name}', item['title']);
    template_item = template_item.replaceAll('${price}', item['price']);
    template_item = template_item.replaceAll('${descriptionShort}', item['description'].substring(0, 20));
    template_item = template_item.replaceAll('${description}', item['description']);

    sectionProduct.innerHTML = template_item;

    //Backgound for the product
    productSection.style.background = `url(${item['category']['image']}) no-repeat`;
    productSection.style.backgroundPosition  = 'center';
    productSection.style.backgroundSize  = '100% 100%';

    let images = item?.images;
    
    //Get all images form the api url
    images?.forEach(img => {
      images_place_id.innerHTML += `<img src="${img}" />`
    });

    imagesAll = document.querySelectorAll('#images_place_id img');
} 

//Function for change the text less or more
const readMore = (btn) => {
  let parentEl = btn.closest('.description');
  let textLess = parentEl.querySelector('.show');
  let textMore = parentEl.querySelector('.hide');

  if(btn.innerText === 'READ MORE'){
    textLess.style.display = 'none';
    textMore.style.display = 'block';
    btn.innerText = 'READ LESS';
  } else {
    textMore.style.display = 'none';
    textLess.style.display = 'block';
    btn.innerText = 'READ MORE';
  }
}

//Back to the home page
const closeDetails = () => {
  window.location.href = '../index.html#products_section';
}

//Functions for the image slider
const moveRight = () => {
  hideImages();

  imgNum++;

  if(imgNum === imagesAll.length){
    imgNum = 0;
  }

  imagesAll[imgNum].style.display = 'block';
}

const moveLeft = () => {
  hideImages();

  imgNum--;

  if(imgNum === -1){
    imgNum = imagesAll.length -1;
  }

  imagesAll[imgNum].style.display = 'block';
}

const hideImages = () => {
  imagesAll.forEach(img => 
    img.style.display = 'none');
}

const toCart = (btn) => {
  let myElement = btn.closest('.add-cart');
  let price = myElement.querySelector('.price').innerText;
  let quantity = myElement.querySelector('.quantity input').value;
  let totalText = myElement.querySelector('.total');
  
  if(parseInt(quantity) > 0){
    quantity = parseInt(quantity);
    price = price.substring(1);
    price = parseInt(price);

    total = price * quantity;
    totalText.innerText = `Total: $${total}`;

    btn.innerText = 'ADDED';
    btn.setAttribute('disabled', 'true');

  } else {
    totalText.innerText = 'Please insert the quantity :)';
  }
}


//initalization
fetchProduct();