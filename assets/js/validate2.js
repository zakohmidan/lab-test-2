/**
 * PHP Email Form Validation - v3.2
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function() {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');


    forms.forEach(function(e) {
        e.addEventListener('submit', function(event) {
            event.preventDefault();

            let thisForm = this;

            let action = thisForm.getAttribute('action');
            console.log(action);
            let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

            if (!action) {
                displayError(thisForm, 'The form action property is not set!')
                /*return;*/
            }
            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);


            php_email_form_submit(thisForm, action, formData);

        });
    });

    function php_email_form_submit(thisForm, action, formData) {
        thisForm.querySelector('.loading').classList.add('d-block');
        var full_url = 'http://sihati-test.000webhostapp.com/hat_003.pdf'
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(full_url)}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`${response.status} ${response.statusText} ${response.url}`);
                }
            })
            .then(data => {
                console.log(data);
                if (data.status.http_code == 200) {
                    delay(1250).then(() => thisForm.querySelector('.loading').classList.remove('d-block'))
                    .then(() => console.log("lol2"))
                    .then(() => delay(1250).then(() => window.open(full_url)));
                    thisForm.reset();

                    
                    
                    /*        thisForm.querySelector('.loading').classList.remove('d-block');
                     */
                    /*        thisForm.querySelector('.sent-message').classList.add('d-block');
                            thisForm.reset();*/
                } else {
                    console.log("error2");
                            throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
/*                    throw new Error(`${data.status} ${data.statusText} ${data.url}`);
*/
                }
            })
            .catch((error) => {
                displayError(thisForm, error);
                console.log("error");
            });
    }

    function displayError(thisForm, error) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error;
        thisForm.querySelector('.error-message').classList.add('d-block');
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

})();