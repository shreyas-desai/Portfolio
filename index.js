// Smooth scrolling script
$('a').on('click', function(event) {
    if (this.hash !== '') {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
    }
});

// Navbar hide/show on scroll script
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById('navbar');
let ticking = false;

function updateNavbar() {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = '0';
    } else {
        navbar.style.top = '-80px'; // Set the height of your navbar here
    }

    prevScrollPos = currentScrollPos;
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
});

$(document).ready(function () {
  // Function to toggle visibility of timeline dates
  function toggleTimelineDates() {
    var scrollPosition = $(window).scrollTop();
    var windowHeight = $(window).height();

    $(".swiper-slide").each(function () {
      var timelineItem = $(this);
      var timelineDate = timelineItem.find(".timeline-date");

      // Adjust the threshold based on your layout
      var threshold = timelineItem.offset().top - windowHeight / 2;

      if (scrollPosition > threshold) {
        timelineDate.addClass("visible");
      } else {
        timelineDate.removeClass("visible");
      }
    });
  }

  // Initialize Swiper
  mySwiper = new Swiper(".swiper-container--timeline", {
    direction: "horizontal", // Change to horizontal
    slidesPerView: "auto",
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Call the toggle function on scroll
  $(window).on("scroll", function () {
    toggleTimelineDates();
  });

  // Initial call to set visibility on page load
  toggleTimelineDates();
});

// Use debounce to improve performance
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Debounce the scroll event
var debouncedToggleTimelineDates = debounce(toggleTimelineDates, 100);

// Call the debounced function on scroll
$(window).on("scroll", debouncedToggleTimelineDates);


