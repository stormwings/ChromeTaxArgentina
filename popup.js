window.onload = function() {
  // const $inputPrice = document.getElementById('manual_amount_input');
  const $itemName = document.getElementsByClassName('tax__header--page_title')[0];
  const $itemPrice = document.getElementsByClassName('tax__header--find_item')[0];
  let $articlePriceContainer = null;

  // show amounts

  setTimeout(() => {
    const articlePrice = transformToFiat($articlePriceContainer);
    
    $itemPrice.innerHTML = `$${articlePrice}`;

    document.querySelector('.tax_iva > .amount > .amount--value').innerHTML = `$${(articlePrice * 0.21).toFixed(2)}`;
    document.querySelector('.tax_pais > .amount > .amount--value').innerHTML = `$${(articlePrice * 0.08).toFixed(2)}`;
    document.querySelector('.tax_ret > .amount > .amount--value').innerHTML = `$${(articlePrice * 0.35).toFixed(2)}`;
    document.querySelector('.tax_total > .amount > .amount--value').innerHTML = `$${(articlePrice * 0.64).toFixed(2)}`;
    document.querySelector('#total_final').innerHTML = `Precio Final: $${articlePrice + (articlePrice * 0.64)}`;
  }, 700)

  // events
  
  // $inputPrice.addEventListener("keyup", event => {
  //   const { target: { value } } = event;

  //   console.log(value);
  // });

  chrome.tabs.query({active: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.querySelector(".apphub_AppName").textContent'
    }, (results) => $itemName.innerHTML = results);
  });

  chrome.tabs.query({active: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.querySelector(".price").textContent'
    }, (results) => $articlePriceContainer = results ? results : null);
  });
}

// helper utils

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

const removeElements = (item) => item.replace(/\D/g, "")

const transformToFiat = (number) => {
  const numberString = removeElements(number.toString());
  const entires = numberString.substring(0, numberString.length - 2);
  const decimals = numberString.slice(-2);

  return parseFloat(`${entires},${decimals}`);
}
