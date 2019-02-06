const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
const acceptedFileSize = 4;

window.addEventListener("load", function() {
    document.getElementById("image_input").addEventListener("change", function(){

        let file = this.files[0];
        //Vérification des caractéristiques du fichier

        let fileSize = file.size / 1024 / 1024; // en Mo
        if (fileSize > acceptedFileSize){
            console.log("fichier trop gros (4Mo max)");
            text1="<p>fichier trop gros (4Mo max)</p>";
            document.getElementById("image" ).innerHTML = text1;
            return;
        }

        if (!acceptedFileTypes.includes(file.type)){
            console.log("mauvais type de fichier");
            text2="<p>mauvais type de fichier</p>";
            document.getElementById("image" ).innerHTML = text2;
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
        VisionAPIFilePost("describe", file);

    });

});

window.addEventListener("load", function() {
    const myForm = document.querySelector("#urlform");
    const URLField = document.querySelector("#imageURL");
    myForm.addEventListener("submit", (evenement) => {
        evenement.preventDefault();
        //affichage du fichier
        let divImageDisplay = document.getElementById("image")
            //On vérifie s'il y a déjà une image
        if (divImageDisplay.querySelector("img") == null) {
            //On crée l'élément image
            let img = document.createElement("img");
            img.setAttribute("id", "analyzed_picture");
            divImageDisplay.appendChild(img);
        }
        document.getElementById("analyzed_picture").setAttribute("src",URLField.value)

        VisionAPIURLPost("describe", URLField.value);
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
