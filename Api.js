class Api{
    constructor(){

        this.fetchCategory();
        this.fetchProducts();
    }
        
    //Fetching category
    async fetchCategory() {
        try{
            const response = await fetch('https://api.escuelajs.co/api/v1/categories');
            const data =  await response.json();
            return data;
        } catch(e){
            console.log('There was a problem: ', e)
        }
    }
    
    //Fetching products
    async fetchProducts() {
        try{
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            return data;
        } catch (e) {
            console.log('There was a problem: ', e);
        }
    }

}