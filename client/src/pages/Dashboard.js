import React from 'react';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { DELETE_TASK } from '../utils/mutations';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import Header from '../components/Header'
import TaskForm from '../components/TaskForm';

const Dashboard = () => {

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: Auth.getProfile().data.username },
    });

    const tasks = data?.user?.tasks || [];
    const [deleteTask, error ] = useMutation(DELETE_TASK);

    //This function handles the delete task event
    const handleTaskDelete = async (e) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }
        try {
            const { data } = await deleteTask({
                variables: { taskId: e.target.id }
            })
        } catch (err) {
            console.error(err);
        }
        //reload the page after deleting a task
        window.location.reload("/dashboard");
    }

    const plural = (arr) => {
        if (arr.length > 1 ) {
            return "Pending Tasks"
        } else {
            return "Pending Task"
        }
    } 

    return (
        <>
         {Auth.loggedIn() ? (
            <div className = "view-page">
                <Header />
                <div className = "dashboard-view">
                    <div className="view-page-header">
                        <h2 className = 'dashboard-header'>Dashboard</h2>
                        <h4 className="pe-5">Welcome {Auth.getProfile().data.username}!</h4>
                    </div>
                    <button 
                        className="custom-new-task-btn "
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#createTaskModal"
                    >
                        + Create Task
                    </button>
                    <div className="tasks-display">
                    
                        <h3 className="m-4" style={{textDecoration: "underline"}}>{tasks.length} {plural(tasks)}</h3>
                            <div className = "task-headers">
                                <h5>No</h5>
                                <h5>Title</h5>
                                <h5>Status</h5>
                                <h5>Priority</h5>
                                <h5>Date Created</h5>
                                <h5>Due Date</h5>
                                <h5>Edit</h5>
                                <h5>Delete</h5>
                            </div>
                            {loading ? (
                                <div>Loading....</div>
                            ) : (!tasks.length ? <h4 className="ms-3 mt-3">No Pending tasks yet</h4> : (
                                
                                tasks.map((task) => (

                                    <div key={task._id} className="task">
                                        <p>{(tasks.indexOf(task)) + 1 }</p>
                                        <Link className="single-task-link" to={`/dashboard/${task._id}`}>{task.title}</Link>
                                        <p className= "task-status">{task.status}</p>
                                        <p>{task.priority}</p>
                                        <p>{task.createdAt}</p>
                                        <p>{task.dueDate}</p>
                                        <button>Update</button>
                                        <button 
                                            type="button"
                                            style={{borderRadius: "5px", paddingLeft: "15px", paddingRight: "15px"}}
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteTaskModal"
                                            id={task._id}
                                            onClick={handleTaskDelete}
                                        >
                                            Delete
                                        </button>
                                        <div className="modal fade" id="deleteTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header" style={{backgroundColor: "rgb(0, 48, 73, 0.9)"}}>
                                                        <p className="modal-title fw-bold" id="exampleModalLabel" style={{color: "rgb(234, 226, 183)"}}>Delete Task Confirmation</p>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Are you sure you want to delete the task?</p>
                                                        <p>Click "Confirm" to delete or "Cancel" to abort</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" className="btn">Confirm</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                ))
                            ))}
                    </div>
                </div>
                <TaskForm/>
            </div>
         ) : (
            <div>
                <h3>Kindly log in to view this page!</h3>
            </div>
         )}
        </>
    )
}

export default Dashboard;