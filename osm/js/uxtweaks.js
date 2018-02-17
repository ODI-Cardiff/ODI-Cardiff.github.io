var input = document.getElementById("addr");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search_btn").click();
    }
});