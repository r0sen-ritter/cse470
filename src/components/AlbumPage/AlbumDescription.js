import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AlbumRating from './AlbumRating';

const AlbumDescription = () => {
  return (
    <>
        <Container className='p-5'>
            <Row className='border-bottom border-dark border-2'>
                <Col>
                    <h2>Twin Fantasy</h2>
                </Col>
            </Row>

            <Row className='pt-3'>
                <Col className='fw-light fs-6'>Artist</Col>
                <Col xs={10} className='fs-5'>Car Seat Headrest</Col>
            </Row>

            <Row className='pt-1'>
                <Col className='fw-light fs-6'>Type</Col>
                <Col xs={10} className='fs-5'>Album</Col>
            </Row>

            <Row className='pt-1'>
                <Col className='fw-light fs-6'>Released</Col>
                <Col xs={10} className='fs-5'>16 February 2018</Col>
            </Row>

            <Row className='pt-1'>
                <Col className='fw-light fs-6'>Recorded</Col>
                <Col xs={10} className='fs-5'>2016 - 2017</Col>
            </Row>

            <Row className='pt-1'>
                <Col className='fw-light fs-6'>Rating</Col>
                <Col xs={10} className='fs-5'>3.91 / 5.0</Col>
            </Row>

            <Row className='pt-1'>
                <Col className='fw-light fs-6'>Genres</Col>
                <Col xs={10} className='fs-5'>Indie Rock, Singer-Songwriter, Power Pop</Col>
            </Row>

            <Row className='pt-4'>
                <AlbumRating />
            </Row>

        </Container>
    </>
  )
}

export default AlbumDescription