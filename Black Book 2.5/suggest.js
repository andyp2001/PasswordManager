

//variable used to store suggestion 
var result = ' ';

//function for resetting password
function myFunction(result) {

  result = "";

    const capitalCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacters = '!@#$}{][:;<>?^&*)(%+=-~`|.,';
    const numbers = '1234567890';
    const combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;

    const capitalCaseLettersLength = capitalCaseLetters.length;
    const numbersLength = numbers.length;
    const combinedCharsLength = combinedChars.length;
    const lowerCaseLettersLength = lowerCaseLetters.length;
    const specialCharactersLength = specialCharacters.length;

    for ( let i = 0; i < 5; i++ ) {
    result += capitalCaseLetters.charAt(Math.floor(Math.random() * capitalCaseLettersLength));
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    result += combinedChars.charAt(Math.floor(Math.random() * combinedCharsLength));
    result += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLettersLength));
    result += specialCharacters.charAt(Math.floor(Math.random() * specialCharactersLength));
    }
        
    return result;
}


//Upon clicking the suggest button 
document.getElementById("id_suggest").onclick = () => {

  result = myFunction(result)
  
  //
  chrome.storage.local.set({count3: result});

  //Injects the code on the current chrome tab
      //Injecting the suggested password result for Id found in page 
      chrome.tabs.executeScript(null, {
        file: "content3.js"
      //code: code
      });

      document.getElementById("json").innerHTML = "Password Generated";
      document.getElementById("result").innerHTML = JSON.stringify(result);

  
    }



    var pres = document.querySelectorAll('pre');
  for (var i = 0; i < pres.length; i++) {
    
    pres[i].style.display = pres[i].style.display == 'none' ? 'block' : 'none';

  }

//button to hide the suggested result 
document.getElementById('hide').addEventListener('click', toggle);


function toggle(){
  var pres = document.querySelectorAll('pre');
  for (var i = 0; i < pres.length; i++) {
    pres[i].style.display = pres[i].style.display == 'none' ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('click2');
  checkPageButton.addEventListener('click', function() {

    window.location.href="popup.html";

  }, false);
}, false);

