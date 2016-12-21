// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {
  // This function serves our purpose of running the query to NYT API.
  runQuery: function(searchterm, searchStartYear, searchEndYear) {

    if(!searchStartYear || !searchEndYear )
       searchStartYear = searchEndYear = "2016";  // Make "current year" -- variablize this
     
  // Call the NYT API  (parms: search term, start year, end year)
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e41c791c2e13434ab90e4c71af4953bb&q=" + searchterm + "&begin_date=" + searchStartYear + "0101&end_date=" + searchEndYear + "1231";

    return axios.get(queryURL).then(function(response) {

    if (response.data.response.docs.length > 0) {     

        function article(headline, url) {
          this.headline = headline;
          this.url = url;
        }

          console.log(response.data.response.docs);
          var a = [];
          for(var i=0; i<5; i++){
            var o = new article(response.data.response.docs[i].headline.main, response.data.response.docs[i].web_url);
            a.push(o);
          }
          console.log(a);
          return a;
       }
      
      // If we don't get any results, return an empty string
      console.log("Nothing returned from Search");
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
      return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(headline, url) {
      return axios.post("/api", { headline: headline, url: url });
  },

  // This function posts new searches to our database.
  deleteHistory: function(headline) {
      //console.log("in helpers deleteHistory with a headline=" + headline);
      return axios.delete("/api/" + headline, { 'id': headline });
  }


};

// We export the API helper
module.exports = helper;