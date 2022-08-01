import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavBar from "../../components/Navbar";
import AlbumCard from "../../components/AlbumCard";

function Home() {
  return (
    <>
        <NavBar/>
        <Container fluid>
            <Row>
                
            </Row>
            <Row className="p-5 m-5">
                <Col className="p-5">
                    <AlbumCard/>
                </Col>
                <Col className="p-5">
                    <AlbumCard/>
                </Col>
                <Col className="p-5">
                    <AlbumCard/>
                </Col>
                
            </Row>
        </Container>
    </>
  );
}

export default Home;