//background script for popup, used to run initial code



const request = indexedDB.open("testdb", 1);
request.onupgradeneeded = () => {
  console.log("onupgradeneeded");
  db = request.result;
  db.createObjectStore('credentials', {keyPath: 'id'});
};
request.onsuccess = () => {
  db = request.result;
  console.log("DB Opened Successfully");
  document.getElementById("json").innerHTML = "DB Opened Successfully!" + '&#x2714'//check mark;
  //document.getElementById("json").innerHTML = "DB Opened Successfully!";
  
  chrome.tabs.getSelected(null, function(tab) {

    const transaction = db.transaction("credentials", "readwrite");
    const credentials = transaction.objectStore("credentials");
    const id = "username";
    const match = credentials.count(id);
    console.log(match);
    const credential = {id: "username"};
    const priceIndex = credentials.getAllKeys();
    priceIndex.onsuccess = () => {
      console.log(priceIndex.result);
    };

    request1 = credentials.openCursor();
    request1.onerror = function(event) {
      console.err("error getting data");
   };
   request1.onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
          const key = cursor.primaryKey;
          const value = JSON.stringify(cursor.value.url);
          const password = JSON.stringify(cursor.value.password);
          const url = JSON.stringify(tab.url);
          console.log(key, value);
          console.log(url)
          //if current url matches the url saved with key
          if (url == value){
            console.log("Same URLs found: " + value + " = " + tab.url)

            chrome.storage.local.set({count: password});
            chrome.storage.local.set({count1: key});

            //Injects the code on the current chrome tab
            //Injecting the suggested password result for Id found in page 
            chrome.tabs.executeScript(null, {
              file: "content.js"
            //code: code

            
              });

              document.getElementById("result").innerHTML = JSON.stringify("Found ID: "+ key + " associated with current page");

          }
          
          cursor.continue();
      }
      else {
          // no more results
      }
   };
    //const request = priceIndex.getAll(10);
    

  
    
  });

};
request.onerror = () => {
  console.log("onerror", request.error);
};



//jump to page

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('click1');
    checkPageButton.addEventListener('click', function() {
  
      //chrome.tabs.create({url: "addDB.html"}, () => {});

      window.location.href="addDB.html";

      /*
      chrome.tabs.getSelected(null, function(tab) {
        alert("Hello..! It's my first chrome extension.");

      });

      */
    }, false);
  }, false);

  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('click2');
    checkPageButton.addEventListener('click', function() {
  
      window.location.href="suggest.html";

      /*
      chrome.tabs.getSelected(null, function(tab) {
        alert("Hello..! It's my first chrome extension.");

      });

      */
    }, false);
  }, false);

  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('click3');
    checkPageButton.addEventListener('click', function() {
  
      window.location.href="reset.html";

      /*
      chrome.tabs.getSelected(null, function(tab) {
        alert("Hello..! It's my first chrome extension.");

      });

      */
    }, false);
  }, false);