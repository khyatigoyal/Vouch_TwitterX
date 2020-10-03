import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
function RecentTweets({ tweets }) {
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
          Tweets
        </div>
        <div className='row no-gutters'>
          {tweets
            ? tweets.map((tweet, index) => {
                return (
                  <div key={index} className='col-xl-4 col-md-3 col-sm-2'>
                    <div className='m-2'>
                      <Card style={{ height: '300px', borderRadius: '50px' }}>
                        <CardBody>
                          <CardTitle className='mb-3'>
                            Tweeted by:{' '}
                            <u>
                              <i>{tweet.user.name}</i>
                            </u>
                          </CardTitle>
                          <CardSubtitle className='mb-2'>
                            Date: {tweet.created_at}
                          </CardSubtitle>
                          <CardText>{tweet.text}</CardText>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default RecentTweets;
