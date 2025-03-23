import React, { useState, useEffect } from 'react';
import { UPDATE_TASK } from '../utils/mutations';
import { QUERY_SINGLE_TASK } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';

const UpdateTaskForm = (props) => {
        const [updateTask] = useMutation(UPDATE_TASK);
        
        const { taskId } = useParams();
        
        const [formState, setFormState] = useState(
            { title: '',
              description: '',
              priority: '',
              status: '',
              dueDate: ''
            }
        );
        //useEffect is updating the state when "props.singleTask" changes.
        useEffect(() => {
            if (props.singleTask) {
                setFormState({
                    title: props.singleTask.title || " ",
                    description: props.singleTask.description || " ",
                    priority: props.singleTask.priority || " ",
                    status: props.singleTask.status || " ",
                    dueDate: props.singleTask.dueDate || " "
                });
            }
        }, [props.singleTask])

        const handleFormSubmit = async (event) => {
            event.preventDefault();
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if(!token) {
                return false;
            }
            if(formState.status === "Completed") {
                alert('Cannot update a completed task!');
                return;
            }
            try {
                const { data, error } = await updateTask({
                    variables: { ...formState, taskId: taskId, updatedAt: new Date().toDateString() },
                    
                });
        
            } catch (e) {
                console.error(e);
            }
            window.location.reload();
            alert('Successfully updated!')

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
                ...formState,
                [name]: value,
            })
        }

    return (

        <>

            {/* <!-- Update Task Modal --> */}
            <div className="modal fade modal-lg" id="updateTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input name="title"  onChange={handleInputChange} value={formState.title} type="title" className="form-control" id="title" placeholder="Add title here...."/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" onChange={handleInputChange}  value={formState.description} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm mb-3" name="priority" onChange={handleInputChange} value={formState.priority}    aria-label="Small select example">
                                    <option >Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <select className="form-select form-select-sm mb-3 ms-3" name="status" onChange={handleInputChange} value={formState.status}  aria-label="Small select example">
                                    <option >Select Status</option>
                                    <option value="Todo">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='datepicker' className="me-3">Due Date</label>
                                <input name="dueDate" type="date" onChange={handleInputChange} value={formState.dueDate}/>
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

export default UpdateTaskForm;