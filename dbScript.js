
  //Upon click, refresh extension page 
  document.getElementById("refresh").onclick = () => {
    location.reload();
  };



//creating database, defining as null
var db = null;


//Create/Open DB
//document.getElementById("id_openDB").onclick = () => {
  const request = indexedDB.open("testdb", 1);
  request.onupgradeneeded = () => {
    console.log("onupgradeneeded");
    db = request.result;
    db.createObjectStore('credentials', {keyPath: 'id'});
  };
  request.onsuccess = () => {
    db = request.result;
    console.log("DB Opened Successfully");
    //document.getElementById("json").innerHTML = "DB Opened Successfully!"; <- if db opened, display on popup page
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };

//select all tab.url from the current website and store with credentials
chrome.tabs.getSelected(null, function(tab) {

  //Adding credentials needs to be inside the tab query, given it is asynchronous 

  //Add Contents
document.getElementById("id_add").onclick = () => {
  const id = document.getElementById("id_id").value;
  const passwords = document.getElementById("id_password").value;
  const transaction = db.transaction("credentials", "readwrite");
  const credentials = transaction.objectStore("credentials");
  const credential = {id: id, password: passwords, lastUpdate: new Date(), url: tab.url};
  const request = credentials.add(credential);
  request.onsuccess = () => {
    console.log("success");
    document.getElementById("json").innerHTML = "Added the following:";
    document.getElementById("result").innerHTML = JSON.stringify(request.result);
  };
  request.onerror = () => {
    console.log("onerror", request.error);
    document.getElementById("json").innerHTML = "ID already exists in Database!";
  };
}
});



//inject code from content script 
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



chrome.storage.local.get("count1", function(data) {
  

  if(typeof data.count1 == "undefined") {
    console.log(data.count1)
    console.log("Error!")
  } else {
      // Use data.count


      document.getElementById("id_password").value = data.count1;
      console.log(data.count1);

  }
});



document.getElementById("id_get").onclick = () => {
  const transaction = db.transaction("credentials", "readonly");
  const credentials = transaction.objectStore("credentials");
  const id = document.getElementById("id_id").value;
  const request = credentials.get(id);
  request.onsuccess = () => {
    console.log("onsuccess",request.result);
    document.getElementById("json").innerHTML = "Get the current credentials stored:"; 
    document.getElementById("result").innerHTML = JSON.stringify(request.result);
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };
}

document.getElementById("id_getAll").onclick = () => {
  const transaction = db.transaction("credentials", "readonly");
  const credentials = transaction.objectStore("credentials");
  const request = credentials.getAll();
  //var string = request.toString()
  request.onsuccess = () => {
    console.log("onsuccess",request.result);
    document.getElementById("json").innerHTML = "Displaying all Databse Contents:";
    document.getElementById("result").innerHTML = request.result
        .map((credential) => {
          return `<li data-key="${credential.id}"><span> Username: ${credential.id}, </span> Password: ${credential.password}, Last Updated: ${credential.lastUpdate}</li>`;
        })
        .join('\n');
    };
  };

  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('click2');
    checkPageButton.addEventListener('click', function() {
  
      window.location.href="popup.html";
  
    }, false);
  }, false);




//Used for assitance regarding IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB