const movies = document.getElementById('movie')
const movieInfo = document.getElementById('movieInfo')
const seat = document.querySelectorAll('.seat')
const countSeat = document.getElementById('count')
const price = document.getElementById('price')
const okButton = document.querySelector('.btn.btn-danger')

function selectMovie() {
    movies.addEventListener('change', () => {
        movieInfo.innerHTML = ''
        const data = document.createElement('p')
        data.classList.add('container', 'pt-4', 'text-center')
        data.innerHTML = `Precio de la entrada: $ ${movies.value} - CAST`
        movieInfo.appendChild(data)

        updateReservedSeats()

        countSeat.textContent = 0 
        price.textContent = 0
    })
}

selectMovie()

seat.forEach((seat) => {
    seat.addEventListener('click', (e) => {
        e.target.classList.toggle('reserved')
        updateCountPrice()
    })
})

function updateCountPrice() {
    let selectedSeats = 0
    let totalPrice = 0
    const reservedSeats = document.querySelectorAll('.seat.reserved')
    selectedSeats = reservedSeats.length
    totalPrice = selectedSeats * Number(movies.value)

    countSeat.textContent = selectedSeats
    price.textContent = `$ ${totalPrice}`
}

function saveReservedSeats() {
    const selectedMovie = movies.value
    const reservedSeats = document.querySelectorAll('.seat.reserved')
    const reservedSeatsArray = Array.from(reservedSeats).map(seat => seat.dataset.seatNumber)
    
    localStorage.setItem(`reservedSeats_${selectedMovie}`, JSON.stringify(reservedSeatsArray))

    countSeat.textContent = 0 
    price.textContent = 0
}

function updateReservedSeats() {
    const selectedMovie = movies.value
    const reservedSeatsKey = `reservedSeats_${selectedMovie}`
    const reservedSeatsArray = JSON.parse(localStorage.getItem(reservedSeatsKey)) || []
    
    seat.forEach((seat) => {
        const seatNumber = seat.getAttribute('data-seat-number')
        if (reservedSeatsArray.includes(seatNumber)) {
            seat.classList.add('reserved')
        } else {
            seat.classList.remove('reserved')
        }
    })
    
   updateCountPrice()
}

okButton.addEventListener('click', () => {
    saveReservedSeats()
    alert('Asientos reservados')
})

updateReservedSeats()

window.addEventListener('load', () => {
    countSeat.textContent = 0
    price.textContent = 0
})
