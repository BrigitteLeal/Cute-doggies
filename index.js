// const URL = `https://api.thedogapi.com/v1/images/search`; //url de la API escogida
// fetch(URL) //URL argumento de fetch //fetch devuelve promesa
//   .then(res => res.json()) //se debe convertir la respuesta de la API a un objeto que JS pueda entender -> JSON
//   .then(data => {//se obtienen los datos e información que carga la API
//      const img = document.querySelector(`img`); //manipulación del DOM -> se trae a la etiqueta img 
//      img.src = data[0].url; //a la etiqueta img se le agrega el atributo src(url) cuyo valor es la información obtenida del API para el elemento 0 + url
//   }) 

const URL  = `https://api.thedogapi.com/v1/images/search?limit=3&api_key=e5a7a5be-444a-4710-88df-fb8ebbdc77e3`;
const generateNewDog = async () => {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);
        const img1 = document.querySelector(`#img1`);
        const img2 = document.querySelector(`#img2`);
        const img3 = document.querySelector(`#img3`);
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        
    } catch (err) {
        console.error(err);
    }
}
generateNewDog();