const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
const acceptedFileSize = 4;

window.addEventListener("load", function() {
    document.getElementById("image_input").addEventListener("change", function(){

        let file = this.files[0];
        //Vérification des caractéristiques du fichier

        let fileSize = file.size / 1024 / 1024; // en Mo
        if (fileSize > acceptedFileSize){
            console.log("fichier trop gros (4Mo max)");
            return;
        }

        if (!acceptedFileTypes.includes(file.type)){
            console.log("mauvais type de fichier");
            return;
        }

        //affichage du fichier
        let reader = new FileReader();
        let divImageDisplay = document.getElementById("image")
        reader.onload = function (e) {
            //On vérifie s'il y a déjà une image
            if (divImageDisplay.querySelector("img") == null) {
                //On crée l'élément image
                let img = document.createElement("img");
                img.setAttribute("id", "analyzed_picture");
                divImageDisplay.appendChild(img);
            }
            document.getElementById("analyzed_picture").setAttribute("src",e.target.result)
        }
        reader.readAsDataURL(file);


        //Envoie le fichier à l'API
        VisionAPIPost("describe", file);

    });

});



function displayAnalysis(action, result) {
    text="<h2>Description</h2>"
    text+="<p>"+result.description.captions[0].text+"</p>"
    text+="<h3>tags</h3>"
    text+="<ol>"
    result.description.tags.forEach(function(element) {
        text+="<li>"+element+"</li>"
    });
    text+="</ol>";
    document.getElementById("results" ).innerHTML = text;
}