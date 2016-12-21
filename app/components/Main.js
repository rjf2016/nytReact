// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: [], saved: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      //console.log(response);
      if (response !== this.state.saved) {
       // console.log("History", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },

    // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    //console.log("componentDidUpdate called...");

    if(!this.state.searchTerm)
      return;
    // Run the query for the address
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
      if (data !== this.state.results) {
        //console.log("Topic", data);
        this.setState({ results: data });

      }
    }.bind(this));
  },
  // This function allows children to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  setStartYear: function(startyear) {
    console.log("setStartYear called with startyear = " + startyear);
    this.setState({ searchStartYear: startyear });
  },
  setEndYear: function(endyear) {
    this.setState({ searchEndYear: endyear });
  },

  setHeadline: function(headline) {
    this.setState({ headline: headline });
    console.log("headline="+headline);
  },
  setURL: function(url) {
    this.setState({ url: url });
    console.log("url="+url);
  },

  saveData: function(headline, url){
    helpers.postHistory(headline, url).then(function(response) {
         // console.log(response);
          if (response !== this.state.saved) {
            
            this.setState({ saved: response.data });
          }
        }.bind(this));

              //Call the Query again -- ?
              helpers.getHistory().then(function(response) {
                console.log(response);
                if (response !== this.state.saved) {
                  console.log("Saved", response.data);
                  this.setState({ saved: response.data });
                }
              }.bind(this));

  },

  deleteData: function(headline){
    helpers.deleteHistory(headline).then(function(response) {
          console.log(response);
          if (response !== this.state.saved) {
            console.log("Delete History", response.data);
            
            //Call the Query again -- ?
              helpers.getHistory().then(function(response) {
                console.log(response);
                if (response !== this.state.saved) {
                  console.log("Saved", response.data);
                  this.setState({ saved: response.data });
                }
              }.bind(this));



           this.setState({ saved: response.data });
          }
        }.bind(this));

  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
           <div className="col-md-3"></div>
           <div className="col-md-6">
                <h2 className="text-center">New York Times Article Scrubber</h2>
                <p className="text-center">
                    <em>Enter an article to start search (ex: President Obama).</em>
                </p>
           </div>
           <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
              <Search setTerm={this.setTerm} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>
          </div>
          <div className="col-md-3"></div> 
        </div>


        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
               <Results setHeadline={this.setHeadline} setURL={this.setURL} saveData={this.saveData} results={this.state.results} />
          </div>
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
              <Saved saved={this.state.saved} deleteData={this.deleteData} />
          </div>
          <div className="col-md-3"></div>
        </div>
        
      
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;