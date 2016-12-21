// Include React
var React = require("react");

const buttonStyle = {
  float: 'right',
};
// Creating the Results component
var Results = React.createClass({
  
  
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { headline: "", url: "" };
  },

 handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
      // Set the parent to have the search term
    //console.log(event.target);

    this.props.setHeadline(event.target.name);
    this.props.setURL(event.target.id);

    this.props.saveData(event.target.name, event.target.id);

  },

  // Here we render the function
  render: function() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title text-center'>Results</h3>
        </div>
        <div className='panel-body text-left'>
               

         {/* Here we use a map function to loop through an array in JSX */}
          
          {this.props.results.map(function(results, i) {
            return (
             <div key={i}><p key={i}>{results.headline}<button onClick={this.handleSubmit} name={results.headline} id={results.url} className="btn btn-primary btn-sm" style={buttonStyle} type="submit">Save</button></p></div>
            );
          }, this)}

        

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;