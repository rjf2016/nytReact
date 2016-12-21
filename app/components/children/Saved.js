// Include React
var React = require("react");

const buttonStyle = {
  float: 'right',
};
// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({
  // Here we describe this component's render method

 // Here we set a generic state associated with the text being searched for
 getInitialState: function() {
    return { key: "" };
  },

 setKey: function(key) {
    this.setState({ setKey: key });
  },

handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    
    this.props.deleteData(event.target.name);
    
    this.setKey(event.target.name);

  },

  render: function() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-left">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.saved.map(function(search, i) {
            return (
              <p key={i}>{search.headline} - {search.date}  <button onClick={this.handleSubmit} name={search._id} className="btn btn-primary btn-sm" type="submit" style={buttonStyle}>Remove</button></p>
            );
          }, this)}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;