export default class MenuHandler {

    constructor() {
        this.ui = {
            "imgSubmit" : document.getElementById("imgSubmit"),
            "imgUpload" : document.getElementById("imgUpload"),
        };

        this.events = {
            "imgUploaded" : null
        };

        this.ui.imgSubmit.addEventListener("click", () => { this.uploadImage() });
    }

    uploadImage() {
        const file = this.ui.imgUpload.files[0];
        const formData = new FormData();

        if (!file.type.match('image.*')) {
            statusDiv.innerHTML = 'This file is not an image. Sorry, it can’t be uploaded. Try again with a valid image.';
            return;
        }

        if (file.size >= 10000000 ) {
            statusDiv.innerHTML = 'This file is larger than 10MB. Sorry, it can’t be uploaded.';
            return;
        }

        formData.append('imgUpload', file, file.name);

        // Set up the AJAX request.
        var xhr = new XMLHttpRequest();

        // Open the connection.
        xhr.open('POST', '/upload', true);


        // Set up a handler for when the request finishes.
        xhr.onload = () => {
            if (xhr.status === 200) {
                try
                {
                    var json = JSON.parse(xhr.response);
                    if (this.events.imgUploaded && json.url.match(/http.*/) ){
                        this.events.imgUploaded(json);
                    }
                }
                catch(e)
                {
                    console.log(e);
                }
            } else {
                console.log('An error occurred while uploading the file...Try again');
            }
        };

        // Send the Data.
        xhr.send(formData);

    }
}