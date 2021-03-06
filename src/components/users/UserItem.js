import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const UserItem = ({
  user: { username, login, avatar_url }
}) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: 60 }}
      />
      <h3>{login ? login : username}</h3>
      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
