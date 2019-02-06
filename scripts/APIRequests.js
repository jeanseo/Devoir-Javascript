const visionApiURL = "https://francecentral.api.cognitive.microsoft.com/vision/v1.0/";
function VisionAPIPost(action, file) {

    var file = fileInput.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            fileDisplayArea.innerHTML = "";

            // Create a new image.
            var img = new Image();
            // Set the img src property using the data URL.
            img.src = reader.result;

            // Add the image to the page.
            fileDisplayArea.appendChild(img);
        }

        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!";
    }




    const  req = new XMLHttpRequest();
    let url = visionApiURL+action;
    let body= {"url":"https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"};
    req.onreadystatechange = function (event) {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("Statuts de la réponse: %d (%s)", this.status, this.statusText);

                result = JSON.parse(this.responseText);

                displayAnalysis(action, result);
                console.log(result);

            } else {
                console.log("Statuts de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };
    let formData = new FormData();

    formData.append("file",file);
    console.log(formData);
    req.open('POST', url, true);
    req.setRequestHeader("Ocp-Apim-Subscription-Key","3dd27f3728084d4b9e487d6b0390b7c4");
    req.setRequestHeader("Content-Type","application/octet-stream");
    req.send(formData);
}