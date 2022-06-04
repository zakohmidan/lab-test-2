/*$("#success-alert").hide();
$("#redAlert").hide();*/


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function allm(tt ,key_fram) {
    if (tt == 200)
    {
       /*window.open(full_url));*/
       origin_res="results.html?key=";
       var final_iframe =origin_res +key_fram;

      showAlert();
      delay(1250).then(() => window.open(final_iframe));
      /*sleep(1000);
      */

      

    } else {
      redalert();
    }
}

function redalert(){
   $("#redAlert").fadeTo(2000, 500).slideUp(500, function(){
   $("#redAlert").slideUp(500);

 });   }

function showAlert() {
  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
  $("#success-alert").slideUp(500);

});

}

function myFunction() {
  var x = document.getElementById("id_pa").value;
  var y = document.getElementById("key").value;
  var key_fram =x+"_"+y
  var full_url = 'http://sihati-test.000webhostapp.com/'+ x + "_"+ y + ".pdf";
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(full_url)}`)
  .then(response => {
  if (response.ok) return response.json()
  throw new Error('Network response was not ok.')
  })
  .then(data => { var tt = data.status.http_code; allm(tt,key_fram); /*console.log(data.contents);*/

});}
