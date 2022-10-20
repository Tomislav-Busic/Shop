let sectionProduct = document.getElementById('section_product_id');

async function fetchProduct() {
    let idModal = localStorage.getItem('id-modal');
    idModal = parseInt(idModal);

    let fetchProData = new Api();
    fetchProData.productId = idModal;
    fetchProData = await fetchProData.fetchProductId(fetchProData.productId);

    displayProductById(fetchProData); 
    console.log(fetchProData);
}

 /* Replace the data in the modal template and
set this template in the modal section*/
 const displayProductById = (item) => {
    template_item = template_modal.innerHTML;    
    template_item = template_item.replaceAll('${name}', item['title']);   
    sectionProduct.innerHTML = template_item;
} 

//initalization
fetchProduct();