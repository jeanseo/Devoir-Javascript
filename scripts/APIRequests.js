const visionApiURL = "https://francecentral.api.cognitive.microsoft.com/vision/v1.0/";
function VisionAPIPost(action, file) {

    var reader = new FileReader();

            reader.onload = function() {
                const req = new XMLHttpRequest();
                let url = visionApiURL + action;
                req.onreadystatechange = function (event) {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        if (this.status === 200) {
                            console.log("Statuts de la réponse: %d (%s)", this.status, this.statusText);

                            result = JSON.parse(this.responseText);

                            displayAnalysis(action, result);
                        } else {
                            console.log("Statuts de la réponse: %d (%s)", this.status, this.statusText);
                        }
                    }
                };
                let formData = new FormData();

                formData.append("file", file);
                req.open('POST', url, true);
                req.setRequestHeader("Ocp-Apim-Subscription-Key", "3dd27f3728084d4b9e487d6b0390b7c4");
                req.setRequestHeader("Content-Type", "application/octet-stream");
                req.send(reader.result);
            };

            reader.readAsArrayBuffer(file);






}

