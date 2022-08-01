import React from 'react';
import Table from 'react-bootstrap/Table';

const Tracklist = () => {
  return (
    <>
        <Table striped hover>
            <thead>
                <tr>
                    <th>Track Listing</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>A1</td>
                    <td>My Boy (Twin Fantasy)</td>
                </tr>
                <tr>
                    <td>A2</td>
                    <td>Beach Life-in-Death</td>
                </tr>
                <tr>
                    <td>B1</td>
                    <td>Stop Smoking (We Love You)</td>
                </tr>
                <tr>
                    <td>B2</td>
                    <td>Sober to Death</td>
                </tr>
                <tr>
                    <td>B3</td>
                    <td>Nervous Young Inhumans</td>
                </tr>
                <tr>
                    <td>C1</td>
                    <td>Bodys</td>
                </tr>
                <tr>
                    <td>C2</td>
                    <td>Cute Thing</td>
                </tr>
                <tr>
                    <td>C3</td>
                    <td>High to Death</td>
                </tr>
                <tr>
                    <td>D1</td>
                    <td>Famous Prophets (Stars)</td>
                </tr>
                <tr>
                    <td>D2</td>
                    <td>Twin Fantasy (Those Boys)</td>
                </tr>               
            </tbody>
        </Table>
    </>
  )
}

export default Tracklist