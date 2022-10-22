let sectionProduct = document.getElementById('section_product_id');
let productSection = document.querySelector('.product-section');




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

    productSection.style.background = `url(${item['category']['image']}) no-repeat`;
    productSection.style.backgroundPosition  = 'center';
    productSection.style.backgroundSize  = '100% 100%';
} 

//initalization
fetchProduct();