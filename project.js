const form= document.getElementById("film-form");
const titleElement =document.querySelector("#title");
const directorElement =document.querySelector("#director");
const urlElement =document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];
const clear =document.getElementById("clear-films");

eventListener();
function eventListener(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films =Storage.getFilmFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
       UI.displayMessages("Tüm alanları doldurunuz...","danger")
    }
    else{
        const newFilm =new Film(title,director,url);
        UI.displayMessages("Film başarıyla eklendi","success")
        Storage.addFilmToStorage(newFilm);

        UI.addFilmToUI(newFilm);
    }
    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı...","success")
    }

}
function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage(); 
    }
 
}
