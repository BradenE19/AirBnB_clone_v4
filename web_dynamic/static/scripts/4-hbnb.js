$(document).ready(function () {
    $.get("http://0.0.0.0:5000/api/v1/status/", function (data, status) {
        if (status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });
    let listOfCheckedAmenities = []
    $('input').change(function() {
        const amenityName = $(this).attr("data-name");
        if (this.checked) {
            listOfCheckedAmenities.push(amenityName);
        } else {
            listOfCheckedAmenities = listOfCheckedAmenities.filter((item) => item !== amenityName);
        }
        $('div.amenities h4').text(listOfCheckedAmenities.join(', '));
    });
    const placesSection = document.querySelector('.places');
    fetch('http://0.0.0.0:5000/api/v1/places_search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
            `;
            placesSection.appendChild(article);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
    $('button').on('click', function () {
      $('.places > article').remove();
      const checkedAmenities = {};
      $.ajax({
        url: 'http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/places_search/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
        success: function (data) {
          displayPlaces(data);
        }
});
});
