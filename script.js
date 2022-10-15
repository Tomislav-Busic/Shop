let menuBtn = document.getElementById('menu_btn');
let menuItem = document.querySelector('.menu .menu-ul');
let categorySection = document.getElementById('categories_id');
let dropdownCategory = document.getElementById('dropdown_id');
let categoriesBtn = document.getElementById('categories_btn');

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
    menuBtn.innerText = 'CLOSE';
    menuItem.style.right = '-15rem';
})

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