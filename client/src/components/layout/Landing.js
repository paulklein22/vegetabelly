import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container">
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
                <div className="input-group-append">
                  <button type="submit" className="btn redBtn">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <img src="img/loader.gif" className="loader" alt="" />
          </div>
        </div>
      </div>

      // <section className="py-5">
      //   <div className="container">
      //     <div className="row" id="restaurant-list">

      //     </div>
      //   </div>
      // </section>
    );
  }
}

export default Landing;
