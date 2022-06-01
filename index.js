const API_URL_RANDOM  = [
    `https://api.thedogapi.com/v1/images/search`, //URL API
    `?limit=2`, //Query parameter
    `&api_key=e5a7a5be-444a-4710-88df-fb8ebbdc77e3` //API key
    ].join(``); 
const API_URL_FAVORITES  = [
    `https://api.thedogapi.com/v1/favourites`, 
    `?api_key=e5a7a5be-444a-4710-88df-fb8ebbdc77e3` 
    ].join(``); 
const API_URL_FAVORITES_DELETE = (id) => [
    `https://api.thedogapi.com/v1/favourites`, 
    `${id}`
    `?api_key=e5a7a5be-444a-4710-88df-fb8ebbdc77e3` 
    ].join(``); 
    
const spanError = document.getElementById('error');

const loadRandomDog = async () => {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json(); // se debe convertir la respuesta de la API a un objeto que JS pueda entender -> JSON
    console.log(`random`, data);
    if (res.status !== 200){
        spanError.innerHTML= `Hubo un error: ` + res.status;
    }else{
        const img1 = document.getElementById('img1'); // manipulación del DOM -> se trae a la etiqueta img 
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1'); // 
        const btn2 = document.getElementById('btn2');
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => saveFavoriteDog(data[0].id); //botones de cada una de las imagenes aleatorias llamen a la funcion con el id que querramos guardar
        btn2.onclick = () => saveFavoriteDog(data[1].id);
    }
};
const loadFavoriteDog = async () => { // cargar imagenes en favoritos
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log(`favorite`, data);
    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error: ` + res.status + data.message;
    } else {
        data.forEach(dog => {
            const section = document.getElementById('favoriteDog')
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonText = document.createTextNode('Sacar de favoritos');
            img.src = dog.image.url
            button.appendChild(buttonText);
            button.onclick = () => deleteFavoriteDog(dog.image_id)
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);
        });
    }
};
const saveFavoriteDog = async (id) => { // guardar imagenes en favorito
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST', //cuando se quiere especificar un metodo distinto a GET, hay que especificar con un argumento, tipo objeto
        headers: { //el objeto puede tener toda la información que tengamos que enviar a la API
            'Content-Type': 'application/json', //header y body son necesarios
        },
        body: JSON.stringify({ //body permite decirle cual es la imagen que queremos guardar
            image_id: id
        }),
    });
    const data = await res.json();
    console.log(`resultado`, res);
    if (res.status !== 200){
        spanError.innerHTML= `Hubo un error: ` + res.status + data.message;
    } else {
        console.log("Perrito guardado en favoritos")
    }
};
const deleteFavoriteDog = async () => {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.status !== 200){
        spanError.innerHTML= `Hubo un error: ` + res.status + data.message;
    } else {
        console.log("Perrito eliminado de favoritos")
    }
}
loadRandomDog();
loadFavoriteDog();