const API_URL_RANDOM  = [
    `https://api.thedogapi.com/v1/images/search`, //URL API
    `?limit=2`, //Query parameter //API key
    ].join(``); 
const API_URL_FAVORITES  = `https://api.thedogapi.com/v1/favourites`; 
const API_URL_UPLOAD  = `https://api.thedogapi.com/v1/images/upload`; 
const API_URL_FAVORITES_DELETE = (id) =>  //endpoint dinamico, hay que especificar el id en dependencia de que imagen se quiere borrar
    `https://api.thedogapi.com/v1/favourites/${id}`;



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
        btn2.onclick = () => saveFavoriteDog(data[1].id); // al declarar el onclick se ejecuta automaticamente (aunque no haya clickeado ese boton), por lo que se coloca dentro de una función para que espere la instrucción)
    }
};
const loadFavoriteDog = async () => { // cargar imagenes en favoritos
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3'
        },
    });
    const data = await res.json();
    console.log(`favorite`, data);
    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error: ` + res.status + data.message;
    } else {
        const section = document.getElementById('favoriteDog')
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Favorites doggies");
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonText = document.createTextNode('Sacar de favoritos'); //createTextNode ayuda a crear textos dentro de nodos HTML
            img.src = dog.image.url
            button.appendChild(buttonText);
            button.onclick = () => deleteFavoriteDog(dog.id);
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);
        });
    }
};
const saveFavoriteDog = async (id) => { // guardar una imagen en favoritos
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST', //cuando se quiere especificar un metodo distinto a GET, hay que especificar con un argumento, tipo objeto
        headers: { //el objeto puede tener toda la información que tengamos que enviar a la API
            'Content-Type': 'application/json', //header y body son necesarios
            'X-API-KEY': 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3',
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
        loadFavoriteDog();
    }
};
const deleteFavoriteDog = async (id) => {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3'
        },
    });
    const data = await res.json();
    if (res.status !== 200){
        spanError.innerHTML= `Hubo un error: ` + res.status + data.message;
    } else {
        console.log("Perrito eliminado de favoritos")
        loadFavoriteDog();
    }
}
const uploadDogPhoto = async () => {
    const form = document.getElementById('uploadingForm'); //form
    const formData = new FormData(form);
    console.log(formData.get('file'));
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            
            'X-API-KEY': 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3',
        },
        body: formData,
    });
    const data = await res.json();
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir foto de perrito: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de perrito cargada");
        console.log({ data });
        console.log(data.url);
        saveFavoriteDog(data.id) //para agregar el michi cargado a favoritos.
    }
}
loadRandomDog();
loadFavoriteDog();