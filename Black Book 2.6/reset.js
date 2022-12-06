


  document.getElementById("refresh").onclick = () => {
    location.reload();
  };
//location.reload();



//when opening the page, ensure no data is saved from previous process

var result = ' ';

 
const request = indexedDB.open("testdb", 1);
request.onupgradeneeded = () => {
  console.log("onupgradeneeded");
  db = request.result;
  db.createObjectStore('credentials', {keyPath: 'id'});
};
request.onsuccess = () => {
  db = request.result;
  console.log("DB Opened Successfully");
  //document.getElementById("json").innerHTML = "DB Opened Successfully!";
};
request.onerror = () => {
  console.log("onerror", request.error);
};


chrome.tabs.executeScript(null, {
  file: "content2.js"
//code: code
});


chrome.storage.local.get("count", function(data) {
  

  if(typeof data.count == "undefined") {
      console.log("Error!")
  } else {
      // Use data.count


      document.getElementById("id_id").value = data.count;
      console.log(data.count);

  
  }
});





//function for resetting password
function myFunction(result) {

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



chrome.tabs.getSelected(null, function(tab) {

    
  document.getElementById("resetButton").onclick = () => {


  const transaction = db.transaction("credentials", "readwrite");
  const credentials = transaction.objectStore("credentials");
  const id = document.getElementById("id_id").value;
  const match = credentials.count(id);

  match.onsuccess = () => {
    console.log("Found in DB: ", match.result);

    if (match.result == 1 ) {
    document.getElementById("json").innerHTML = "Username was not found";
    credentials.delete(id);
    const credential2 = {id: id, password: myFunction(result), lastUpdate: new Date(), url: tab.url};
    const request2 = credentials.add(credential2);

    request2.onsuccess = () => {
    console.log("onsuccess",request2.result);
    document.getElementById("json").innerHTML = "The password was reset for the following username: "; 
    document.getElementById("result").innerHTML = JSON.stringify(credential2);
    }
  }
  else {
    document.getElementById("json").innerHTML = "The credenatial was not found!"; 
  }

  };
  match.onerror = () => {
    document.getElementById("json").innerHTML = "Username was not found! ";
    console.log("Follwoing Error: ", match.error);
  };


}
});

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('click2');
  checkPageButton.addEventListener('click', function() {

    window.location.href="popup.html";

  }, false);
}, false);
