$(document).ready(function () {

    $('.signup').click(function() {
        var forms = document.getElementsByClassName("signup-form");
        for(let f of forms) {
            f.style.display = "block";
        }
    });

});
