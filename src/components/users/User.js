import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from "../../context/github/githubContext"

const User = ({ match }) => {
  const githubContext = useContext(GithubContext)
  const { getUsers, loading, users, getUserRepos, repos} = githubContext;

  // For as Component Did Mount just add an empty brackets []
  // If it will depend on sth. like [repos]
  // It will be called every time "repos" is changed.
  useEffect(() => {
    getUsers(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company
  } = users;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable: {''}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: 150 }}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login ? login : 'No info.'}
                </Fragment>
              )}
            </li>
            <li>
              <strong>Company: </strong> {company ? company : 'No info.'}
            </li>
            <li>
              <strong>Website: </strong> {blog ? blog : 'No info.'}
            </li>
          </ul>
          <Fragment>
            <h3>Bio</h3>
            <p>{bio ? bio : 'There is no bio info.'}</p>
          </Fragment>

          <a
            href={html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noopener noreferrer '
          >
            Visit Github Profile
          </a>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <div className='card'>
        <h2>Last 10 Repos: </h2>
        <Repos repos={repos} />
      </div>
    </Fragment>
  );
};

export default User;
