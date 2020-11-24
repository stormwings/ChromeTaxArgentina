window.onload = function() {
  const $inputPrice = document.getElementById('manual_amount_input');
  const $itemName = document.getElementsByClassName('tax__header--page_title')[0];
  const $itemPrice = document.getElementsByClassName('tax__header--find_item')[0];
  // let $articlePriceContainer = null;

  // dom result items

  const $tax_iva = document.querySelector('.tax_iva > .amount > .amount--value');
  const $tax_pais = document.querySelector('.tax_pais > .amount > .amount--value');
  const $tax_ret = document.querySelector('.tax_ret > .amount > .amount--value');
  const $tax_total = document.querySelector('.tax_total > .amount > .amount--value');
  const $total_final = document.querySelector('#total_final');

  // show amounts

  const setPrices = (articlePrice = 0) => {
    const formatPrice = (value, tax) => `$${(value * (tax || 1)).toFixed(2)}`

    $itemPrice.textContent = formatPrice(articlePrice);
    $tax_iva.textContent = formatPrice(articlePrice, 0.21);
    $tax_pais.textContent = formatPrice(articlePrice, 0.08);
    $tax_ret.textContent = formatPrice(articlePrice, 0.35);
    $tax_total.textContent = formatPrice(articlePrice, 0.64);

    const total = parseFloat(articlePrice) + articlePrice * 0.64;
    $total_final.textContent = `Precio Final: ${formatPrice(total)}`;
  }

  setTimeout(() => {
    setPrices();
  }, 700)

  // events
  
  $inputPrice.addEventListener("keyup", event => {
    const { target: { value } } = event;

    const regex = RegExp(/^[0-9]{1,9}([,.][0-9]{1,2})?$/);

    const number = value.replace(',', '.')

    if (regex.test(number)) {
      setPrices(number);
    } else {
      setPrices();
    }
  });

  chrome.tabs.query({active: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.querySelector(".apphub_AppName").textContent'
    }, (results) => $itemName.innerHTML = results);
  });

  // chrome.tabs.query({active: true}, function(tabs) {
  //   chrome.tabs.executeScript(tabs[0].id, {
  //     code: 'document.querySelector(".price").textContent'
  //   }, (results) => $articlePriceContainer = results ? results : null);
  // });
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
