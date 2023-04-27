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
    var price = parseFloat($(ele).find('.price').text());
    var quantity = parseFloat($(ele).find('.quantity input').val());
    var itemTotal = parseFloat(calculatePrice(price, quantity)).toFixed(2);

    // insert into html
    $(ele).find('.itemTotal').html(itemTotal);

    // insert into allPrices array for cartTotal calculation
    allPrices.push(parseFloat(itemTotal));
  });

  // sum allPrices into variable cartTotal
  var sum = function (acc, subtotal) {
    return acc + subtotal;
  };

  var cartTotal = parseFloat(allPrices.reduce(sum, 0)).toFixed(2);

  // insert into html
  $('#cartTotal').html(parseFloat(cartTotal));
}

// doc ready function
$(document).ready(function () {

    // run calculateCartTotal function
    calculateCartTotal();

    $(document).on('keydown', 'tr input', function (event) {
      if (!Number.isInteger($(this).children('.itemTotal').val())) {
        console.log('hi1');
        $(this).closest('.itemTotal').html('calculating...');
      };
    });

    // debounce for user input
    var timeout;
    $(document).on('keyup', 'tr input', function (event) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        calculateCartTotal();
      }, 500);
    });

  // addItem functionality
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var newItem = $(this).children('[name=newItem]').val();

    // ensure price has 2 decimal places
    var newPrice = parseFloat($(this).children('[name=newPrice]').val()).toFixed(2);

    // if quantity not entered assign 0
    if ($(this).children('[name=newQuantity]').val() == '') {
      var newQuantity = 0;
    } else {
      var newQuantity = $(this).children('[name=newQuantity]').val();
    }

    var newTotal = calculatePrice(newPrice, newQuantity);

    $('tbody').append('<tr>' +
      '<td class="item">' + newItem + '</td>' +
      '<td>$<span class="price">' + newPrice + '</span></td>' +
      '<td class="quantity"><input type="number" value="' + newQuantity + '" />' +
        '<button class="btn btn-light btn-sm cancel">Cancel</button>' +
      '</td>' +
      '<td><span class="dollarSign">$</span><span class="itemTotal">' + newTotal + '</span></td>' + 
      '</tr>');
      
      // update cart total 
      calculateCartTotal();

      // clear form values
      $(this).children('[name=newItem]').val('');
      $(this).children('[name=newPrice]').val('');
      $(this).children('[name=newQuantity]').val('');
  });

  // functionality of cancel buttons 
  $(document).on('click', '.btn.cancel', function (event) {
    // remove row
    $(this).closest('tr').remove();

    // update cart total
    calculateCartTotal();
  });
});