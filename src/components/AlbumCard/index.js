import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AlbumCover from "../../assets/AlbumCover.jpg"

function AlbumCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={AlbumCover} />
      <Card.Body>
        <Card.Title>Twin Fantasy</Card.Title>
        <Card.Text>
          Car Seat Headrest
        </Card.Text>
        <Button variant="primary">Go to Album</Button>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;