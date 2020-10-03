import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_URL } from './config';
import FontAwesome from 'react-fontawesome';
import Loading from './components/loading/loading';
import GetTweets from './apis/tweetsfetch';
import Sidebar from './components/sidebar/sidebar';
import RecentTweets from './components/RecentTweets/recentTweets';
import TopUser from './components/TopUser/topUser';
import TopDomains from './components/TopDomains/topDomains';
import Footer from './components/Footer';
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

const socket = io(API_URL);
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      disabled: '',
      loading: false,
      allTweets: [],
      overAllError: '',
    };
    this.popup = null;
  }

  componentDidMount() {
    socket.on('user', (user) => {
      this.popup.close();
      this.setState({ user });
    });
    try {
      this.setState({ loading: true });
      GetTweets()
        .then((responses) => {
          var requiredTweets = responses.data.tweets[0].statuses.filter(
            (tweet) =>
              (tweet.entities.urls.length > 0) |
              (tweet.extendedentities !== undefined)
          );
          this.setState({
            allTweets: requiredTweets,
            overAllError: '',
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({
            overAllError: "Can't able to fetch data!",
            loading: false,
          });
        });
    } catch (err) {
      this.setState({ overAllError: 'Server Error!' });
    }
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  openPopup() {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const url = `${API_URL}/twitter?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth() {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  render() {
    const { name, photo } = this.state.user;
    const { disabled } = this.state;

    return (
      <div className='container-fluid p-0'>
        <div>
          {name ? (
            <div>
              <Router>
                <div className='row'>
                  <div
                    className='container-fluid px-3 sticky-top'
                    style={{ zIndex: '2' }}
                  >
                    <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                      <div className='navbar-brand pl-3'>
                        <div className='h1' style={{ color: 'white' }}>
                          TwitterX
                        </div>
                      </div>
                      <a
                        className='ml-auto'
                        href='/'
                        onClick={this.closeCard.bind(this)}
                      >
                        <div>
                          <img title='Logout' src={photo} alt={name} />
                        </div>
                      </a>
                      <div className='pl-2 pr-2'>
                        <div
                          style={{ color: 'white', fontSize: '12px' }}
                        >{`@${name}`}</div>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className='row no-gutters'>
                  <div className='col-xl-2 d-none d-xl-block'>
                    <Sidebar />
                  </div>
                  <div className='col-xl-10 col-lg-12'>
                    <div
                      style={{
                        background: '#EAE8E7',
                        height: '100vh',
                        overflowX: 'auto',
                        overflowY: 'auto',
                      }}
                    >
                      {this.state.loading ? (
                        <div
                          style={{
                            height: '80vh',
                          }}
                          className='d-flex align-items-center justify-content-center'
                        >
                          <Loading loadingColor='#ff790e' />
                        </div>
                      ) : (
                        <Switch>
                          <Route
                            path={'/'}
                            exact
                            component={() => <Redirect to={'/recent-tweets'} />}
                          />
                          <Route
                            path='/recent-tweets'
                            component={() => (
                              <RecentTweets tweets={this.state.allTweets} />
                            )}
                          />
                          <Route
                            path='/top-user'
                            component={() => (
                              <TopUser tweets={this.state.allTweets} />
                            )}
                          />
                          <Route
                            path='/top-domains'
                            component={() => (
                              <TopDomains tweets={this.state.allTweets} />
                            )}
                          />
                        </Switch>
                      )}
                    </div>
                  </div>
                </div>
              </Router>
            </div>
          ) : (
            <div
              style={{ background: '#364e65', height: '100vh' }}
              className=' d-flex align-items-center justify-content-center flex-column'
            >
              <div className={`${'button'}`}>
                <button
                  title='Login with Twitter'
                  onClick={this.startAuth.bind(this)}
                  className={`twitter ${disabled}`}
                >
                  <FontAwesome name={'twitter'} />
                </button>
              </div>

              <div className='pt-2'>
                <p
                  style={{
                    color: 'white',
                    fontSize: '88px',
                    fontWeight: '600',
                  }}
                >
                  <b>TwitterX</b>
                </p>
              </div>
              <div className='p-0'>
                <p className='p-0' style={{ color: 'white', fontSize: '28px' }}>
                  Chase the <b>X</b>
                </p>
              </div>
              <div className='py-3'>
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
