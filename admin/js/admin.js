/* =========================================================
   SHIVA EVENT ADMIN.JS
   COMPLETE SUPABASE VERSION
   SERVICES + STORAGE + BOOKINGS + REVIEWS + LOGOUT
   ========================================================= */

"use strict";


/* =========================================================
   ADMIN LOGIN PROTECTION - SUPABASE SESSION
   ========================================================= */

const ADMIN_AUTH_KEY = "shivaEventAdminAuth";


(async function protectAdminPage() {

    try {

        const {
            data,
            error
        } = await shivaSupabase.auth.getSession();


        if (error) {
            throw error;
        }


        if (!data.session) {

            sessionStorage.removeItem(
                ADMIN_AUTH_KEY
            );

            window.location.replace(
                "admin-login.html"
            );

            return;

        }


        const {
            data: profile,
            error: profileError
        } = await shivaSupabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single();


        if (profileError) {
            throw profileError;
        }


        if (profile?.role !== "admin") {

            await shivaSupabase.auth.signOut({
                scope: "local"
            });

            sessionStorage.removeItem(
                ADMIN_AUTH_KEY
            );

            window.location.replace(
                "admin-login.html"
            );

            return;

        }


        sessionStorage.setItem(
            ADMIN_AUTH_KEY,
            "true"
        );


    } catch (error) {

        console.error(
            "Admin authentication error:",
            error
        );


        sessionStorage.removeItem(
            ADMIN_AUTH_KEY
        );


        try {

            await shivaSupabase.auth.signOut({
                scope: "local"
            });

        } catch (signOutError) {

            console.error(
                "Sign out error:",
                signOutError
            );

        }


        window.location.replace(
            "admin-login.html"
        );

    }

})();


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const SERVICE_KEY =
    "shivaEventServices";

const BOOKING_KEY =
    "shivaEventBookings";

const REVIEWS_KEY =
    "shivaEventReviews";


/* =========================================================
   STORAGE BUCKET
   ========================================================= */

const STORAGE_BUCKET =
    "shiva-event-images";


/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [

    "Haldi",
    "Mehndi",
    "Jaymal Stage",
    "Wedding",
    "Room Decoration",
    "Car Decoration",
    "DJ & Sound",
    "Entry Gate",
    "Birthday",
    "Reception",
    "Flower Decoration",
    "Complete Event",
    "Other"

];


/* =========================================================
   DEFAULT SERVICES
   ========================================================= */

const defaultServices = [

    {
        id: 101,
        category: "Haldi",
        name: "Royal Haldi Decoration",
        price: "Starting ₹4,999",
        description:
            "Yellow floral Haldi setup with traditional seating and beautiful backdrop.",
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 201,
        category: "Mehndi",
        name: "Royal Mehndi Decoration",
        price: "Starting ₹5,999",
        description:
            "Colorful Mehndi seating setup with flowers and decorative backdrop.",
        images: [
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 301,
        category: "Jaymal Stage",
        name: "Grand Jaymal Stage",
        price: "Starting ₹12,999",
        description:
            "Grand Varmala stage with premium floral decoration.",
        images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 401,
        category: "Wedding",
        name: "Premium Wedding Stage",
        price: "Starting ₹18,999",
        description:
            "Premium wedding stage with flowers, backdrop and decorative lighting.",
        images: [
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 501,
        category: "Room Decoration",
        name: "Wedding Night Room",
        price: "Starting ₹3,999",
        description:
            "Romantic room decoration with flowers and beautiful lighting.",
        images: [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 601,
        category: "Car Decoration",
        name: "Wedding Car Decoration",
        price: "Starting ₹2,499",
        description:
            "Beautiful floral decoration for bride and groom wedding car.",
        images: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=90"
        ]
    },

    {
        id: 701,
        category: "DJ & Sound",
        name: "DJ Sound & Lighting",
        price: "Starting ₹7,999",
        description:
            "DJ, sound system, dance lights and complete party setup.",
        images: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=90"
        ]
    }

];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const serviceForm =
    document.getElementById("serviceForm");

const editId =
    document.getElementById("editId");

const serviceName =
    document.getElementById("serviceName");

const serviceCategory =
    document.getElementById("serviceCategory");

const servicePrice =
    document.getElementById("servicePrice");

const serviceDescription =
    document.getElementById("serviceDescription");

const imageUrls =
    document.getElementById("imageUrls");

const imageFiles =
    document.getElementById("imageFiles");

const uploadPreview =
    document.getElementById("uploadPreview");

const adminServiceList =
    document.getElementById("adminServiceList");

const adminSearch =
    document.getElementById("adminSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const bookingList =
    document.getElementById("bookingList");


/* =========================================================
   EDIT IMAGE MEMORY
   ========================================================= */

let editingExistingImages = [];


/* =========================================================
   SERVICES
   ========================================================= */

let services = loadServices();


/* =========================================================
   LOAD SERVICES
   ========================================================= */

function loadServices() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    SERVICE_KEY
                )
            );


        if (
            Array.isArray(saved) &&
            saved.length > 0
        ) {

            return normalizeServices(saved);

        }

    } catch (error) {

        console.warn(
            "Service loading error:",
            error
        );

    }


    localStorage.setItem(
        SERVICE_KEY,
        JSON.stringify(defaultServices)
    );


    return normalizeServices(
        defaultServices
    );

}


/* =========================================================
   NORMALIZE SERVICES
   ========================================================= */

function normalizeServices(list) {

    return list.map(item => {

        let images = [];


        if (
            Array.isArray(item.images)
        ) {

            images =
                item.images.filter(Boolean);

        }

        else if (item.image) {

            images = [
                item.image
            ];

        }

        else if (item.img) {

            images = [
                item.img
            ];

        }


        if (!images.length) {

            images = [

                "https://placehold.co/900x600?text=Shiva+Event"

            ];

        }


        return {

            ...item,

            category:
                item.category ||
                item.cat ||
                "Other",

            name:
                item.name ||
                "Untitled Service",

            price:
                item.price ||
                "Custom Quote",

            description:
                item.description ||
                item.desc ||
                "",

            images

        };

    });

}


/* =========================================================
   SAVE SERVICES
   ========================================================= */

function saveServices() {

    try {

        localStorage.setItem(
            SERVICE_KEY,
            JSON.stringify(services)
        );

    } catch (error) {

        console.error(
            "Could not save services:",
            error
        );

        alert(
            "Photos bahut badi hain. Browser storage full ho sakta hai."
        );

        return false;

    }


    renderEverything();


    /* =========================================
       SUPABASE SYNC
       ========================================= */

    (async () => {

        try {

            const {
                data: oldRows,
                error: readError
            } = await shivaSupabase
                .from("services")
                .select("id");


            if (readError) {
                throw readError;
            }


            const keepIds =
                services
                    .map(
                        item =>
                            Number(item.id)
                    )
                    .filter(
                        Number.isFinite
                    );


            for (
                const row of
                (oldRows || [])
            ) {

                if (
                    !keepIds.includes(
                        Number(row.id)
                    )
                ) {

                    const {
                        error
                    } =
                        await shivaSupabase
                            .from("services")
                            .delete()
                            .eq(
                                "id",
                                row.id
                            );


                    if (error) {
                        throw error;
                    }

                }

            }


            for (
                const item of services
            ) {

                const payload = {

                    id:
                        Number(item.id),

                    name:
                        item.name,

                    category:
                        item.category,

                    price:
                        item.price,

                    description:
                        item.description,

                    images:
                        Array.isArray(
                            item.images
                        )
                            ? item.images
                            : []

                };


                const {
                    error
                } =
                    await shivaSupabase
                        .from("services")
                        .upsert(
                            payload,
                            {
                                onConflict:
                                    "id"
                            }
                        );


                if (error) {
                    throw error;
                }

            }

        } catch (error) {

            console.error(
                "Supabase service save error:",
                error
            );

            alert(
                "Service browser me save ho gayi, lekin Supabase me save nahi hui."
            );

        }

    })();


    return true;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /[&<>"']/g,
            character => ({

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[character])
        );

}


/* =========================================================
   CATEGORY OPTIONS
   ========================================================= */

function renderCategoryOptions() {

    if (serviceCategory) {

        serviceCategory.innerHTML =
            categories
                .map(
                    category => `

                        <option value="${escapeHTML(category)}">
                            ${escapeHTML(category)}
                        </option>

                    `
                )
                .join("");

    }


    if (categoryFilter) {

        categoryFilter.innerHTML =
            `
                <option value="All">
                    All Categories
                </option>
            ` +

            categories
                .map(
                    category => `

                        <option value="${escapeHTML(category)}">
                            ${escapeHTML(category)}
                        </option>

                    `
                )
                .join("");

    }

}


/* =========================================================
   STATS
   ========================================================= */

function renderStats() {

    const totalServices =
        document.getElementById(
            "totalServices"
        );

    const totalPhotos =
        document.getElementById(
            "totalPhotos"
        );

    const totalCategories =
        document.getElementById(
            "totalCategories"
        );

    const newBookings =
        document.getElementById(
            "newBookings"
        );


    if (totalServices) {

        totalServices.textContent =
            services.length;

    }


    if (totalPhotos) {

        totalPhotos.textContent =
            services.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (
                        Array.isArray(
                            item.images
                        )
                            ? item.images.length
                            : 0
                    ),
                0
            );

    }


    if (totalCategories) {

        totalCategories.textContent =
            new Set(
                services.map(
                    item =>
                        item.category
                )
            ).size;

    }


    if (newBookings) {

        const bookings =
            loadBookings();


        newBookings.textContent =
            bookings.filter(
                item =>
                    item.status === "New"
            ).length;

    }

}


/* =========================================================
   RENDER SERVICES
   ========================================================= */

function renderServices() {

    if (!adminServiceList) {
        return;
    }


    const query =
        adminSearch
            ? adminSearch.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "All";


    const list =
        services.filter(item => {

            const searchable = [

                item.name,
                item.category,
                item.description,
                item.price

            ]
                .join(" ")
                .toLowerCase();


            const searchMatch =
                !query ||
                searchable.includes(
                    query
                );


            const categoryMatch =
                selectedCategory === "All" ||
                item.category ===
                selectedCategory;


            return (
                searchMatch &&
                categoryMatch
            );

        });


    if (!list.length) {

        adminServiceList.innerHTML = `

            <div class="empty-admin">

                <i class="fa-regular fa-face-frown"></i>

                <p>
                    No services found.
                </p>

            </div>

        `;

        return;

    }


    adminServiceList.innerHTML =

        list.map(item => {

            const firstImage =
                (
                    Array.isArray(
                        item.images
                    ) &&
                    item.images.length
                )
                    ? item.images[0]
                    : "https://placehold.co/900x600?text=Shiva+Event";


            return `

                <div
                    class="admin-service"
                    data-id="${item.id}"
                >

                    <div class="admin-thumb">

                        <img
                            src="${escapeHTML(firstImage)}"
                            alt="${escapeHTML(item.name)}"
                            onerror="this.src='https://placehold.co/900x600?text=Shiva+Event'"
                        >

                    </div>


                    <div class="admin-service-info">

                        <h3>
                            ${escapeHTML(item.name)}
                        </h3>

                        <p>
                            ${escapeHTML(item.category)}
                        </p>

                        <p>
                            ${escapeHTML(item.price)}
                            •
                            ${item.images.length}
                            Photos
                        </p>

                    </div>


                    <div class="admin-actions">

                        <button
                            class="edit-btn"
                            data-edit="${item.id}"
                            type="button"
                        >

                            <i class="fa-solid fa-pen"></i>

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            data-delete="${item.id}"
                            type="button"
                        >

                            <i class="fa-solid fa-trash"></i>

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    /* =========================================
       EDIT
       ========================================= */

    adminServiceList
        .querySelectorAll(
            "[data-edit]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editService(
                        Number(
                            button.dataset.edit
                        )
                    );

                }
            );

        });


    /* =========================================
       DELETE
       ========================================= */

    adminServiceList
        .querySelectorAll(
            "[data-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteService(
                        Number(
                            button.dataset.delete
                        )
                    );

                }
            );

        });

}


/* =========================================================
   IMAGE PREVIEW
   ========================================================= */

function renderPreview(images) {

    if (!uploadPreview) {
        return;
    }


    uploadPreview.innerHTML = "";


    if (
        !Array.isArray(images) ||
        !images.length
    ) {

        uploadPreview.innerHTML = `

            <span>
                Image Preview
            </span>

        `;

        return;

    }


    images.forEach(image => {

        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.style.position =
            "relative";


        const img =
            document.createElement(
                "img"
            );


        img.src = image;


        img.alt =
            "Service Photo";


        img.onerror = () => {

            img.src =
                "https://placehold.co/900x600?text=Shiva+Event";

        };


        wrapper.appendChild(
            img
        );


        uploadPreview.appendChild(
            wrapper
        );

    });

}


/* =========================================================
   IMAGE FILE PREVIEW
   ========================================================= */

if (imageFiles) {

    imageFiles.addEventListener(
        "change",
        async () => {

            try {

                const newImages =
                    await readFiles(
                        imageFiles.files
                    );


                if (editId?.value) {

                    renderPreview(
                        newImages.length
                            ? newImages
                            : editingExistingImages
                    );

                } else {

                    renderPreview(
                        newImages
                    );

                }

            } catch (error) {

                console.error(
                    "Preview error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   URL PREVIEW
   ========================================================= */

if (imageUrls) {

    imageUrls.addEventListener(
        "input",
        async () => {

            const urlImages =
                getURLImages();


            if (editId?.value) {

                let selectedImages = [];


                if (
                    imageFiles &&
                    imageFiles.files.length
                ) {

                    try {

                        selectedImages =
                            await readFiles(
                                imageFiles.files
                            );

                    } catch (error) {

                        console.error(
                            error
                        );

                    }

                }


                if (
                    selectedImages.length
                ) {

                    renderPreview(
                        selectedImages
                    );

                }

                else if (
                    urlImages.length
                ) {

                    renderPreview(
                        urlImages
                    );

                }

                else {

                    renderPreview(
                        editingExistingImages
                    );

                }

            }

            else {

                renderPreview(
                    urlImages
                );

            }

        }
    );

}


/* =========================================================
   GET URL IMAGES
   ========================================================= */

function getURLImages() {

    if (!imageUrls) {
        return [];
    }


    return imageUrls.value
        .split(/\r?\n/)
        .map(
            url =>
                url.trim()
        )
        .filter(Boolean);

}


/* =========================================================
   SAFE STORAGE FILE NAME
   ========================================================= */

function safeStorageName(name) {

    return String(
        name || "image"
    )
        .toLowerCase()
        .replace(
            /[^a-z0-9._-]+/g,
            "-"
        )
        .replace(
            /-+/g,
            "-"
        )
        .replace(
            /^-|-$/g,
            ""
        ) || "image";

}


/* =========================================================
   UPLOAD FILES TO SUPABASE STORAGE
   ========================================================= */

async function uploadFilesToStorage(
    fileList,
    serviceId
) {

    const files =
        Array.from(
            fileList || []
        );


    if (!files.length) {
        return [];
    }


    const uploadedUrls = [];


    for (const file of files) {

        if (
            !file.type ||
            !file.type.startsWith(
                "image/"
            )
        ) {

            throw new Error(
                `Only image files are allowed: ${file.name}`
            );

        }


        if (
            file.size >
            10 * 1024 * 1024
        ) {

            throw new Error(
                `Image is larger than 10 MB: ${file.name}`
            );

        }


        const path =
            `services/${serviceId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeStorageName(file.name)}`;


        const {
            error: uploadError
        } =
            await shivaSupabase
                .storage
                .from(
                    STORAGE_BUCKET
                )
                .upload(
                    path,
                    file,
                    {
                        cacheControl:
                            "3600",

                        upsert:
                            false,

                        contentType:
                            file.type
                    }
                );


        if (uploadError) {
            throw uploadError;
        }


        const {
            data: publicData
        } =
            shivaSupabase
                .storage
                .from(
                    STORAGE_BUCKET
                )
                .getPublicUrl(
                    path
                );


        if (
            !publicData?.publicUrl
        ) {

            throw new Error(
                "Public image URL could not be generated."
            );

        }


        uploadedUrls.push(
            publicData.publicUrl
        );

    }


    return uploadedUrls;

}


/* =========================================================
   READ FILES - PREVIEW ONLY
   ========================================================= */

function readFiles(fileList) {

    return Promise.all(

        Array.from(
            fileList || []
        ).map(
            file =>

                new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        const reader =
                            new FileReader();


                        reader.onload =
                            event => {

                                resolve(
                                    event.target.result
                                );

                            };


                        reader.onerror =
                            () => {

                                reject(
                                    new Error(
                                        "Image read failed"
                                    )
                                );

                            };


                        reader.readAsDataURL(
                            file
                        );

                    }
                )

        )

    );

}


/* =========================================================
   ADD / EDIT SERVICE
   ========================================================= */

if (serviceForm) {

    serviceForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            try {

                const isEditing =
                    Boolean(
                        editId?.value
                    );


                const id =
                    isEditing
                        ? Number(
                            editId.value
                        )
                        : Date.now();


                /* =========================================
                   URL IMAGES
                   ========================================= */

                const urlImages =
                    getURLImages();


                /* =========================================
                   NEW FILE UPLOADS
                   ========================================= */

                let uploadedImages = [];


                if (
                    imageFiles &&
                    imageFiles.files.length
                ) {

                    uploadedImages =
                        await uploadFilesToStorage(
                            imageFiles.files,
                            id
                        );

                }


                /* =========================================
                   FINAL IMAGES
                   ========================================= */

                let finalImages = [];


                if (isEditing) {

                    /*
                     * NEW FILES = replace old photos
                     * URL images = replace old photos
                     * nothing selected = keep old photos
                     */

                    if (
                        uploadedImages.length
                    ) {

                        finalImages =
                            uploadedImages;

                    }

                    else if (
                        urlImages.length
                    ) {

                        finalImages =
                            urlImages;

                    }

                    else {

                        finalImages =
                            editingExistingImages;

                    }

                }

                else {

                    finalImages = [

                        ...urlImages,

                        ...uploadedImages

                    ];

                }


                /* =========================================
                   REMOVE DUPLICATES
                   ========================================= */

                finalImages =
                    [
                        ...new Set(
                            finalImages
                                .filter(Boolean)
                        )
                    ];


                /* =========================================
                   PLACEHOLDER
                   ========================================= */

                if (
                    !finalImages.length
                ) {

                    finalImages = [

                        "https://placehold.co/900x600?text=Shiva+Event"

                    ];

                }


                /* =========================================
                   SERVICE OBJECT
                   ========================================= */

                const service = {

                    id,

                    name:
                        serviceName?.value
                            .trim() || "",

                    category:
                        serviceCategory?.value ||
                        "Other",

                    price:
                        servicePrice?.value
                            .trim() || "",

                    description:
                        serviceDescription?.value
                            .trim() || "",

                    images:
                        finalImages

                };


                /* =========================================
                   UPDATE / ADD
                   ========================================= */

                const existingIndex =
                    services.findIndex(
                        item =>
                            Number(item.id) ===
                            id
                    );


                if (
                    existingIndex >= 0
                ) {

                    services[
                        existingIndex
                    ] = service;

                }

                else {

                    services.unshift(
                        service
                    );

                }


                /* =========================================
                   SAVE
                   ========================================= */

                const saved =
                    saveServices();


                if (!saved) {
                    return;
                }


                /* =========================================
                   CLEAR
                   ========================================= */

                clearForm();


                alert(
                    isEditing
                        ? "Service updated successfully!"
                        : "Service added successfully!"
                );


            } catch (error) {

                console.error(
                    "Service save error:",
                    error
                );


                alert(
                    "Service save nahi ho paayi.\n\n" +
                    (
                        error?.message ||
                        "Console check karo."
                    )
                );

            }

        }
    );

}


/* =========================================================
   EDIT SERVICE
   ========================================================= */

function editService(id) {

    const item =
        services.find(
            service =>
                Number(service.id) ===
                Number(id)
        );


    if (!item) {

        alert(
            "Service not found."
        );

        return;

    }


    editingExistingImages = [

        ...(
            Array.isArray(
                item.images
            )
                ? item.images
                : []
        )

    ];


    if (editId) {

        editId.value =
            item.id;

    }


    if (serviceName) {

        serviceName.value =
            item.name || "";

    }


    if (serviceCategory) {

        serviceCategory.value =
            item.category || "Other";

    }


    if (servicePrice) {

        servicePrice.value =
            item.price || "";

    }


    if (serviceDescription) {

        serviceDescription.value =
            item.description || "";

    }


    if (imageUrls) {

        imageUrls.value =
            editingExistingImages
                .filter(
                    image =>
                        !String(
                            image
                        ).startsWith(
                            "data:image/"
                        )
                )
                .join("\n");

    }


    if (imageFiles) {

        imageFiles.value = "";

    }


    renderPreview(
        editingExistingImages
    );


    const formTitle =
        document.getElementById(
            "formTitle"
        );


    if (formTitle) {

        formTitle.textContent =
            "Edit Service";

    }


    if (serviceForm) {

        serviceForm.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* =========================================================
   DELETE SERVICE
   ========================================================= */

function deleteService(id) {

    const item =
        services.find(
            service =>
                Number(service.id) ===
                Number(id)
        );


    if (!item) {
        return;
    }


    const yes =
        confirm(
            `Delete "${item.name}"?`
        );


    if (!yes) {
        return;
    }


    services =
        services.filter(
            service =>
                Number(service.id) !==
                Number(id)
        );


    saveServices();


    clearForm();

}


/* =========================================================
   CLEAR FORM
   ========================================================= */

function clearForm() {

    if (serviceForm) {

        serviceForm.reset();

    }


    if (editId) {

        editId.value = "";

    }


    editingExistingImages = [];


    if (uploadPreview) {

        uploadPreview.innerHTML = `

            <span>
                Image Preview
            </span>

        `;

    }


    const formTitle =
        document.getElementById(
            "formTitle"
        );


    if (formTitle) {

        formTitle.textContent =
            "Add New Service";

    }

}


/* =========================================================
   CLEAR FORM BUTTON
   ========================================================= */

const clearFormButton =
    document.getElementById(
        "clearForm"
    );


if (clearFormButton) {

    clearFormButton.addEventListener(
        "click",
        clearForm
    );

}


/* =========================================================
   BOOKINGS - LOAD
   ========================================================= */

function loadBookings() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    BOOKING_KEY
                ) || "[]"
            );


        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        return [];

    }

}


/* =========================================================
   BOOKINGS - SAVE
   ========================================================= */

function saveBookings(bookings) {

    localStorage.setItem(
        BOOKING_KEY,
        JSON.stringify(bookings)
    );

}


/* =========================================================
   RENDER BOOKINGS
   ========================================================= */

function renderBookings() {

    if (!bookingList) {
        return;
    }


    const bookings =
        loadBookings();


    if (!bookings.length) {

        bookingList.innerHTML = `

            <div class="empty-admin">

                <i class="fa-regular fa-calendar-xmark"></i>

                <p>
                    No booking requests yet.
                </p>

            </div>

        `;

        return;

    }


    bookingList.innerHTML =

        bookings.map(
            booking => `

                <div class="booking-card">

                    <div class="booking-top">

                        <h3>
                            ${escapeHTML(
                booking.name
            )}
                        </h3>

                        <span class="booking-status">

                            ${escapeHTML(
                booking.status ||
                "New"
            )}

                        </span>

                    </div>


                    <div class="booking-info">

                        <div>

                            <strong>
                                📞 Phone
                            </strong>

                            <br>

                            ${escapeHTML(
                booking.phone
            )}

                        </div>


                        <div>

                            <strong>
                                📅 Date
                            </strong>

                            <br>

                            ${escapeHTML(
                booking.date
            )}

                        </div>


                        <div>

                            <strong>
                                🎉 Service
                            </strong>

                            <br>

                            ${escapeHTML(
                booking.service
            )}

                        </div>


                        <div>

                            <strong>
                                📍 Location
                            </strong>

                            <br>

                            ${escapeHTML(
                booking.location ||
                "Not provided"
            )}

                        </div>

                    </div>


                    <div class="booking-message">

                        <strong>
                            Message:
                        </strong>

                        <br>

                        ${escapeHTML(
                booking.message ||
                "No message"
            )}

                    </div>


                    ${booking.status !==
                    "Contacted"

                    ? `

                                <button
                                    class="contact-btn"
                                    data-contact="${booking.id}"
                                    type="button"
                                >

                                    <i class="fa-solid fa-check"></i>

                                    Mark Contacted

                                </button>

                            `

                    : ""
                }

                </div>

            `
        ).join("");


    bookingList
        .querySelectorAll(
            "[data-contact]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    markContacted(
                        Number(
                            button.dataset.contact
                        )
                    );

                }
            );

        });

}


/* =========================================================
   MARK BOOKING CONTACTED
   ========================================================= */

function markContacted(id) {

    const bookings =
        loadBookings();


    const updated =
        bookings.map(
            booking => {

                if (
                    Number(
                        booking.id
                    ) ===
                    Number(id)
                ) {

                    return {

                        ...booking,

                        status:
                            "Contacted"

                    };

                }


                return booking;

            }
        );


    saveBookings(
        updated
    );


    shivaSupabase
        .from("bookings")
        .update({
            status:
                "Contacted"
        })
        .eq(
            "id",
            id
        )
        .then(
            ({
                error
            }) => {

                if (error) {

                    console.error(
                        "Booking status save error:",
                        error
                    );

                }

            }
        );


    renderBookings();

    renderStats();

}


/* =========================================================
   CLEAR BOOKINGS
   ========================================================= */

const clearBookingsButton =
    document.getElementById(
        "clearBookings"
    );


if (clearBookingsButton) {

    clearBookingsButton.addEventListener(
        "click",
        async () => {

            if (
                !confirm(
                    "Delete all booking requests?"
                )
            ) {

                return;

            }


            localStorage.removeItem(
                BOOKING_KEY
            );


            try {

                const {
                    error
                } =
                    await shivaSupabase
                        .from("bookings")
                        .delete()
                        .neq(
                            "id",
                            0
                        );


                if (error) {

                    console.error(
                        "Clear bookings error:",
                        error
                    );

                }

            } catch (error) {

                console.error(
                    error
                );

            }


            renderBookings();

            renderStats();

        }
    );

}


/* =========================================================
   ADMIN SERVICE SEARCH
   ========================================================= */

if (adminSearch) {

    adminSearch.addEventListener(
        "input",
        renderServices
    );

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        renderServices
    );

}


/* =========================================================
   TABS
   ========================================================= */

document
    .querySelectorAll(
        ".tab-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".tab-btn"
                    )
                    .forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                button.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".tab-content"
                    )
                    .forEach(
                        section => {

                            section.classList.add(
                                "hidden"
                            );

                        }
                    );


                const target =
                    document.getElementById(
                        button.dataset.tab
                    );


                if (target) {

                    target.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    });


/* =========================================================
   LOCAL STORAGE SYNC
   ========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
            SERVICE_KEY
        ) {

            services =
                loadServices();

            renderEverything();

        }


        if (
            event.key ===
            BOOKING_KEY
        ) {

            renderBookings();

            renderStats();

        }


        if (
            event.key ===
            REVIEWS_KEY
        ) {

            renderAdminReviews();

        }

    }
);


/* =========================================================
   PAGE VISIBILITY SYNC
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) {

            services =
                loadServices();

            renderEverything();

            syncAdminData();

        }

    }
);


/* =========================================================
   ADMIN REVIEWS
   CONFIRM / REJECT
   ========================================================= */

const adminReviewList =
    document.getElementById(
        "adminReviewList"
    );

const clearReviewsButton =
    document.getElementById(
        "clearReviews"
    );

const pendingReviewBadge =
    document.getElementById(
        "pendingReviewBadge"
    );

const reviewNotification =
    document.getElementById(
        "reviewNotification"
    );

const reviewsTabBtn =
    document.getElementById(
        "reviewsTabBtn"
    );


/* =========================================================
   LOAD ADMIN REVIEWS
   ========================================================= */

function loadAdminReviews() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    REVIEWS_KEY
                )
            );


        if (
            Array.isArray(saved)
        ) {

            const normalized =
                saved.map(
                    review => ({

                        ...review,

                        status:
                            review.status ||
                            "approved"

                    })
                );


            localStorage.setItem(
                REVIEWS_KEY,
                JSON.stringify(
                    normalized
                )
            );


            return normalized;

        }

    } catch (error) {

        console.warn(
            "Admin review loading error:",
            error
        );

    }


    return [];

}


/* =========================================================
   SAVE ADMIN REVIEWS
   ========================================================= */

function saveAdminReviews(
    reviews
) {

    localStorage.setItem(
        REVIEWS_KEY,
        JSON.stringify(
            reviews
        )
    );

}


/* =========================================================
   REVIEW NOTIFICATION
   ========================================================= */

function updateReviewNotification() {

    const reviews =
        loadAdminReviews();


    const pending =
        reviews.filter(
            review =>
                review.status ===
                "pending"
        );


    if (pendingReviewBadge) {

        pendingReviewBadge.textContent =
            pending.length;


        pendingReviewBadge.classList.toggle(
            "show",
            pending.length > 0
        );

    }


    if (reviewNotification) {

        reviewNotification.hidden =
            pending.length === 0;


        reviewNotification.classList.toggle(
            "show",
            pending.length > 0
        );

    }


    if (reviewsTabBtn) {

        reviewsTabBtn.classList.toggle(
            "has-pending",
            pending.length > 0
        );


        reviewsTabBtn.title =
            pending.length

                ? `${pending.length} review${pending.length > 1 ? "s" : ""} waiting for approval`

                : "Reviews";

    }

}


/* =========================================================
   RENDER ADMIN REVIEWS
   ========================================================= */

function renderAdminReviews() {

    if (!adminReviewList) {
        return;
    }


    const reviews =
        loadAdminReviews();


    adminReviewList.innerHTML =
        "";


    if (!reviews.length) {

        adminReviewList.innerHTML = `

            <div class="empty-state">
                No customer reviews yet.
            </div>

        `;


        updateReviewNotification();

        return;

    }


    reviews
        .slice()
        .reverse()
        .forEach(
            review => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    `admin-review-row review-status-${review.status || "approved"}`;


                const rating =
                    Math.max(
                        1,
                        Math.min(
                            5,
                            Number(
                                review.rating
                            ) || 5
                        )
                    );


                const status =
                    review.status ||
                    "approved";


                const statusLabel =
                    status === "pending"

                        ? "Pending"

                        : status === "approved"

                            ? "Approved"

                            : "Rejected";


                row.innerHTML = `

                    <div class="admin-review-avatar">

                        ${review.photo

                        ? `
                                    <img
                                        src="${escapeHTML(review.photo)}"
                                        alt=""
                                    >
                                  `

                        : escapeHTML(
                            (
                                review.name ||
                                "C"
                            )
                                .charAt(0)
                                .toUpperCase()
                        )
                    }

                    </div>


                    <div class="admin-review-info">

                        <div class="admin-review-name-line">

                            <strong>
                                ${escapeHTML(
                        review.name
                    )}
                            </strong>

                            <span
                                class="review-status-pill ${status}"
                            >
                                ${statusLabel}
                            </span>

                        </div>


                        <div class="admin-review-stars">

                            ${"★".repeat(
                        rating
                    )
                    }

                            ${"☆".repeat(
                        5 - rating
                    )
                    }

                        </div>


                        <small>
                            ${escapeHTML(
                        review.date || ""
                    )}
                        </small>


                        <p>
                            ${escapeHTML(
                        review.text
                    )}
                        </p>


                        ${status === "pending"

                        ? `

                                    <div class="review-approval-actions">

                                        <button
                                            class="review-confirm-btn"
                                            type="button"
                                            data-confirm-review="${review.id}"
                                        >

                                            <i class="fa-solid fa-check"></i>

                                            Confirm & Publish

                                        </button>


                                        <button
                                            class="review-reject-btn"
                                            type="button"
                                            data-reject-review="${review.id}"
                                        >

                                            <i class="fa-solid fa-xmark"></i>

                                            Reject

                                        </button>

                                    </div>

                                  `

                        : `

                                    <div class="review-status-note">

                                        ${status ===
                            "approved"

                            ? "✓ Published on website"

                            : "✕ Rejected — hidden from website"
                        }

                                    </div>

                                  `
                    }

                    </div>


                    <button
                        class="delete-btn"
                        type="button"
                        data-delete-review="${review.id}"
                        title="Delete review"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                `;


                adminReviewList.appendChild(
                    row
                );

            }
        );


    /* =========================================
       CONFIRM
       ========================================= */

    adminReviewList
        .querySelectorAll(
            "[data-confirm-review]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        updateReviewStatus(
                            Number(
                                button.dataset
                                    .confirmReview
                            ),
                            "approved"
                        );

                    }
                );

            }
        );


    /* =========================================
       REJECT
       ========================================= */

    adminReviewList
        .querySelectorAll(
            "[data-reject-review]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        updateReviewStatus(
                            Number(
                                button.dataset
                                    .rejectReview
                            ),
                            "rejected"
                        );

                    }
                );

            }
        );


    /* =========================================
       DELETE
       ========================================= */

    adminReviewList
        .querySelectorAll(
            "[data-delete-review]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const id =
                            Number(
                                button.dataset
                                    .deleteReview
                            );


                        if (
                            !confirm(
                                "Delete this review permanently?"
                            )
                        ) {

                            return;

                        }


                        const reviews =
                            loadAdminReviews()
                                .filter(
                                    review =>
                                        Number(
                                            review.id
                                        ) !== id
                                );


                        saveAdminReviews(
                            reviews
                        );


                        renderAdminReviews();


                        try {

                            const {
                                error
                            } =
                                await shivaSupabase
                                    .from(
                                        "reviews"
                                    )
                                    .delete()
                                    .eq(
                                        "id",
                                        id
                                    );


                            if (error) {

                                console.error(
                                    "Review delete error:",
                                    error
                                );

                            }

                        } catch (error) {

                            console.error(
                                error
                            );

                        }

                    }
                );

            }
        );


    updateReviewNotification();

}


/* =========================================================
   UPDATE REVIEW STATUS
   ========================================================= */

async function updateReviewStatus(
    id,
    status
) {

    const reviews =
        loadAdminReviews();


    const index =
        reviews.findIndex(
            review =>
                Number(
                    review.id
                ) ===
                Number(id)
        );


    if (index === -1) {
        return;
    }


    reviews[index] = {

        ...reviews[index],

        status,

        reviewedAt:
            new Date().toISOString()

    };


    saveAdminReviews(
        reviews
    );


    renderAdminReviews();


    try {

        const {
            error
        } =
            await shivaSupabase
                .from("reviews")
                .update({
                    status
                })
                .eq(
                    "id",
                    id
                );


        if (error) {
            throw error;
        }


    } catch (error) {

        console.error(
            "Review status save error:",
            error
        );

    }


    if (
        status ===
        "approved"
    ) {

        alert(
            "Review confirmed and published on the website."
        );

    }

    else {

        alert(
            "Review rejected. It will stay hidden from the website."
        );

    }

}


/* =========================================================
   CLEAR ALL REVIEWS
   ========================================================= */

if (clearReviewsButton) {

    clearReviewsButton.addEventListener(
        "click",
        async () => {

            if (
                !confirm(
                    "Delete all customer reviews?"
                )
            ) {

                return;

            }


            localStorage.setItem(
                REVIEWS_KEY,
                JSON.stringify([])
            );


            renderAdminReviews();


            try {

                const {
                    error
                } =
                    await shivaSupabase
                        .from("reviews")
                        .delete()
                        .neq(
                            "id",
                            0
                        );


                if (error) {

                    console.error(
                        "Clear reviews error:",
                        error
                    );

                }

            } catch (error) {

                console.error(
                    error
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT - FIXED
   ========================================================= */

const logoutButton =
    document.getElementById(
        "adminLogout"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            /* =========================================
               PREVENT DOUBLE CLICK
               ========================================= */

            logoutButton.disabled =
                true;


            const originalText =
                logoutButton.innerHTML;


            logoutButton.innerHTML =
                `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Logging out...
                `;


            try {

                /* =========================================
                   IMPORTANT:
                   SUPABASE REAL LOGOUT
                   ========================================= */

                const {
                    error
                } =
                    await shivaSupabase
                        .auth
                        .signOut({
                            scope: "local"
                        });


                if (error) {

                    console.error(
                        "Supabase logout error:",
                        error
                    );

                }


            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }


            /* =========================================
               ALWAYS CLEAR ADMIN FLAG
               ========================================= */

            sessionStorage.removeItem(
                ADMIN_AUTH_KEY
            );


            /*
             * Old/local admin flag cleanup
             */
            try {

                localStorage.removeItem(
                    ADMIN_AUTH_KEY
                );

            } catch (error) {

                console.warn(
                    "Local admin flag cleanup error:",
                    error
                );

            }


            /* =========================================
               GO TO LOGIN PAGE
               ========================================= */

            window.location.replace(
                "admin-login.html"
            );

        }
    );

}


/* =========================================================
   SUPABASE AUTH STATE LISTENER
   ========================================================= */

shivaSupabase.auth.onAuthStateChange(
    (
        event,
        session
    ) => {

        console.log(
            "Supabase Auth Event:",
            event
        );


        if (
            event ===
            "SIGNED_OUT"
        ) {

            sessionStorage.removeItem(
                ADMIN_AUTH_KEY
            );

        }


        if (
            !session
        ) {

            sessionStorage.removeItem(
                ADMIN_AUTH_KEY
            );

        }

    }
);


/* =========================================================
   SUPABASE REMOTE SERVICE SYNC
   ========================================================= */

async function syncAdminServices() {

    try {

        const {
            data,
            error
        } =
            await shivaSupabase
                .from("services")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending:
                            true
                    }
                );


        if (error) {
            throw error;
        }


        if (
            Array.isArray(data) &&
            data.length
        ) {

            services =
                normalizeServices(

                    data.map(
                        row => ({

                            id:
                                row.id,

                            category:
                                row.category,

                            name:
                                row.name,

                            price:
                                row.price,

                            description:
                                row.description,

                            images:
                                Array.isArray(
                                    row.images
                                )
                                    ? row.images
                                    : []

                        })
                    )

                );


            localStorage.setItem(
                SERVICE_KEY,
                JSON.stringify(
                    services
                )
            );


            renderEverything();


        }

        else if (
            services.length
        ) {

            /*
             * First launch:
             * Seed existing services.
             */

            for (
                const item of services
            ) {

                const {
                    error: seedError
                } =
                    await shivaSupabase
                        .from(
                            "services"
                        )
                        .upsert(
                            {

                                id:
                                    Number(
                                        item.id
                                    ),

                                name:
                                    item.name,

                                category:
                                    item.category,

                                price:
                                    item.price,

                                description:
                                    item.description,

                                images:
                                    Array.isArray(
                                        item.images
                                    )
                                        ? item.images
                                        : []

                            },
                            {
                                onConflict:
                                    "id"
                            }
                        );


                if (seedError) {
                    throw seedError;
                }

            }

        }

    } catch (error) {

        console.warn(
            "Admin service sync skipped:",
            error
        );

    }

}


/* =========================================================
   SUPABASE REMOTE BOOKING SYNC
   ========================================================= */

async function syncAdminBookings() {

    try {

        const {
            data,
            error
        } =
            await shivaSupabase
                .from("bookings")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending:
                            false
                    }
                );


        if (error) {
            throw error;
        }


        const bookings =
            (
                data || []
            ).map(
                row => ({

                    id:
                        row.id,

                    name:
                        row.customer_name ||
                        "",

                    phone:
                        row.mobile ||
                        "",

                    date:
                        row.event_date ||
                        "",

                    service:
                        row.event_type ||
                        "",

                    location:
                        row.address ||
                        "",

                    message:
                        row.message ||
                        "",

                    status:
                        row.status ||
                        "New",

                    createdAt:
                        row.created_at
                            ? new Date(
                                row.created_at
                            )
                                .toLocaleString(
                                    "en-IN"
                                )
                            : ""

                })
            );


        localStorage.setItem(
            BOOKING_KEY,
            JSON.stringify(
                bookings
            )
        );


        renderBookings();

        renderStats();


    } catch (error) {

        console.warn(
            "Admin booking sync skipped:",
            error
        );

    }

}


/* =========================================================
   SUPABASE REMOTE REVIEW SYNC
   ========================================================= */

async function syncAdminReviews() {

    try {

        const {
            data,
            error
        } =
            await shivaSupabase
                .from("reviews")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending:
                            false
                    }
                );


        if (error) {
            throw error;
        }


        const reviews =
            (
                data || []
            ).map(
                row => ({

                    id:
                        row.id,

                    name:
                        row.customer_name ||
                        "Customer",

                    photo:
                        row.photo_url ||
                        "",

                    rating:
                        row.rating ||
                        5,

                    text:
                        row.review_text ||
                        "",

                    date:
                        row.created_at
                            ? String(
                                row.created_at
                            ).slice(
                                0,
                                10
                            )
                            : "",

                    status:
                        row.status ||
                        "pending",

                    reviewedAt:
                        ""

                })
            );


        localStorage.setItem(
            REVIEWS_KEY,
            JSON.stringify(
                reviews
            )
        );


        renderAdminReviews();


    } catch (error) {

        console.warn(
            "Admin review sync skipped:",
            error
        );

    }

}


/* =========================================================
   SYNC ALL ADMIN DATA
   ========================================================= */

async function syncAdminData() {

    await Promise.all([

        syncAdminServices(),

        syncAdminBookings(),

        syncAdminReviews()

    ]);

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderEverything() {

    renderStats();

    renderServices();

    renderBookings();

    renderAdminReviews();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

renderCategoryOptions();

renderEverything();


/* =========================================================
   LOAD SHARED SUPABASE DATA
   ========================================================= */

syncAdminData();