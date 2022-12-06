//Content Script to get content from both password and username box, injects code and sends it to js file
      
      
      //functions to verify if the element id is found within the current web browser tab, if so append the suggested credential
      function passID(IdName, value) {
        var found = document.getElementById(IdName);
        if(found) {
          var result1 = document.getElementById(IdName).value;   
          console.log("Found Password box by ID: " + result1);
          chrome.storage.local.set({count1: result1});
        } else {
            console.log("Could not find the id for: ", IdName);
        }
      }
  

      function usernameID(IdName, value) {
        var found = document.getElementById(IdName);
        if(found) {
          var result = document.getElementById(IdName).value;   
          console.log("Found username box by ID: " + result);
          chrome.storage.local.set({count: result});
        } else {
            console.log("Could not find the id for: ", IdName);
        }
      }
  


//verifying if content can be retrieved from website 
usernameID("modalusername", '');
usernameID("email", '');
usernameID("username", '');
passID("password", '');
passID("ap_password",'');
passID("reg-password",'');
passID("current-password",'')



//for testing
console.log(result)
console.log("pass: ", result1)



