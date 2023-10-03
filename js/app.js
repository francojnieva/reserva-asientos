const movies = document.getElementById('movie')
const movieInfo = document.getElementById('movieInfo')
const seat = document.querySelectorAll('.seat')

function selectMovie() {
    movies.addEventListener('change', () => {
        movieInfo.innerHTML = ''
        const data = document.createElement('p')
        data.classList.add('container', 'pt-4', 'text-center')
        data.innerHTML = `Precio de la entrada: $ ${movies.value} - CAST`
        movieInfo.appendChild(data)
    })
}

selectMovie()

seat.forEach((seat) => {
    seat.addEventListener('click', (e) => {
        e.target.classList.toggle('reserved')
    })
})

