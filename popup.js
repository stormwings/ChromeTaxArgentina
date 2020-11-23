window.onload = function() {
  const $inputName = document.getElementById('name');
  const $itemToSearch = document.getElementById('selected_item');

  const $article_name = document.querySelector('#greetings');
  const $tax_iva = document.querySelector('.tax_iva > .amount > .value');
  const $tax_pais = document.querySelector('.tax_pais > .amount > .value');
  const $tax_ret = document.querySelector('.tax_ret > .amount > .value');
  const $tax_total = document.querySelector('.tax_total > .amount > .value');
  const $tax_final = document.querySelector('#total_final');
  
  if ($inputName) {
    $inputName.addEventListener("keyup", event => {
      const { target: { value } } = event;
  
      console.log(value);
    });
  }

  setTimeout(() => {
    const $articleName = document.querySelector('.apphub_AppName').innerHTML;
    const $articlePriceContainer = getAllElementsWithAttribute('data-price-final')[0];
    const articlePrice = transformToFiat($articlePriceContainer.getAttribute('data-price-final'));
    
    $itemToSearch.innerHTML = `Precio: $${articlePrice}`;
    $article_name.innerHTML = $articleName;


    $tax_iva.innerHTML = `$${(articlePrice * 0.21).toFixed(2)}`;
    $tax_pais.innerHTML = `$${(articlePrice * 0.08).toFixed(2)}`;
    $tax_ret.innerHTML = `$${(articlePrice * 0.35).toFixed(2)}`;
    $tax_total.innerHTML = `$${(articlePrice * 0.64).toFixed(2)}`;

    $tax_final.innerHTML = `Precio Final: $${articlePrice + (articlePrice * 0.64)}`;
  }, 1000)
}

const getAllElementsWithAttribute = (attribute) => {
  let matchingElements = [];
  let allElements = document.getElementsByTagName('*');

  for (let i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null) {
      matchingElements.push(allElements[i]);
    }
  }

  return matchingElements;
}

const transformToFiat = (number) => {
  const numberString = number.toString();
  const entires = numberString.substring(0, numberString.length - 2);
  const decimals = numberString.slice(-2);

  return parseFloat(`${entires},${decimals}`);
}
