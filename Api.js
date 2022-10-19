class Api{
    constructor(){
        this.productId = '';

        this.fetchCategory();
        this.fetchProducts();
        this.fetchProductId(this.productId);
    }
        
    //Fetch the category
    async fetchCategory() {
        try{
            const response = await fetch('https://api.escuelajs.co/api/v1/categories');
            const data =  await response.json();
            return data;
        } catch(e){
            console.log('There was a problem: ', e)
        }
    }
    
    //Fetch the products
    async fetchProducts() {
        try{
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            return data;
        } catch (e) {
            console.log('There was a problem: ', e);
        }
    }

    //Fetch the product id 
    async fetchProductId(productId){
        try{
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
            const data = await response.json();
            
            return data;
              
        } catch (e) {
            console.log('There was a problem: ', e);
        }
    }

}