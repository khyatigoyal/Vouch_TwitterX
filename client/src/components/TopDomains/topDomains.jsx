import React, { useEffect } from 'react';
import { Dictionary } from '../../assets/dictionary.js';

function TopDomains({ tweets }) {
  const [domainsList, setDomainsList] = React.useState([]);
  useEffect(() => {
    var domains = [];

    tweets.map((tweet) => {
      let text = tweet.text;
      let words = Dictionary;
      if (words[words.length - 1] === '') {
        words.pop();
      }
      var maxlen = 0;
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].toLowerCase();
        if (maxlen < words[i].length) {
          maxlen = words[i].length;
        }
      }

      var split = text
        .replace(/^https:t/, '')
        .replace(/^#/, '')
        .replace(/^www\./, '')
        .replace(/\//g, '')
        .split('.');
      if (text.match(/^#/) === null && split.length === 2) {
        split.pop();
      } else if (text.match(/^#/) === null && split.length > 2) {
        split.pop();
        split.pop();
      }
      var word = split.join('.').replace(/\s*$/, '').toLowerCase();
      var possibles = [{ words: [], ongoing: '' }];
      for (let i2 = 0; i2 < word.length; i2++) {
        var len = possibles.length;
        for (let i3 = 0; i3 < len; i3++) {
          possibles[i3].ongoing += word[i2];
          if (
            words.indexOf(possibles[i3].ongoing) !== -1 ||
            possibles[i3].ongoing.match(/^[0-9.]*$/) !== null
          ) {
            var newwords = [];
            for (let i4 = 0; i4 < possibles[i3].words.length; i4++) {
              newwords.push(possibles[i3].words[i4]);
            }
            newwords.push(possibles[i3].ongoing);
            possibles.push({ words: newwords, ongoing: '' });
          }
        }
      }
      var max_cases = [];
      for (let i2 = 0; i2 < possibles.length; i2++) {
        if (possibles[i2].ongoing === '') {
          max_cases.push(possibles[i2].words);
        }
      }
      if (max_cases.length === 0) {
        return domains.push(word);
      } else {
        var index = 0;
        while (max_cases.length !== 1) {
          var max = 0;
          for (let i3 = 0; i3 < max_cases.length; i3++) {
            if (max_cases[i3][index].length > max) {
              max = max_cases[i3][index].length;
            }
          }
          var new_max_cases = [];
          for (let i3 = 0; i3 < max_cases.length; i3++) {
            if (max_cases[i3][index].length === max) {
              new_max_cases.push(max_cases[i3]);
            }
          }
          max_cases = new_max_cases;
          index += 1;
        }

        return domains.push(max_cases[0].join(' '));
      }
    });

    setDomainsList(domains);
  }, [tweets]);
  return (
    <div className='container fluid p-0'>
      <div className='p-3'>
        <div
          className='text-center pb-2'
          style={{
            fontSize: '24px',
            fontWeight: '500',
          }}
        >
          Top Domains
        </div>

        <ul className='list-group '>
          {domainsList
            ? domainsList.map((domain, index) => {
                return (
                  <li
                    key={index}
                    className='list-group-item list-group-item-info'
                  >
                    {domain}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default TopDomains;
