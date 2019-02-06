window.addEventListener("load", function() {
   // document.getElementById("image_input").addEventListener("change", function(){
   //     let file = this.files[0];
   //     console.log(file);

   // });

});

function displayAnalysis(action, result) {
    text="<h2>Description<h2>"
    text+="<p>"+result.description.captions[0].text+"</p>"
    text+="<h3>tags</h3>"
    text+="<ol>"
    result.description.tags.forEach(function(element) {
        text+="<li>"+element+"</li>"
    });
    text+="</ol>";
    document.getElementById("results" ).innerHTML = text;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
window.addEventListener("load", function() {
    const myForm = document.querySelector("form");
    const URLField = document.querySelector("#imageURL");

    myForm.addEventListener("submit", (evenement) => {
        evenement.preventDefault();
        VisionAPIPost("describe", URLField.value);
    });
});