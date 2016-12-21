// Include React
var React = require("react");

// Creating the Form component
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", startyear: "", endyear: "" };
  },

  // This function will respond to the user input
  handleChange: function(event) {
    this.setState({ term: event.target.value });
  },

  handleStartYearChange: function(event) {
    this.setState({ startyear: event.target.value });
  },

  handleEndYearChange: function(event) {
    this.setState({ endyear: event.target.value });
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });

    this.props.setStartYear(this.state.startyear);
    this.setState({ startyear: "" });
    this.props.setEndYear(this.state.endyear);
    this.setState({ endyear: "" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                placeholder="Enter a search term"
                className="form-control text-center"
                id="term"
                onChange={this.handleChange}
                required
              />
              <br />


              <input
                value={this.state.startyear}
                type="text"
                placeholder="Enter Start Year (YYYY)"
                className="form-control text-center"
                id="startyear"
                onChange={this.handleStartYearChange}
              />
              <br />

              <input
                value={this.state.endyear}
                type="text"
                placeholder="Enter End Year (YYYY)"
                className="form-control text-center"
                id="endyear"
                onChange={this.handleEndYearChange}
              />
              <br />



              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;