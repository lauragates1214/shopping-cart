$(document).ready(function () {
  $('.btn.cancel').on('click', function (event) {
    $(this).closest('tr').remove();
  });
});