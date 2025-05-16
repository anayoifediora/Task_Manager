import React from 'react';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { DELETE_TASK, MARK_COMPLETE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';


import Nav from '../components/Nav'
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    
    // Query to fetch the logged-in user's tasks
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: Auth.getProfile().data.username },
    });

    const tasks = data?.user?.tasks || [];
    const [deleteTask] = useMutation(DELETE_TASK);
    const [completeTask] = useMutation(MARK_COMPLETE);
    
    //This function handles the delete task event
    const handleTaskDelete = async (taskId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }
        
        try {
            const { data } = await deleteTask({
                variables: { taskId: taskId }
            })
        
        } catch (err) {
            console.error(err);
        }
        
        //reload the page after deleting a task
        window.location.reload("/dashboard");
    }
    const handleMarkComplete = async (e) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if(!token) {
            return false;
        }
        try {
            const { data } = await completeTask({
                variables: { taskId: e.target.id, status: "Completed", updatedAt: new Date().toDateString() }

            })
        } catch (err) {
            console.error(err);
        }
        alert("Task moved to Archives!");
        //reload the page after marking a task "complete"
        window.location.reload("/dashboard");
    }
    //Function that enables rendition of "tasks" if the task is greater than 1
    const plural = (arr) => {
        if (arr.length > 1 ) {
            return "Pending Tasks"
        } else {
            return "Pending Task"
        }
    } 
    //Color styles for status labels
    const statusStyles = {
        Todo: { backgroundColor: "rgb(200, 7, 7)", color: "white" },
        "In Progress": { backgroundColor: "rgb(220, 151, 24)", color: "white" },
        Completed: { backgroundColor: "green", color: "white" },
        
      };
        
      
    return (
        <>
         {Auth.loggedIn() ? (
            <div className = "view-page">
                <Nav />
                <div className = "dashboard-view">
                    {/* Header section */}
                    <div className="view-page-header">
                        <h2 className = 'dashboard-header'>Dashboard</h2>
                        <h4>Welcome {Auth.getProfile().data.username}!</h4>
                    </div>
                    {/* New task button */}
                    <button 
                        className="custom-new-task-btn "
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#createTaskModal"
                    >
                        + Create Task
                    </button>
                    {/* Tasks display */}
                    <div className="tasks-display">
                    
                        <h3 className="m-4" style={{textDecoration: "underline"}}>{tasks.length} {plural(tasks)}</h3>
                        {/* Table headers */}
                            <div className = "task-headers">
                                <h6>No.</h6>
                                <h6>Title</h6>
                                <h6>Status</h6>
                                <h6>Priority</h6>
                                <h6>Date Created</h6>
                                <h6>Due Date</h6>
                                <h6>Mark Done</h6>
                                <h6>Delete</h6>
                            </div>
                            {loading ? (
                                <div>Loading....</div>
                            ) : (!tasks.length ? <h4 className="ms-3 mt-3">No Pending tasks yet</h4> : (
                                
                                tasks.map((task) => (

                                    <div key={task._id} className="task">
                                        <p>{(tasks.indexOf(task)) + 1 }</p>
                                        <Link className="single-task-link" to={`/dashboard/${task._id}`}>{task.title}</Link>
                                        <p className= "task-status" style={{...statusStyles[task.status]}}>{task.status}</p>
                                        <p>{task.priority}</p>
                                        <p>{task.createdAt}</p>
                                        <p>{task.dueDate}</p>
                                        {/* "Mark Complete" button */}
                                        <i 
                                
                                            id={task._id}
                                            onClick={handleMarkComplete}
                                            className="custom-mark-btn bi bi-check-square-fill"
                                        >
                                            
                                        </i>
                                        {/* Delete button that triggers modal */}
                                        <i 
                                
                                            data-bs-toggle="modal"
                                            data-bs-target={`#deleteTaskModal-${task._id}`}
                                            className='custom-delete-btn bi bi-trash'
                                        ></i>
                                          {/* Modal for confirming task deletion */}  
                                        <div className="modal fade" id={`deleteTaskModal-${task._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header" style={{backgroundColor: "rgb(0, 48, 73, 0.9)"}}>
                                                        <p className="modal-title fw-bold" id="exampleModalLabel" style={{color: "rgb(234, 226, 183)"}}>Delete Task Confirmation</p>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Are you sure you want to delete the task "<strong>{task.title}</strong>"?</p>
                                                        <p>Click "Confirm" to delete or "Cancel" to abort</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" className="btn" onClick={() => handleTaskDelete(task._id)}>Confirm</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                ))
                            ))}
                    </div>
                </div>
                {/* Modal form for the creation of a new task */}
                <TaskForm/>
            </div>
         ) : (
            <div className="view-page">
                <h3>Kindly log in to view this page!</h3>
            </div>
         )}
        </>
    )
}

export default Dashboard;