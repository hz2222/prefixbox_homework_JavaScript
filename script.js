
const products = document.querySelectorAll('.product');
const discountCheck = document.getElementById('discountCheck');

function showDiscounts() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let productData = product.querySelector('.product-data');

    if (discountCheck.checked) {
      if (productData.querySelector('.product-old-price')) {
        product.style.display = 'inline-block';
      } else {
        product.style.display = 'none';
      }
    } else {
      product.style.display = 'inline-block';
    }
  }
}



const orderSelect = document.querySelector('.order');
const productsContainer = document.querySelector('.products');

orderSelect.addEventListener('change', () => {
	let products = [...productsContainer.querySelectorAll('.product')];
	let productsData = [];
	
	products.forEach(product => {
		let productData = {
			elem: product,
			price: product.querySelector('.product-price').textContent,
			priceNumber: parseFloat(product.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g,"")),
			oldPriceNumber: product.querySelector('.product-old-price') ? parseFloat(product.querySelector('.product-old-price').textContent.replace(/[^0-9.-]+/g,"")) : null
		};
		productsData.push(productData);
	});
	
	let sortedProducts;
	
	switch(orderSelect.value) {
		case '0':
			sortedProducts = productsData.sort((a, b) => {
				return a.priceNumber - b.priceNumber;
			});
			break;
		case '1':
			sortedProducts = productsData.sort((a, b) => {
				return b.priceNumber - a.priceNumber;
			});
			break;
		case '2':
			sortedProducts = productsData.sort((a, b) => {
				return a.elem.querySelector('.product-name').textContent.localeCompare(b.elem.querySelector('.product-name').textContent);
			});
			break;
		case '3':
			sortedProducts = productsData.sort((a, b) => {
				return b.elem.querySelector('.product-name').textContent.localeCompare(a.elem.querySelector('.product-name').textContent);
			});
			break;
	}
	
	sortedProducts.forEach(productData => {
		productsContainer.appendChild(productData.elem);
	});
});