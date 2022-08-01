import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import AlbumCover from "../../assets/AlbumCover.jpg"
import AlbumDescription from './AlbumDescription';
import Tracklist from './Tracklist';
import Navbar from "../Navbar";

function AlbumPage() {
  return (
    <>
        <Navbar/>
        <Container fluid>
          <Row>
            <Col>
                <Image src={AlbumCover} fluid="true" rounded="true" />
            </Col>
            <Col xs={8}>
                <AlbumDescription />
            </Col>
          </Row>
          <Row>
            <Col>
                <Tracklist/>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default AlbumPage;