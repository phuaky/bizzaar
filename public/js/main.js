$(function () {
  console.log('TIME TO GET THINGS GOING!!! FREESTYLE');

  $('.target').change(function () {
    console.log($('#priceRangeSelect').val());
    getPriceRange(
      loadPriceRange(
        $('#priceRangeSelect').val()
      )
    );
  });

  $('#contentDiv').click(function () {
    console.log('im clicking on the div'  + $(this).val());
    // document.location.href = $(this).val();
  })
});

function getPriceRange (rangeData) {
  window.location = '/auth_biz/browse?range=' + rangeData;
}

// Browse with Price range
function loadPriceRange (data) {
  console.log('loadPriceRange activated');
  var hello = ""
  var priceRanges = {
    catA1: 9999999999999,
    catC1: 99999,
    catC2: 49999,
    catD1: 24999,
    catD2: 9999,
    catE1: 4999
  };
  hello = data
  for (var key in priceRanges) {
    if (key === hello) {
      return priceRanges[key];
    }
  }
console.log('the cat of price range is ' + hello);
}
