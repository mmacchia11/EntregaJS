

const formulario = document.getElementById('formulario')
const btn = document.getElementById('btn')
const btnOrdenar = document.getElementById('btnOrdenar')
const resultado = document.querySelector('#resultado')

const verMasTarde = document.querySelector('#verMasTarde')
const habilidadBtm = document.querySelector('.habilidad-btn')


const api = 'https://api.themoviedb.org/3/'
const apiKey = '5a3a9e412a229bdd3db05ebd857cb253'
const url = `${api}discover/movie?sort_by=popularity.desc&api_key=${apiKey}`

const pincture = 'https://image.tmdb.org/t/p/w500'


const objVerLuego = {}


/* LOCAL STORAGE */

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('objVerLuego')) {
        let objVerLuego = JSON.parse(localStorage.getItem("objVerLuego"))
    }

    mostrarPeliculas()
})




const filtrar = async(idPost) => {

   

      try {
          const resPost = await fetch(url)
          const post = await resPost.json()

          resultado.innerHTML = ''

          const info = post.results
            
          const texto = formulario.value.toLowerCase()
           
          info.forEach(element => {
            

            let nombre = element.title.toLowerCase()

            if (nombre.indexOf(texto) !== -1) {

                resultado.innerHTML += `
                       <article class="habilidad">
                   <img class="img-habilidad" src="${pincture}${element.backdrop_path}" alt="" />    
                   <h3 class="titulo-habiludad">${element.title}</h3>
                   <p class="habiludad-info">
                     ${element.overview}
                   </p>  
                   <button class="habilidad-btn ${element.id}" id="${element.id}"><a href="#">Ver Más Tarde...</a></button>
                 </article>  
                           `

                           

            
            }

            if (resultado.innerHTML === ' ') {
                resultado.innerHTML = `
                       <li>Pelicula no encontrada...</li>
                       `
            }


            
            
        });
         

      }  catch(error){
          console.log('Hubo un error en la carga, INenta mas tarde');
      }

}



const ordenar = () =>{
    console.log(texto)
}





btn.addEventListener('click', filtrar)
formulario.addEventListener('keyup', filtrar)

filtrar()




/* Delegagion de eventos */

const watchLater = (e) => {
    e.preventDefault();
    
    const idPeli = e.target.classList[1]

    if (idPeli) {
        
        setWatchlater(e.target.parentElement)
    }

    e.stopPropagation()
}


resultado.addEventListener('click', watchLater)


const setWatchlater = objeto => {
    

    const movies = {
        id: objeto.querySelector(".habilidad-btn").getAttribute("id"),
        title: objeto.querySelector(".titulo-habiludad").textContent,
        img: objeto.querySelector(".img-habilidad").getAttribute("src"),

    }

    objVerLuego[movies.id] = {
        ...movies
    }

  
    mostrarPeliculas()
}




const mostrarPeliculas = () => {
    

    verMasTarde.innerHTML = ''

    Object.values(objVerLuego).forEach(item => {
      


        verMasTarde.innerHTML += `
        <tr class="verLuego" >
        <th scope="row"><img style="width:70px" class="img-habilidad" src="${item.img}" alt="" /></th>
        <td>${item.id}</td>
        <td class="title">${item.title}</td>
        <td class="eliminar"  data-id ="${item.id}">X</td>
        </tr> 
        
        `
    })




    localStorage.setItem('objVerLuego', JSON.stringify(objVerLuego))


}




const eliminar = e => {
    e.preventDefault()




    if (e.target.classList.contains('eliminar')) {
        Swal.fire({
            title:`Estas eliminando ${e.target.dataset.id}`,
    
            icon: 'question',
            confirmButtonText: 'Adios',
            toast:true,
            position:'bottom-end'
    })


        delete objVerLuego[e.target.dataset.id]
        mostrarPeliculas()
       
        
    }


    e.stopPropagation()


}


verMasTarde.addEventListener('click', eliminar)


