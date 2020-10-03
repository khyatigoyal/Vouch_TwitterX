import React from 'react';

function MyAccountSVG({ color = '#ffffff' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='account-icon'
      style={{ fill: color }}
      width='20'
      height='20'
      viewBox='0 0 33.904 33.904'
    >
      <g id='account-circle'>
        <path
          id='Path_392'
          d='M16.952 0A16.952 16.952 0 1 0 33.9 16.952 17 17 0 0 0 16.952 0zm0 5.086a5 5 0 0 1 5.086 5.086 5 5 0 0 1-5.086 5.086 5 5 0 0 1-5.086-5.086 5 5 0 0 1 5.086-5.086zm0 24.072a12.367 12.367 0 0 1-10.171-5.425c0-3.39 6.781-5.255 10.171-5.255s10.171 1.865 10.171 5.255a12.368 12.368 0 0 1-10.171 5.425z'
          data-name='Path 392'
        />
      </g>
    </svg>
  );
}

export default MyAccountSVG;
