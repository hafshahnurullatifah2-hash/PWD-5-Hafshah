alert('scroll kebawah supaya ada button sroll bar');
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});