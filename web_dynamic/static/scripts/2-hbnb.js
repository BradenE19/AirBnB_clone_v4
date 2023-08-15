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
});
