$(document).ready(function () {
    let listOfCheckedAmenities = []; // Corrected variable name

    $('input[type="checkbox"]').change(function() { // Added 'type="checkbox"' for accuracy
        const amenityName = $(this).attr("data-name");
        
        if (this.checked) {
            listOfCheckedAmenities.push(amenityName);
        } else {
            listOfCheckedAmenities = listOfCheckedAmenities.filter((item) => item !== amenityName);
        }

        $('div.amenities h4').text(listOfCheckedAmenities.join(', '));
    });
});
