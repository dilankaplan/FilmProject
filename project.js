const form= document.getElementById("film-form");
const titleElement =document.querySelector("#title");
const directorElement =document.querySelector("#director");
const urlElement =document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];


const ui = new UI();

const storage = new Storage();

eventListener();
function eventListener(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films =storage.getFilmFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
       ui.displayMessages("Tüm alanları doldurunuz...","danger")
    }
    else{
        const newFilm =new Film(title,director,url);
        ui.displayMessages("Film başarıyla eklendi","success")
        storage.addFilmToStorage(newFilm);

        ui.addFilmToUI(newFilm);
    }
    ui.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
    }
}
