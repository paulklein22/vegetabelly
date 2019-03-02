import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2 mr-4">
            <img
              src={profile.user.avatar}
              alt="user avatar"
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 ml-4">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.location) ? null : (
                <span>from {profile.location}</span>
              )}
            </p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn profile-button"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
