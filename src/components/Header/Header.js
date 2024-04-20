import React from 'react'
import s from './Header.module.css'
import { Col, Row } from 'react-bootstrap'
function Header(){
    return(
        <Row>
            <Col>
               <div className={s.root}>To-Do List</div>
            </Col>
        </Row>
    )
}

export default Header