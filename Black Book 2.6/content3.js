//Code injected on the current website, filling the form boxes


chrome.storage.local.get("count3", function(data) {
  
  
    if(typeof data.count3 == "undefined") {
        console.log("Error Injecting Password!")
    } else {
        // Use data.count


        //function to verify if the element id is found within the current web browser tab, if so append the suggested credential
        function findPassID(password) {
            var pass = document.getElementById(password);
            if(pass) {
              var found = data.count3;   
              //use replace toremove any quotes associated with the string 
              document.getElementById(password).value =  found.replace(/['"]+/g, ''); 
              console.log("Password Injected: " + found.replace(/['"]+/g, ''));
            } else {
                console.log("Could not find the id for: ", password);
            }
          }


        findPassID("password")
        findPassID("reg-password")
        findPassID("ap_password")
        findPassID("current-password")

    }
  });
  



//for later use

/*
/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 
 function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

addStyle(`
  body {
    color: red;
  }
`);

addStyle(`
input {
  font: small-caption;
  font-size: 16px;
}
`);

*/


