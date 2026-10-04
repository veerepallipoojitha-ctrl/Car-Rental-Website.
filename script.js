// ==========================================
// CAR DATA
// ==========================================

const cars = [

    {
        id: 1,
        name: "Toyota Camry",
        type: "Sedan",
        price: 2500,
        image:
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Hyundai Creta",
        type: "SUV",
        price: 3000,
        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "BMW 3 Series",
        type: "Luxury",
        price: 6000,
        image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Tata Nexon",
        type: "SUV",
        price: 2000,
        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Honda City",
        type: "Sedan",
        price: 2200,
        image:
            "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Mercedes C-Class",
        type: "Luxury",
        price: 7000,
        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    }

];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const carContainer =
    document.getElementById("carContainer");

const selectedCar =
    document.getElementById("selectedCar");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const bookingForm =
    document.getElementById("bookingForm");

const pickupDate =
    document.getElementById("pickupDate");

const returnDate =
    document.getElementById("returnDate");

const totalPrice =
    document.getElementById("totalPrice");

const bookingContainer =
    document.getElementById("bookingContainer");


// ==========================================
// DISPLAY CARS
// ==========================================

function displayCars(carList) {

    carContainer.innerHTML = "";


    if (carList.length === 0) {

        carContainer.innerHTML =
            "<p>No cars found.</p>";

        return;
    }


    carList.forEach(car => {

        const card =
            document.createElement("div");

        card.className = "car-card";


        card.innerHTML = `

            <img
                src="${car.image}"
                class="car-image"
                alt="${car.name}"
            >

            <div class="car-details">

                <h3>${car.name}</h3>

                <p class="car-type">
                    ${car.type}
                </p>

                <p class="car-price">
                    ₹${car.price.toLocaleString()}
                    / day
                </p>

                <button
                    class="rent-btn"
                    onclick="selectCar(${car.id})"
                >
                    Rent Now
                </button>

            </div>

        `;


        carContainer.appendChild(card);

    });

}


// ==========================================
// LOAD CAR OPTIONS
// ==========================================

function loadCarOptions() {

    cars.forEach(car => {

        const option =
            document.createElement("option");

        option.value = car.id;

        option.textContent =
            `${car.name} - ₹${car.price}/day`;

        selectedCar.appendChild(option);

    });

}


// ==========================================
// SELECT CAR
// ==========================================

function selectCar(id) {

    selectedCar.value = id;

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

    calculatePrice();

}


// ==========================================
// SEARCH AND FILTER
// ==========================================

function filterCars() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const category =
        categoryFilter.value;


    const filteredCars =
        cars.filter(car => {

            const matchesSearch =
                car.name
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "all" ||
                car.type === category;


            return matchesSearch &&
                   matchesCategory;

        });


    displayCars(filteredCars);

}


searchInput.addEventListener(
    "input",
    filterCars
);


categoryFilter.addEventListener(
    "change",
    filterCars
);


// ==========================================
// CALCULATE RENTAL PRICE
// ==========================================

function calculatePrice() {

    const carId =
        parseInt(selectedCar.value);


    const car =
        cars.find(c => c.id === carId);


    if (!car) {

        totalPrice.textContent = "₹0";

        return;
    }


    if (
        !pickupDate.value ||
        !returnDate.value
    ) {

        totalPrice.textContent =
            `₹${car.price.toLocaleString()} / day`;

        return;
    }


    const pickup =
        new Date(pickupDate.value);

    const returnDay =
        new Date(returnDate.value);


    const difference =
        returnDay - pickup;


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (days <= 0) {

        totalPrice.textContent =
            "Invalid dates";

        return;
    }


    const total =
        days * car.price;


    totalPrice.textContent =
        `₹${total.toLocaleString()}`;

}


selectedCar.addEventListener(
    "change",
    calculatePrice
);


pickupDate.addEventListener(
    "change",
    calculatePrice
);


returnDate.addEventListener(
    "change",
    calculatePrice
);


// ==========================================
// BOOK CAR
// ==========================================

bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const email =
            document.getElementById(
                "customerEmail"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const carId =
            parseInt(selectedCar.value);


        const car =
            cars.find(c => c.id === carId);


        if (!car) {

            alert(
                "Please select a car."
            );

            return;
        }


        const pickup =
            new Date(pickupDate.value);

        const returnDay =
            new Date(returnDate.value);


        const difference =
            returnDay - pickup;


        const days =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (days <= 0) {

            alert(
                "Return date must be after pickup date."
            );

            return;
        }


        const total =
            days * car.price;


        const booking = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            car: car.name,

            pickup: pickupDate.value,

            returnDate: returnDate.value,

            days: days,

            total: total

        };


        saveBooking(booking);


        alert(
            "🎉 Booking confirmed successfully!"
        );


        bookingForm.reset();

        totalPrice.textContent = "₹0";

        displayBookings();

        document
            .getElementById("bookings")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// SAVE BOOKING TO LOCAL STORAGE
// ==========================================

function saveBooking(booking) {

    let bookings =
        JSON.parse(
            localStorage.getItem(
                "carBookings"
            )
        ) || [];


    bookings.push(booking);


    localStorage.setItem(
        "carBookings",
        JSON.stringify(bookings)
    );

}


// ==========================================
// DISPLAY BOOKINGS
// ==========================================

function displayBookings() {

    let bookings =
        JSON.parse(
            localStorage.getItem(
                "carBookings"
            )
        ) || [];


    bookingContainer.innerHTML = "";


    if (bookings.length === 0) {

        bookingContainer.innerHTML =
            `<p class="no-bookings">
                No bookings yet.
            </p>`;

        return;
    }


    bookings.forEach(booking => {

        const div =
            document.createElement("div");

        div.className =
            "booking-item";


        div.innerHTML = `

            <h3>
                🚗 ${booking.car}
            </h3>

            <p>
                <strong>Customer:</strong>
                ${booking.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${booking.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${booking.phone}
            </p>

            <p>
                <strong>Pickup:</strong>
                ${booking.pickup}
            </p>

            <p>
                <strong>Return:</strong>
                ${booking.returnDate}
            </p>

            <p>
                <strong>Duration:</strong>
                ${booking.days} day(s)
            </p>

            <p>
                <strong>Total:</strong>
                ₹${booking.total.toLocaleString()}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelBooking(${booking.id})"
            >
                Cancel Booking
            </button>

        `;


        bookingContainer.appendChild(div);

    });

}


// ==========================================
// CANCEL BOOKING
// ==========================================

function cancelBooking(id) {

    const confirmation =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmation) {
        return;
    }


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "carBookings"
            )
        ) || [];


    bookings =
        bookings.filter(
            booking => booking.id !== id
        );


    localStorage.setItem(
        "carBookings",
        JSON.stringify(bookings)
    );


    displayBookings();

}


// ==========================================
// INITIALIZE
// ==========================================

displayCars(cars);

loadCarOptions();

displayBookings();