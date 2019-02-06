const visionApiURL = "https://francecentral.api.cognitive.microsoft.com/vision/v1.0/";
function VisionAPIPost(action, file) {
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