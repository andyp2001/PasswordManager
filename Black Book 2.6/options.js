//options page for the extension

  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('click');
    checkPageButton.addEventListener('click', function() {
  
        const DBDeleteRequest = window.indexedDB.deleteDatabase("testdb");

        DBDeleteRequest.onerror = (event) => {
          console.error("Error deleting database.");
        };
        
        DBDeleteRequest.onsuccess = (event) => {
          console.log("Database deleted successfully");
        
          console.log(event.result); // should be undefined
          document.getElementById("result").innerHTML = "Database Deleted Successfully";
        };


  
    }, false);
  }, false);
