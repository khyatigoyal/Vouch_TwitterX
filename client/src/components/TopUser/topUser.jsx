import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function TopUser({ tweets }) {
  const history = useHistory();

  const [topTweet, setTopTweet] = React.useState(
    tweets.reduce((tweet1, tweet2) =>
      tweet1.entities.urls.length +
        (tweet1.entities.media ? tweet1.entities.media.length : 0) >
      tweet2.entities.urls.length +
        (tweet2.entities.media ? tweet2.entities.media.length : 0)
        ? tweet1
        : tweet2
    )
  );

  return (
    <div className='container-fluid p-0'>
      <Modal
        isOpen={true}
        style={{
          borderRadius: '50px',
          height: '25%',
        }}
      >
        <ModalHeader>
          <div className='d-flex align-items-center justify-content-center'>
            <div>Hurrayy!!</div>
          </div>
        </ModalHeader>
        <ModalBody className='p-0'>
          <div className='p-3 d-flex flex-row '>
            <div style={{ color: 'green' }}>{topTweet.user.name + ' '}</div>{' '}
            <div>shared the Maximum Link Resources!!</div>
          </div>
        </ModalBody>
        <ModalFooter className='p-0'>
          <div className='ml-auto'>
            <Button
              color='primary'
              style={{ height: '50px', width: '150px' }}
              onClick={() => history.push('/recent-tweets')}
            >
              OK
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TopUser;
