import React, { useState, useEffect } from "react";
import { Col, Row, Button, FormControl } from "react-bootstrap";
import { v4 as uuid4 } from 'uuid';
import s from './AddTodo.module.css';

function AddTodo({ todo, setTodo }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        return () => window.removeEventListener('keydown', handleEnterPress);
    }, [value]);

    function handleEnterPress(event) {
        if (event.key === 'Enter' && !event.repeat) {
            event.preventDefault();
            if (value.trim() !== '') {
                setTodo([
                    ...todo,
                    {
                        id: uuid4(),
                        title: value.trim(),
                        status: true
                    }
                ]);
                setValue('');
            }
        }
    }

    function saveTodo() {
        if (value.trim() !== '') {
            setTodo([
                ...todo,
                {
                    id: uuid4(),
                    title: value.trim(),
                    status: true
                }
            ]);
            setValue('');
        }
    }

    return (
        <Row>
            <Col className={s.addTodoForm}>
                <FormControl placeholder="Enter the task" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button onClick={saveTodo} className={s.btn}>Save</Button>
            </Col>
        </Row>
    );
}

export default AddTodo;
