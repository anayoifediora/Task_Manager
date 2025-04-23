import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../utils/mutations';
import { QUERY_SINGLE_USER } from '../utils/queries';

import Auth from "../utils/auth";


const TaskForm = () => {

    const [formState, setFormState] = useState({ title: " ", description: " ", priority: " ", status: " " });
    const [taskDueDate, setTaskDueDate] = useState("");
    const [addTask, { error, data }] = useMutation(ADD_TASK, {
        //The update method allows us to access and update the local cache
        update(cache, { data: { addTask } }) {
            try {
                //Retrieve existing user data that is stored in the cache under the `QUERY_SINGLE_USER` query
                const { tasks } = cache.readQuery({ query: QUERY_SINGLE_USER });

                //Update the cache
                cache.writeQuery({
                    query: QUERY_SINGLE_USER,
                    data: { tasks: [...tasks, addTask]},
                });
            } catch (e) {
                console.error(e)
            }
        }
    });
    
    const profile = Auth.getProfile().data;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data, error } = await addTask({
                variables: { ...formState ,
                taskAuthor: profile.username,
                dueDate: taskDueDate,
                }
            })
            
        } catch (e) {
            console.log(e);
        }
        window.location.reload();
        //clear form values
        setFormState({ 
            title: " ", 
            description: " ", 
            priority: " ", 
            status: " ", 
        })

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            //This spreads the current state object (copying existing values)
            ...formState,
            //Updates the specific key with the new value typed by the user
            [name]: value,
        })
    }
    const handleDueDateChange = (e) => {   
        setTaskDueDate(e.target.value);
    }
        
    return (

        <>

            {/* <!-- Modal --> */}
            <div className="modal fade modal-lg" id="createTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">* Title</label>
                                <input name="title" onChange = {handleInputChange} value={formState.title}type="title" className="form-control" id="title" placeholder="Add title here...."/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">* Description </label>
                                <p className = 'character-count'>Character count: {formState.description.length} / 5800</p>
                                <textarea name="description" onChange = {handleInputChange} value={formState.description} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm mb-3" name="priority" onChange = {handleInputChange} value={formState.priority} aria-label="Small select example">
                                    <option >Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <select className="form-select form-select-sm mb-3 ms-3" name="status" onChange = {handleInputChange} value={formState.status}aria-label="Small select example">
                                    <option >Select Status</option>
                                    <option value="Todo">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='datepicker' className="me-3">Due Date</label>
                                <input name="dueDate" type="date" onChange={handleDueDateChange} value={taskDueDate}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn" onClick={handleFormSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskForm;