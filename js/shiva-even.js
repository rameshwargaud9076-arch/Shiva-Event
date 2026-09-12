"use strict";

/* =========================================================
   SHIVA EVENT CUSTOMER WEBSITE
   FINAL WORKING VERSION
   ADMIN EDIT / IMAGE SYNC FIXED
   ========================================================= */

const STORAGE_KEY = "shivaEventServices";
const BOOKING_KEY = "shivaEventBookings";


/* =========================================================
   DEFAULT SERVICES
   ========================================================= */

const defaultServices = [

    {
        id: 101,
        category: "Haldi",
        name: "Royal Haldi Decoration",
        price: "Starting ₹4,999",
        description: "Yellow floral Haldi setup with traditional seating and beautiful backdrop.",
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 102,
        category: "Haldi",
        name: "Floral Haldi Theme",
        price: "Starting ₹6,999",
        description: "Premium yellow and white flower decoration for Haldi ceremony.",
        images: [
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 103,
        category: "Haldi",
        name: "Haldi Photo Corner",
        price: "Starting ₹3,999",
        description: "Beautiful Haldi photo corner with flowers, props and seating.",
        images: [
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 201,
        category: "Mehndi",
        name: "Royal Mehndi Decoration",
        price: "Starting ₹5,999",
        description: "Colorful Mehndi seating setup with flowers and decorative backdrop.",
        images: [
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 202,
        category: "Mehndi",
        name: "Mehndi Stage Setup",
        price: "Starting ₹7,999",
        description: "Elegant Mehndi stage with colorful flowers, cushions and lighting.",
        images: [
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 301,
        category: "Jaymal Stage",
        name: "Grand Jaymal Stage",
        price: "Starting ₹12,999",
        description: "Grand Varmala stage with premium floral decoration.",
        images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 302,
        category: "Jaymal Stage",
        name: "Floral Varmala Stage",
        price: "Starting ₹15,999",
        description: "Luxury floral Varmala stage with elegant backdrop.",
        images: [
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 401,
        category: "Wedding",
        name: "Premium Wedding Stage",
        price: "Starting ₹18,999",
        description: "Premium wedding stage with flowers, backdrop and decorative lighting.",
        images: [
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 402,
        category: "Wedding",
        name: "Luxury Wedding Decor",
        price: "Starting ₹29,999",
        description: "Complete premium wedding decoration for your special day.",
        images: [
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 501,
        category: "Room Decoration",
        name: "Wedding Night Room",
        price: "Starting ₹3,999",
        description: "Romantic room decoration with flowers and beautiful lighting.",
        images: [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 502,
        category: "Room Decoration",
        name: "Premium Flower Room",
        price: "Starting ₹6,999",
        description: "Premium floral room setup for wedding night and special occasions.",
        images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 601,
        category: "Car Decoration",
        name: "Wedding Car Decoration",
        price: "Starting ₹2,499",
        description: "Beautiful floral decoration for bride and groom wedding car.",
        images: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 602,
        category: "Car Decoration",
        name: "Luxury Car Flower Decor",
        price: "Starting ₹4,999",
        description: "Premium car decoration using flowers and ribbons.",
        images: [
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 701,
        category: "DJ & Sound",
        name: "DJ Sound & Lighting",
        price: "Starting ₹7,999",
        description: "DJ, sound system, dance lights and complete party setup.",
        images: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 702,
        category: "DJ & Sound",
        name: "Premium DJ Night",
        price: "Starting ₹11,999",
        description: "Premium DJ setup with stage lights and party effects.",
        images: [
            "https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 801,
        category: "Entry Gate",
        name: "Grand Wedding Entry",
        price: "Starting ₹8,999",
        description: "Grand entrance gate with flowers, fabric and lighting.",
        images: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 901,
        category: "Birthday",
        name: "Birthday Theme Decoration",
        price: "Starting ₹2,999",
        description: "Theme birthday decoration with balloons, backdrop and lights.",
        images: [
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 1001,
        category: "Reception",
        name: "Reception Decoration",
        price: "Starting ₹14,999",
        description: "Elegant reception decoration with stage, flowers and lighting.",
        images: [
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 1101,
        category: "Flower Decoration",
        name: "Premium Flower Decoration",
        price: "Starting ₹9,999",
        description: "Fresh and artificial flower decoration for every event.",
        images: [
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 1201,
        category: "Complete Event",
        name: "Complete Wedding Package",
        price: "Custom Quote",
        description: "Stage, Haldi, Mehndi, entry, room, car and DJ package.",
        images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=90"
        ]
    }

];


/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [

    {
        name: "Haldi",
        icon: "🌼",
        description: "Yellow floral setups"
    },

    {
        name: "Mehndi",
        icon: "🌿",
        description: "Colorful Mehndi themes"
    },

    {
        name: "Jaymal Stage",
        icon: "💐",
        description: "Varmala stages"
    },

    {
        name: "Wedding",
        icon: "💍",
        description: "Premium wedding decor"
    },

    {
        name: "Room Decoration",
        icon: "🛏️",
        description: "Romantic room setup"
    },

    {
        name: "Car Decoration",
        icon: "🚗",
        description: "Wedding car decor"
    },

    {
        name: "DJ & Sound",
        icon: "🎧",
        description: "DJ and lighting"
    },

    {
        name: "Entry Gate",
        icon: "🚪",
        description: "Grand wedding entry"
    },

    {
        name: "Birthday",
        icon: "🎂",
        description: "Birthday themes"
    },

    {
        name: "Reception",
        icon: "🥂",
        description: "Reception decoration"
    },

    {
        name: "Flower Decoration",
        icon: "🌸",
        description: "Premium flowers"
    },

    {
        name: "Complete Event",
        icon: "💒",
        description: "Complete packages"
    }

];


let services = loadServices();

let activeCategory = "All";


/* =========================================================
   DOM
   ========================================================= */

const categoryGrid =
    document.getElementById("categoryGrid");

const filterRow =
    document.getElementById("filterRow");

const serviceGrid =
    document.getElementById("serviceGrid");

const searchInput =
    document.getElementById("searchInput");

const galleryTitle =
    document.getElementById("galleryTitle");

const noResult =
    document.getElementById("noResult");

const bookingModal =
    document.getElementById("bookingModal");

const bookingForm =
    document.getElementById("bookingForm");

const eventService =
    document.getElementById("eventService");

const imageViewer =
    document.getElementById("imageViewer");

const viewerImage =
    document.getElementById("viewerImage");


/* =========================================================
   STORAGE LOAD
   ========================================================= */

function loadServices() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            );

        if (
            Array.isArray(saved) &&
            saved.length > 0
        ) {

            return normalizeServices(saved);

        }

    } catch (error) {

        console.warn(
            "Could not read services:",
            error
        );

    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultServices)
    );

    return normalizeServices(defaultServices);

}


/* =========================================================
   NORMALIZE
   ========================================================= */

function normalizeServices(list) {

    return list.map(service => {

        let images = [];


        if (Array.isArray(service.images)) {

            images = service.images
                .filter(image =>
                    typeof image === "string" &&
                    image.trim() !== ""
                );

        }


        else if (
            typeof service.image === "string" &&
            service.image.trim() !== ""
        ) {

            images = [
                service.image
            ];

        }


        if (!images.length) {

            images = [
                "https://placehold.co/1000x700?text=Shiva+Event"
            ];

        }


        return {

            ...service,

            category:
                service.category ||
                service.cat ||
                "Other",

            name:
                service.name ||
                "Shiva Event Service",

            price:
                service.price ||
                "Contact For Price",

            description:
                service.description ||
                "",

            images

        };

    });

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            character => {

                const map = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return map[character];

            }
        );

}


/* =========================================================
   CATEGORY RENDER
   ========================================================= */

function renderCategories() {

    if (!categoryGrid)
        return;


    categoryGrid.innerHTML =

        categories.map(category => `

            <button
                class="category-card"
                data-category="${escapeHTML(category.name)}"
            >

                <div class="category-icon">
                    ${category.icon}
                </div>

                <h3>
                    ${escapeHTML(category.name)}
                </h3>

                <p>
                    ${escapeHTML(category.description)}
                </p>

            </button>

        `).join("");


    categoryGrid
        .querySelectorAll(".category-card")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectCategory(
                        button.dataset.category
                    );

                }
            );

        });

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function renderFilterButtons() {

    if (!filterRow)
        return;


    filterRow.innerHTML =

        `<button
            class="filter-btn active"
            data-category="All"
        >
            All
        </button>` +

        categories.map(category => `

            <button
                class="filter-btn"
                data-category="${escapeHTML(category.name)}"
            >
                ${escapeHTML(category.name)}
            </button>

        `).join("");


    filterRow
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectCategory(
                        button.dataset.category
                    );

                }
            );

        });

}


/* =========================================================
   SELECT CATEGORY
   ========================================================= */

function selectCategory(category) {

    activeCategory =
        category;


    filterRow
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
            );

        });


    galleryTitle.textContent =
        category === "All"
            ? "All Decoration"
            : `${category} Decoration`;


    renderServices();
renderReviews();


    document
        .getElementById("gallery")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   FILTER SERVICES
   ========================================================= */

function getFilteredServices() {

    const query =
        searchInput
            .value
            .trim()
            .toLowerCase();


    return services.filter(service => {

        const categoryMatch =
            activeCategory === "All" ||
            service.category === activeCategory;


        const searchable = [

            service.name,

            service.category,

            service.description,

            service.price

        ]
            .join(" ")
            .toLowerCase();


        const searchMatch =
            !query ||
            searchable.includes(query);


        return (
            categoryMatch &&
            searchMatch
        );

    });

}


/* =========================================================
   SERVICE RENDER
   ========================================================= */

function renderServices() {

    if (!serviceGrid)
        return;


    const list =
        getFilteredServices();


    serviceGrid.innerHTML = "";


    if (noResult) {

        noResult.style.display =
            list.length
                ? "none"
                : "block";

    }


    list.forEach(service => {

        const card =
            document.createElement("article");


        card.className =
            "service-card";


        const firstImage =
            service.images[0] ||
            "https://placehold.co/1000x700?text=Shiva+Event";


        card.innerHTML = `

            <div class="service-image">

                <img
                    src="${escapeHTML(firstImage)}"
                    alt="${escapeHTML(service.name)}"
                    loading="lazy"
                >

                <span class="category-tag">
                    ${escapeHTML(service.category)}
                </span>

                <span class="image-count">
                    <i class="fa-regular fa-images"></i>
                    ${service.images.length}
                </span>

            </div>


            <div class="service-body">

                <h3>
                    ${escapeHTML(service.name)}
                </h3>

                <p>
                    ${escapeHTML(service.description)}
                </p>

                <div class="service-bottom">

                    <span class="price">
                        ${escapeHTML(service.price)}
                    </span>

                    <button
                        class="service-book"
                        data-service="${escapeHTML(service.name)}"
                    >
                        Book Now
                    </button>

                </div>

            </div>

        `;


        const image =
            card.querySelector(
                ".service-image img"
            );


        image.addEventListener(
            "click",
            () => {

                openImageViewer(
                    firstImage
                );

            }
        );


        card
            .querySelector(".service-book")
            .addEventListener(
                "click",
                () => {

                    openBooking(
                        service.name
                    );

                }
            );


        serviceGrid.appendChild(
            card
        );

    });

}


/* =========================================================
   IMAGE VIEWER
   ========================================================= */

function openImageViewer(image) {

    if (!imageViewer || !viewerImage)
        return;


    viewerImage.src =
        image;


    imageViewer.classList.add(
        "show"
    );

}


function closeImageViewer() {

    if (!imageViewer || !viewerImage)
        return;


    imageViewer.classList.remove(
        "show"
    );


    viewerImage.src =
        "";

}


/* =========================================================
   BOOKING SERVICES
   ========================================================= */

function populateBookingServices() {

    if (!eventService)
        return;


    eventService.innerHTML =

        `<option value="">
            Select Service
        </option>` +

        services.map(service => `

            <option value="${escapeHTML(service.name)}">
                ${escapeHTML(service.name)}
            </option>

        `).join("");

}


/* =========================================================
   OPEN BOOKING
   ========================================================= */

function openBooking(serviceName = "") {

    populateBookingServices();


    if (serviceName) {

        eventService.value =
            serviceName;

    }


    bookingModal.classList.add(
        "show"
    );

}


/* =========================================================
   CLOSE BOOKING
   ========================================================= */

function closeBooking() {

    bookingModal.classList.remove(
        "show"
    );

}


/* =========================================================
   BOOKING SUBMIT
   ========================================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const booking = {

                id: Date.now(),

                name:
                    document
                        .getElementById("customerName")
                        .value
                        .trim(),

                phone:
                    document
                        .getElementById("customerPhone")
                        .value
                        .trim(),

                date:
                    document
                        .getElementById("eventDate")
                        .value,

                service:
                    eventService.value,

                location:
                    document
                        .getElementById("eventLocation")
                        .value
                        .trim(),

                message:
                    document
                        .getElementById("eventMessage")
                        .value
                        .trim(),

                status:
                    "New",

                createdAt:
                    new Date()
                        .toLocaleString("en-IN")

            };


            let bookings = [];


            try {

                bookings =
                    JSON.parse(
                        localStorage.getItem(
                            BOOKING_KEY
                        ) || "[]"
                    );

            } catch (error) {

                bookings = [];

            }


            if (!Array.isArray(bookings)) {

                bookings = [];

            }


            bookings.unshift(
                booking
            );


            localStorage.setItem(
                BOOKING_KEY,
                JSON.stringify(bookings)
            );


            alert(
                "Booking request sent successfully! Shiva Event team will contact you."
            );


            bookingForm.reset();

            closeBooking();

        }
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderServices
    );

}


/* =========================================================
   BUTTON HELPER
   ========================================================= */

function addClick(id, callback) {

    const element =
        document.getElementById(id);


    if (element) {

        element.addEventListener(
            "click",
            callback
        );

    }

}


/* =========================================================
   MAIN BUTTONS
   ========================================================= */

addClick(
    "exploreBtn",
    () => {

        document
            .getElementById("categories")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


addClick(
    "headerBookBtn",
    () => openBooking()
);


addClick(
    "quoteBtn",
    () => openBooking()
);


addClick(
    "specialBookBtn",
    () => openBooking(
        "Complete Wedding Package"
    )
);


addClick(
    "aboutBookBtn",
    () => openBooking()
);


addClick(
    "contactBookBtn",
    () => openBooking()
);


addClick(
    "allServicesBtn",
    () => selectCategory("All")
);


addClick(
    "modalClose",
    closeBooking
);


/* =========================================================
   BOOKING MODAL CLICK OUTSIDE
   ========================================================= */

if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        event => {

            if (
                event.target === bookingModal
            ) {

                closeBooking();

            }

        }
    );

}


/* =========================================================
   IMAGE VIEWER EVENTS
   ========================================================= */

addClick(
    "imageViewerClose",
    closeImageViewer
);


if (imageViewer) {

    imageViewer.addEventListener(
        "click",
        event => {

            if (
                event.target === imageViewer
            ) {

                closeImageViewer();

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "show"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "show"
                    );

                }
            );

        });

}


/* =========================================================
   FOOTER CATEGORY LINKS
   ========================================================= */

document
    .querySelectorAll(
        "[data-footer-category]"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                selectCategory(
                    link.dataset.footerCategory
                );

            }
        );

    });


/* =========================================================
   HERO SLIDER
   ========================================================= */

const heroSlides =
    document.querySelectorAll(
        ".hero-slide"
    );


let heroIndex = 0;


if (heroSlides.length > 1) {

    setInterval(
        () => {

            heroSlides[heroIndex]
                .classList.remove(
                    "active"
                );


            heroIndex =
                (
                    heroIndex + 1
                ) %
                heroSlides.length;


            heroSlides[heroIndex]
                .classList.add(
                    "active"
                );

        },
        5000
    );

}


/* =========================================================
   IMPORTANT:
   ADMIN → INDEX REAL-TIME STORAGE SYNC
   ========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key === STORAGE_KEY
        ) {

            services =
                loadServices();


            renderCategories();

            renderFilterButtons();

            populateBookingServices();

            renderServices();

        }


        if (
            event.key === BOOKING_KEY
        ) {

            // Booking data changed in admin/other tab.
            // Nothing extra required here.
            console.log(
                "Booking data updated."
            );

        }

    }
);


/* =========================================================
   ALSO CHECK STORAGE WHEN PAGE BECOMES VISIBLE
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            services =
                loadServices();


            renderCategories();

            renderFilterButtons();

            populateBookingServices();

            renderServices();

        }

    }
);



/* =========================================================
   CUSTOMER REVIEWS - ADMIN APPROVAL SYSTEM
   ========================================================= */
const REVIEWS_KEY = "shivaEventReviews";

/*
   CUSTOMER REVIEWS
   ----------------
   IMPORTANT: Reviews are stored in localStorage and are NEVER reset on
   page refresh. Old review-key names are also migrated automatically.
   Only admin-approved reviews are rendered publicly.
*/
const OLD_REVIEW_KEYS = [
    "shivaEventReviews",
    "shivaReviews",
    "customerReviews",
    "customer_reviews",
    "reviews"
];

function normalizeReview(review) {
    if (!review || typeof review !== "object") return null;

    let status = String(review.status ?? "approved").toLowerCase().trim();
    if (["confirmed", "confirm", "accepted", "accept", "published", "publish", "live"].includes(status)) {
        status = "approved";
    }
    if (["rejected", "reject", "declined", "decline"].includes(status)) {
        status = "rejected";
    }
    if (!status) status = "approved";

    return {
        id: review.id ?? Date.now() + Math.random(),
        name: String(review.name ?? "Customer").trim() || "Customer",
        photo: String(review.photo ?? "").trim(),
        rating: Math.max(1, Math.min(5, Number(review.rating) || 5)),
        text: String(review.text ?? review.review ?? "").trim(),
        date: String(review.date ?? review.createdAt ?? "").slice(0, 10),
        status,
        reviewedAt: review.reviewedAt || ""
    };
}

function loadReviews() {
    try {
        /* First look for the current key, then older keys used by previous versions. */
        let raw = null;
        let sourceKey = REVIEWS_KEY;

        for (const key of OLD_REVIEW_KEYS) {
            const value = localStorage.getItem(key);
            if (value !== null) {
                raw = value;
                sourceKey = key;
                break;
            }
        }

        if (raw !== null) {
            const saved = JSON.parse(raw);

            if (Array.isArray(saved)) {
                const normalized = saved.map(normalizeReview).filter(Boolean);

                /* Migrate old key data to the permanent current key. */
                if (sourceKey !== REVIEWS_KEY || normalized.length) {
                    localStorage.setItem(REVIEWS_KEY, JSON.stringify(normalized));
                }

                return normalized;
            }
        }
    } catch (error) {
        console.warn("Review loading error:", error);
    }

    /* No saved reviews yet. Do NOT create/overwrite customer data. */
    return [];
}

function saveReviews(reviews) {
    const normalized = Array.isArray(reviews)
        ? reviews.map(normalizeReview).filter(Boolean)
        : [];
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(normalized));
    return normalized;
}

function escapeReviewText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[char]));
}

function renderReviews() {
    const grid = document.getElementById("reviewsGrid");
    if (!grid) return;

    /* ONLY ADMIN-APPROVED REVIEWS ARE PUBLIC. */
    const reviews = loadReviews().filter(review => review.status === "approved");
    grid.innerHTML = "";

    /* No fake "Be the first to review" page. If there are no approved
       reviews yet, show a simple rate card so the section remains usable. */
    if (!reviews.length) {
        const card = document.createElement("article");
        card.className = "review-card review-placeholder-card";
        card.innerHTML = `
            <div class="review-top">
                <div class="review-avatar"><i class="fa-solid fa-star"></i></div>
                <div>
                    <div class="review-name">Share Your Experience</div>
                    <div class="review-date">Customer rating</div>
                </div>
            </div>
            <div class="review-stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <p class="review-text">Be the first customer to share your experience with Shiva Event.</p>
            <button type="button" class="review-rate-card" id="emptyStateRateBtn">
                <i class="fa-solid fa-star"></i> Rate Now
            </button>
        `;
        grid.appendChild(card);
        card.querySelector("#emptyStateRateBtn")?.addEventListener("click", openReviewModal);
        return;
    }

    /* Render ALL approved customer reviews. Never replace them with a single card. */
    reviews.slice().sort((a, b) => {
        const da = new Date(a.date || 0).getTime();
        const db = new Date(b.date || 0).getTime();
        return db - da || Number(b.id) - Number(a.id);
    }).forEach(review => {
        const card = document.createElement("article");
        card.className = "review-card";

        const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));
        const stars = Array.from({length: 5}, (_, i) =>
            `<i class="${i < rating ? "fa-solid" : "fa-regular"} fa-star"></i>`
        ).join("");

        const photo = review.photo
            ? `<img src="${escapeReviewText(review.photo)}" alt="${escapeReviewText(review.name)}" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='${escapeReviewText((review.name || "C").charAt(0).toUpperCase())}';">`
            : escapeReviewText((review.name || "C").charAt(0).toUpperCase());

        card.innerHTML = `
            <div class="review-top">
                <div class="review-avatar">${photo}</div>
                <div>
                    <div class="review-name">${escapeReviewText(review.name)}</div>
                    <div class="review-date">${escapeReviewText(review.date || "")}</div>
                </div>
            </div>
            <div class="review-stars">${stars}</div>
            <p class="review-text">${escapeReviewText(review.text)}</p>
            <button type="button" class="review-rate-card" data-rate-review="${escapeReviewText(review.id)}">
                <i class="fa-solid fa-star"></i> Rate Now
            </button>
        `;

        grid.appendChild(card);
    });

    grid.querySelectorAll("[data-rate-review]").forEach(button => {
        button.addEventListener("click", openReviewModal);
    });
}

const reviewModal = document.getElementById("reviewModal");
const openReviewBtn = document.getElementById("openReviewBtn");
const reviewModalClose = document.getElementById("reviewModalClose");
const reviewForm = document.getElementById("reviewForm");
const reviewRating = document.getElementById("reviewRating");
const ratingPicker = document.getElementById("ratingPicker");

function openReviewModal() {
    if (reviewModal) reviewModal.classList.add("show");
}

function closeReviewModal() {
    if (reviewModal) reviewModal.classList.remove("show");
}

if (openReviewBtn) openReviewBtn.addEventListener("click", openReviewModal);
if (reviewModalClose) reviewModalClose.addEventListener("click", closeReviewModal);

if (reviewModal) {
    reviewModal.addEventListener("click", event => {
        if (event.target === reviewModal) closeReviewModal();
    });
}

if (ratingPicker) {
    ratingPicker.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            reviewRating.value = button.dataset.rating;
            ratingPicker.querySelectorAll("button").forEach(item => {
                item.classList.toggle("active", Number(item.dataset.rating) <= Number(reviewRating.value));
            });
        });
    });
    ratingPicker.querySelector('button[data-rating="5"]')?.click();
}

if (reviewForm) {
    reviewForm.addEventListener("submit", event => {
        event.preventDefault();

        const review = {
            id: Date.now(),
            name: document.getElementById("reviewName").value.trim(),
            photo: document.getElementById("reviewPhoto").value.trim(),
            rating: Number(reviewRating.value),
            text: document.getElementById("reviewText").value.trim(),
            date: new Date().toISOString().slice(0, 10),
            status: "pending"
        };

        if (!review.name || !review.text) return;

        const reviews = loadReviews();
        reviews.push(review);
        saveReviews(reviews);

        /* Pending review stays hidden until admin confirms it. */
        renderReviews();
        reviewForm.reset();
        reviewRating.value = 5;
        ratingPicker?.querySelector('button[data-rating="5"]')?.click();
        closeReviewModal();

        alert("Thank you! Your review has been submitted for admin approval.");
    });
}

/* Admin confirm/reject changes the same localStorage key. */
window.addEventListener("storage", event => {
    if (event.key === REVIEWS_KEY || OLD_REVIEW_KEYS.includes(event.key)) {
        renderReviews();
    }
});

/* Re-render after refresh/history restore and whenever the tab becomes visible. */
window.addEventListener("pageshow", renderReviews);
window.addEventListener("focus", renderReviews);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderCategories();

renderFilterButtons();

populateBookingServices();

renderServices();