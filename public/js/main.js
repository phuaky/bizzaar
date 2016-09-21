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
});

function getPriceRange (rangeData) {
  // console.log(rangeData, typeof rangeData);
  window.location = '/auth_biz/browse?range=' + rangeData;
  // $.ajax({
  //   url: '/auth_biz/find_price',
  //   type: 'POST',
  //   data: {range: rangeData}
  // })
  //   .done(function (data) {
  //     console.log('success getting price range', data)
  //     // location.reload()
  //
  //   })
  //   .fail(function () {
  //     console.log('error, cant get price range')
  //   })
  //   .always(function () {
  //     // console.log('complete')
  //   })
}

// Browse with Price range
function loadPriceRange (data) {
  console.log('loadPriceRange activated');
  var hello = ""
  var priceRanges = {
    catA1: 999999,
    catC1: 99999,
    catC2: 49999,
    catD1: 24999,
    catD2: 9999,
    catE1: 1000
  };
  hello = data
  for (var key in priceRanges) {
    if (key === hello) {
      return priceRanges[key];
    }
  }
console.log('the cat of price range is ' + hello);
}
