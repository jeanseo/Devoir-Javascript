const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];


window.addEventListener("load", function() {
    document.getElementById("image_input").addEventListener("change", function(){
        let file = this.files[0];
        //Vérification des caractéristiques du fichier
        console.log(file.type);
        console.log(acceptedFileTypes.includes(file.type));
        if (acceptedFileTypes.includes(file.type)){
            console.log("mauvais type de fichier");
            return;
        }
        //affichage du fichier
        let reader = new FileReader();
        let divImageDisplay = document.getElementById("imageDisplay")
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
    text="<h3>Description<h3>"
    text+="<p>"+result.description.captions[0].text+"</p>"
    text+="<h3>tags</h3>"
    text+="<ul>"
    result.description.tags.forEach(function(element) {
        text+="<li>"+element+"</li>"
    });
    text+="</ul>";
    document.getElementById("results" ).innerHTML = text;
}