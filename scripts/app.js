window.addEventListener("load", function() {
    VisionAPIPost("describe");
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