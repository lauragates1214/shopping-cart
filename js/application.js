// function to calculate item total
var calculatePrice = function (price, qty) {
  return price * qty;
};

// doc ready function
$(document).ready(function () {
  
  // create array to store item totals
  var allPrices = [];

  // iterate over rows to capture item totals
  $('tbody tr').each(function (i, ele) {
    var price = parseFloat($(ele).children('.price').val());
    var qty = parseFloat($(ele).find('.quantity input').val());
    var itemTotal = calculatePrice(price, qty);
    allPrices.push(itemTotal);
  });

  // calculate cart total
  var cartTotal = allPrices.reduce(sum);
  // insert into html
  $('#cartTotal').html(cartTotal);

  // functionality of cancel buttons
  $('.btn.cancel').on('click', function (event) {
    $(this).closest('tr').remove();
  });
});