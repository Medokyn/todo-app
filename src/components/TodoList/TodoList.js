import React, { useEffect, useState} from "react";
import { Col, Row, Button, FormControl, ButtonGroup } from "react-bootstrap";
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faTrashCan, faSquarePen, faLock, faLockOpen, faSquare, faCheck, faX} from '@fortawesome/free-solid-svg-icons' 


function TodoList({todo, setTodo}){

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFiltered] = useState(todo)

    useEffect(()=>{  //Будет выполняться после каждой прорисовки страницы
        setFiltered(todo)
    },[todo])

    function todoFilter(status){
        if(status === 'all'){
            setFiltered(todo)
        } else{
            let newTodo = [...todo].filter( item => item.status === status) 
            setFiltered(newTodo)
        }
    }

    function deleteTodo(id){
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo)
    }

    function statusTodo(id){
        let newTodo = [...todo].filter(item =>{
            if(item.id == id){
                item.status = !item.status
            }
            return item 
        })
        setTodo(newTodo)

    }

    function editTodo(id, title){
        setEdit(id)
        setValue(title)
    }

    function saveTodo(id) {
        let newTodo = [...todo].map (item => {
            if (item.id == id){
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }

    return(
        <div>
            <Row>
                <Col className={s.filter}>
                    <ButtonGroup aria-label="Basic example" className={s.btns}>
                         <Button variant="secondary" onClick={()=>todoFilter('all')}>All</Button>
                         <Button variant="secondary" onClick={()=>todoFilter(true)}>Opened</Button>
                         <Button variant="secondary" onClick={()=>todoFilter(false)}>Close</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            {
            filtered.map( item=>(
                <div key={item.id} className={s.ListItem}> 
                    {
                       edit == item.id ?
                        <div>
                            <input value={value} onChange={(e)=>setValue(e.target.value)}/>
                        </div> :
                        <div className={!item.status ? s.close : ''}>{ item.title}</div>
                    }

                    {
                        edit == item.id ?
                        <div>
                            <Button onClick={ ()=> saveTodo (item.id) }><FontAwesomeIcon icon = {faSave}/></Button>
                        </div> :
                        <div>
                             <Button onClick={ ()=>deleteTodo(item.id)}><FontAwesomeIcon icon = {faTrashCan}/></Button>
                             <Button onClick={ ()=>editTodo(item.id, item.title)} className={s.btn}><FontAwesomeIcon icon = {faSquarePen}/></Button>
                             <Button onClick={ ()=>statusTodo(item.id)} className={s.btn}>
                            {
                                item.status  ? <FontAwesomeIcon icon = {faX}/> : <FontAwesomeIcon icon = {faCheck}/>
                            }
                           </Button>       
                        </div>
                    }
                </div>
            ))
            }
        </div>
    )
}
export default TodoList