// function to calculate item total
var calculatePrice = function (price, qty) {
  return price * qty;
}

// function to calculate cart total
var calculateCartTotal = function() {
  
  // create array to store item totals
  var allPrices = [];

  // iterate over rows to capture item totals
  $('tbody tr').each(function (i, ele) {
    var price = parseFloat($(ele).children('.price').text());
    var qty = parseFloat($(ele).find('.quantity input').val());
    var itemTotal = calculatePrice(price, qty);
    // insert into html
    $('.itemTotal').html(itemTotal);
    // insert into allPrices array for cartTotal calculation
    allPrices.push(itemTotal);
  });

  // calculate cart total
  var cartTotal = allPrices.reduce(sum);
  // insert into html
  $('#cartTotal').html(cartTotal);
}

// doc ready function
$(document).ready(function () {

    // debounce
    var timeout;
    $('tr input').on('input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        calculatePrice();
      }, 500);
    });

  calculateCartTotal();

  // functionality of cancel buttons
  $(document).on('click', '.btn.cancel', function (event) {
    $(this).closest('tr').remove();
    calculateCartTotal();
  });
  
});