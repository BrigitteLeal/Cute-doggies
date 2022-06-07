const api = axios.create( {
    baseURL: 'https://api.thedogapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3';

const API_URL_RANDOM  = [
    `https://api.thedogapi.com/v1/images/search`, //URL API
    `?limit=6`, //Query parameter //API key
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
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const img5 = document.getElementById('img5');
        const img6 = document.getElementById('img6');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        const btn4 = document.getElementById('btn4');
        const btn5 = document.getElementById('btn5');
        const btn6 = document.getElementById('btn6');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;
        btn1.onclick = () => saveFavoriteDog(data[0].id); //botones de cada una de las imagenes aleatorias llamen a la funcion con el id que querramos guardar
        btn2.onclick = () => saveFavoriteDog(data[1].id); // al declarar el onclick se ejecuta automaticamente (aunque no haya clickeado ese boton), por lo que se coloca dentro de una función para que espere la instrucción)
        btn3.onclick = () => saveFavoriteDog(data[2].id);
        btn4.onclick = () => saveFavoriteDog(data[3].id);
        btn5.onclick = () => saveFavoriteDog(data[4].id);
        btn6.onclick = () => saveFavoriteDog(data[5].id);
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
        section.style.cssText = "width: 100%; height:auto; display:flex; flex-wrap: wrap; justify-content:center; gap: 10px; ";
        // section.appendChild(scroll);
        
        
        data.forEach(dog => {
            const article = document.createElement('article');
            section.appendChild(article);
            article.style.cssText = "width: 205px; height: 233px; border: 3px solid #EE8BF0; border-radius: 10px; background-color:white";
            const img = document.createElement('img');
            img.src = dog.image.url;
            const button = document.createElement('button');
            button.setAttribute("style", "background-color:#EE8BF0; width:100%; height:25px; position:relative");
            const p = document.createElement('p'); //createTextNode ayuda a crear textos dentro de nodos HTML
            const pText = document.createTextNode('X');
            button.appendChild(p);
            p.appendChild(pText);
            p.style.cssText = "margin-right:5px; margin-top:3px; font-size:1.8rem; color:white;";
            button.onclick = () => deleteFavoriteDog(dog.id);
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);
        });
    }
};
const saveFavoriteDog = async (id) => { // guardar una imagen en favoritos
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });
    // const res = await fetch(API_URL_FAVORITES, {
    //     method: 'POST', //cuando se quiere especificar un metodo distinto a GET, hay que especificar con un argumento, tipo objeto
    //     headers: { //el objeto puede tener toda la información que tengamos que enviar a la API
    //         'Content-Type': 'application/json', //header y body son necesarios
    //         'X-API-KEY': 'e5a7a5be-444a-4710-88df-fb8ebbdc77e3',
    //     },
    //     body: JSON.stringify({ //body permite decirle cual es la imagen que queremos guardar
    //         image_id: id
    //     }),
    // });
    // const data = await res.json();
    console.log(`resultado`);
    if (status !== 200){
        spanError.innerHTML= `Hubo un error: ` + status + data.message;
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
const previewImage = () => {
    const file = document.querySelector('#file').files; // .files is a FileList of the file(s) selected by the user in the input[type=file] element you're referencing via the id in your id variable.
    console.log(file);
    if (file.length > 0) {
        const fileReader = new FileReader(); // FileReader es un objeto con el único porpósito de leer datos desde objetos de tipo Blob o File.
        fileReader.onload = function(e) { //El evento load dispara el evento al final del proceso de carga del documento. 
            document.querySelector('#preview').setAttribute("src", e.target.result); // Establece el valor de un atributo en el elemento indicado. Si el atributo ya existe, el valor es actualizado, en caso contrario, el nuevo atributo es añadido con el nombre y valor indicado. Element.setAttribute(name, value);
        };
        fileReader.readAsDataURL(file[0]); // readAsDataURL – cuando necesitamos usar estos datos como valores de src en img u otras etiquetas html.
    }
}
loadRandomDog();
loadFavoriteDog();