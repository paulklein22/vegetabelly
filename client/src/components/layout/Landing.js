import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="title">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center my-3">Vegetabelly</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="feedback alert alert-danger text-center">
              Please enter a city
            </div>
            <form id="searchForm" className="my-4">
              <div className="form-group my-3">
                <select
                  className="custom-select text-capitalize"
                  id="searchCategory"
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control text-capitalize"
                  id="searchCity"
                  placeholder="Enter City"
                />
                <input type="submit" class="btn btn-success btn-block mt-3" />
              </div>
            </form>

            <img src="img/loader.gif" className="loader" alt="" />
          </div>
        </div>

        <section className="py-5">
          <div className="container">
            <div className="row" id="restaurant-list" />
          </div>
        </section>
      </div>
    );
  }
}

export default Landing;
