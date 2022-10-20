
let modal = document.getElementById('modal');

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
set this template in the modal section
Open Modal */
 const displayProductById = (item) => {
    template_item = template_modal.innerHTML;    
    template_item = template_item.replaceAll('${name}', item['title']);   
    modal.innerHTML = template_item;
} 

fetchProduct();