import React from 'react';
import FontAwesome from 'react-fontawesome';

export default () => {
  return (
    <footer>
      <a
        href='https://github.com/khyatigoyal'
        title='Github repo'
        className={'github'}
      >
        <FontAwesome name={'github'} />
      </a>
    </footer>
  );
};
