//Importing Libraries
import React from 'react';
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { QUERY_COMPLETED_TASK } from '../utils/queries';


import Auth from '../utils/auth';
import Nav from '../components/Nav';


//Returns the "Archives" page which displays completed tasks.
const Archive = () => {
    const { loading, data } = useQuery(QUERY_COMPLETED_TASK, {
        variables: { taskAuthor: Auth.getProfile().data.username }
    })
    const tasks = data?.completedTasks || [];
    const plural = (arr) => {
        if (arr.length > 1 ) {
            return "Completed Tasks"
        } else {
            return "Completed Task"
        }
    } 

    const statusStyles = {
        Todo: { backgroundColor: "green", color: "white"},
        "In Progress": { backgroundColor: "orange", color: "white" },
        Completed: { backgroundColor: "green", color: "white" },
      };
        

    return (

        <>

        {Auth.loggedIn() ? (
                    <div className = "view-page">
                        <Nav />
                        <div className = "archive-view">
                            <div className="view-page-header">
                                <h2 className = 'archive-header'>Archives</h2>
                                <h4 className="pe-5">Welcome {Auth.getProfile().data.username}!</h4>
                            </div>
                            
                            <div className="tasks-display">
                            
                                <h3 className="m-4" style={{textDecoration: "underline"}}>{tasks.length} {plural(tasks)}</h3>
                                    <div className = "completedtask-headers">
                                        <h5>No</h5>
                                        <h5>Title</h5>
                                        <h5>Status</h5>
                                        <h5>Priority</h5>
                                        <h5>Date Created</h5>
                                        <h5>Due Date</h5>
                                        <h5>Date Completed</h5>
                                        
                                    </div>
                                    {loading ? (
                                        <div>Loading....</div>
                                    ) : (!tasks.length ? <h4 className="ms-3 mt-3">No completed tasks yet</h4> : (
                                        
                                        tasks.map((task) => (

                                            <div key={task._id} className="completed-task">
                                                <p>{(tasks.indexOf(task)) + 1 }</p>
                                                <Link className="single-task-link" to={`/dashboard/${task._id}`}>{task.title}</Link>
                                                <p className= "task-status" style={{...statusStyles[task.status]}}>{task.status}</p>
                                                <p>{task.priority}</p>
                                                <p>{task.createdAt}</p>
                                                <p>{task.dueDate}</p>
                                                <p>{task.updatedAt}</p>
                                                
                                            </div>
                                            
                                        ))
                                    ))}
                            </div>
                        </div>
                    
                    </div>
                ) : (
                    <div>
                        <h3>Kindly log in to view this page!</h3>
                    </div>
                )}
        </>
    )

}

export default Archive;