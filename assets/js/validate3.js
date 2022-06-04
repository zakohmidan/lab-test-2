/**
 * PHP Email Form Validation - v3.2
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function() {
    "use strict";

    let forms = document.querySelectorAll('.signin-form');


    forms.forEach(function(e) {
        e.addEventListener('submit', function(event) {
            event.preventDefault();

            let thisForm = this;

            let action = thisForm.getAttribute('action');


            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);
            /*console.log(formData);*/


            php_email_form_submit2(thisForm, formData);

        });
    });

    function php_email_form_submit2(thisForm, formData) {
        var x = document.getElementById("id_pa").value;
        var y = document.getElementById("key").value;
        var key_fram = x + "_" + y
        var full_url = 'https://sihati-test.000webhostapp.com/' + x + "_" + y + ".pdf";
        thisForm.querySelector('.loading').classList.add('d-block');
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(full_url)}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`${response.status} ${response.statusText} ${response.url}`);
                }
            })
            .then(data => {
                /*console.log(data);*/
                if (data.status.http_code == 200) {
                    delay(500).then(() => thisForm.querySelector('.loading').classList.remove('d-block'))
                        /*.then(() => console.log("lol2"))*/
                        .then(() => thisForm.querySelector('.success-message').classList.add('d-block'))
                        .then(() => showAlert())
                        /*.then(() => delay(2250).then(() => window.open(full_url)))*/
                        .then(() => delay(3000).then(() => get_pdf(full_url,key_fram)))



                    thisForm.reset();

                } else {
                    console.log("error2");


                    throw new Error('Form submission failed and no error message returned from: ');

                }
            })
            .catch((error) => {
                displayError(thisForm, error);
                console.log("error");
            });
    }

    function displayError(thisForm, error) {
        delay(500).then(() => thisForm.querySelector('.loading').classList.remove('d-block'))
            .then(() => redalert())
            .then(() => thisForm.querySelector('.no-success-message').classList.add('d-block'));



        /*        thisForm.querySelector('.loading').classList.remove('d-block');
         */
        /*thisForm.querySelector('.no-success-message').innerHTML = error;
        
        thisForm.querySelector('.no-success-message').classList.add('d-block');*/
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function showAlert() {
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
            $("#success-alert").slideUp(500);

        });

    }

    function redalert() {
        $("#redAlert").fadeTo(2000, 500).slideUp(500, function() {
            $("#redAlert").slideUp(500);

        });
    }

    function get_pdf(full_url,file_name) {
/*        console.log(full_url);
*/        fetch(full_url, { method: 'GET' })
            .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                //window.open(url);
                window.location.assign(url);
                var a = document.createElement('a');
                a.href = url;
                a.download = file_name+".pdf";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove(); //afterwards we remove the element again         
            });


    }

})();
