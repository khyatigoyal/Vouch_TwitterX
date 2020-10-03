import React, { useEffect } from 'react';
import './sidebar.css';
import {
  LINKCOLOR,
  WHITE,
  SECONDARYCOLOR,
  BACKGROUNDCOLOR,
} from '../../assets/colors';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import TopDomainSVG from '../../assets/svg/manage-appsSVG';
import TopUserSVG from '../../assets/svg/my-accountSVG';
import RecentTweetsSVG from '../../assets/svg/product-catalogSVG';

function Sidebar() {
  const location = useLocation();
  const history = useHistory();
  const TopDomains = 'Top Domains';
  const TopUser = 'Top User';
  const RecentTweets = 'Recent Tweets';
  const [activeLink, setActiveLink] = React.useState(RecentTweets);
  function changeRouting(value) {
    setActiveLink(value);
    let str = value.toLowerCase();
    str = str.replace(' ', '-');
    history.push(`/${str}`);
  }
  useEffect(() => {
    const url = location.pathname.split('/');
    if (url.includes('recent-tweets')) {
      setActiveLink(RecentTweets);
    } else if (url.includes('top-domains')) {
      setActiveLink(TopDomains);
    } else if (url.includes('top-user')) {
      setActiveLink(TopUser);
    }
  }, [location.pathname]);
  return (
    <div
      className={`${'sideBarBackground'} sticky-left`}
      style={{
        background: WHITE,
        overflowX: 'auto',
        overFlowY: 'auto',
      }}
    >
      <div
        style={{
          height: '80%',
          overflow: 'auto',
        }}
      >
        <NavLink
          activeClassName={'activeState'}
          className={'nonActiveState'}
          to='/recent-tweets'
          onClick={() => changeRouting(RecentTweets)}
        >
          <div
            className={`d-flex align-items-center justify-content-start ${
              activeLink === RecentTweets ? 'activeState' : 'nonActiveState'
            }`}
            style={
              activeLink === RecentTweets
                ? {
                    color: LINKCOLOR,
                    background: BACKGROUNDCOLOR,
                    borderLeft: `4px solid ${LINKCOLOR}`,
                    padding: '15px 10px 15px 40px',
                  }
                : { padding: '15px 10px 15px 40px' }
            }
          >
            <div className='pr-2'>
              <RecentTweetsSVG
                color={activeLink === RecentTweets ? LINKCOLOR : SECONDARYCOLOR}
              />
            </div>
            <div className='pl-2'>
              <p
                style={{ margin: 0 }}
                className={
                  activeLink === RecentTweets ? 'activeLink' : 'nonActiveLink'
                }
              >
                {RecentTweets}
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink
          activeClassName={'activeState'}
          className={'nonActiveState'}
          to='/top-user'
          onClick={() => changeRouting(TopUser)}
        >
          <div
            className={`d-flex align-items-center justify-content-start ${
              activeLink === TopUser ? 'activeState' : 'nonActiveState'
            }`}
            style={
              activeLink === TopUser
                ? {
                    color: LINKCOLOR,
                    background: BACKGROUNDCOLOR,
                    borderLeft: `4px solid ${LINKCOLOR}`,
                    padding: '15px 10px 15px 40px',
                  }
                : { padding: '15px 10px 15px 40px' }
            }
          >
            <div className='pr-2'>
              <TopUserSVG
                color={activeLink === TopUser ? LINKCOLOR : SECONDARYCOLOR}
              />
            </div>
            <div className='pl-2'>
              <p
                style={{ margin: 0 }}
                className={
                  activeLink === TopUser ? 'activeLink' : 'nonActiveLink'
                }
              >
                {TopUser}
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink
          activeClassName={'activeState'}
          className={'nonActiveState'}
          to='/top-domains'
          onClick={() => changeRouting(TopDomains)}
        >
          <div
            className={`d-flex align-items-center justify-content-start ${
              activeLink === TopDomains ? 'activeState' : 'nonActiveState'
            }`}
            style={
              activeLink === TopDomains
                ? {
                    color: LINKCOLOR,
                    background: BACKGROUNDCOLOR,
                    borderLeft: `4px solid ${LINKCOLOR}`,
                    padding: '15px 10px 15px 40px',
                  }
                : { padding: '15px 10px 15px 40px' }
            }
          >
            <div className='pr-2'>
              <TopDomainSVG
                color={activeLink === TopDomains ? LINKCOLOR : SECONDARYCOLOR}
              />
            </div>
            <div className='pl-2'>
              <p
                style={{ margin: 0 }}
                className={
                  activeLink === TopDomains ? 'activeLink' : 'nonActiveLink'
                }
              >
                {TopDomains}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
