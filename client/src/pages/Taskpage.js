import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import Auth from '../utils/auth';
import { QUERY_SINGLE_TASK } from '../utils/queries';
import UpdateTaskForm from '../components/UpdateTaskForm';



const Taskpage = () => {

    const { taskId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_TASK, {
        variables: { taskId: taskId }
    })
    const task = data?.task || {};
    
    return (
        <div className="view-page">
            <Header/>
            <div className= "task-view">
                <div className="view-page-header">
                    <h2>Task</h2>
                    <h4 className="pe-5">Welcome {Auth.getProfile().data.username}!</h4>
                </div>
                <div className = "custom-task-btns align-self-center m-4">
            
                    <button data-bs-toggle="modal" data-bs-target="#updateTaskModal">Update Task</button>
                    
                </div>
                {loading ? (
                    <div>Loading....</div>
                ) : (

                    <div className="task-details">
                        <em><label>Title</label></em>
                        <h4>{task.title}</h4>
                        <hr></hr>
                        <em><label>Description</label></em>
                        <p>{task.description}</p>
                        <hr></hr>
                        <label>Created by</label>
                        <h6>{task.taskAuthor}<span className="ms-2">{task.createdAt}</span></h6>
                        <em><label>Updated</label></em>
                        <p>{task.updatedAt}</p>
                        <em><label>Status</label></em>

                        <p>{task.status}</p>
                        <em><label>Priority</label></em>
                        <p>{task.priority}</p>
                        <em><label>Due Date</label></em>
                        <p>{task.dueDate}</p>
                    </div>
                )}
            </div>
            <UpdateTaskForm/>
        </div>

    )
}

export default Taskpage;