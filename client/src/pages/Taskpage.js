import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import Auth from '../utils/auth';
import { QUERY_SINGLE_TASK } from '../utils/queries';
import UpdateTaskForm from '../components/UpdateTaskForm';



const Taskpage = () => {
    //Get the task id from the URL params
    const { taskId } = useParams();
    //Fetch the task data using Apollo's useQuery hook
    const { loading, data } = useQuery(QUERY_SINGLE_TASK, {
        //pass the task id as a variable to the query
        variables: { taskId: taskId }
    })

    const task = data?.task || {};
    
    //Color styles for status labels
    const statusStyles = {
        Todo: { backgroundColor: "rgb(200, 7, 7)", color: "white" },
        "In Progress": { backgroundColor: "rgb(220, 151, 24)", color: "white" },
        Completed: { backgroundColor: "green", color: "white" },
        
      };

    return (
        <div className="view-page">
            {/* Navigation Bar */}
            <Nav/>
            {/* Task Content Section */}
            <div className= "task-view">
                <div className="view-page-header">
                    <h2>Task</h2>
                    <h4 className="pe-5">Welcome {Auth.getProfile().data.username}!</h4>
                </div>
                {/* Button to open the modal for updating the task */}
                <div className = "custom-task-btns align-self-center m-4">
            
                    <button data-bs-toggle="modal" data-bs-target="#updateTaskModal">Update Task</button>
                    
                </div>
                {/* Conditional rendering: show loading or task details */}
                {loading ? (
                    <div>Loading....</div>
                ) : (

                    <div className="task-details">
                        {/* Title and status with styles */}
                        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                            <label>Title<h4 style={{color: "black"}}>{task.title}</h4></label>
                            <h6>Status: <span className="task-status" style={{...statusStyles[task.status]}}>{task.status}</span></h6>
                        </div>
                        
                        <hr></hr>
                        {/* Task description */}
                        <label>Description</label>
                        <p>{task.description}</p>
                        <hr></hr>
                        {/* Metadata about who created and last updated the task */}
                        <label>Created by</label>
                        <h6>{task.taskAuthor}<span className="ms-2">on {task.createdAt}</span></h6>
                        <label>Updated</label>
                        <p>{task.updatedAt}</p>

                        
                        <label>Priority</label>
                        <p>{task.priority}</p>
                        <label>Due Date</label>
                        <p>{task.dueDate}</p>
                    </div>
                )}
            </div>
            {/* Modal form for updating the task */}
            <UpdateTaskForm singleTask={task}/>
        </div>

    )
}

export default Taskpage;