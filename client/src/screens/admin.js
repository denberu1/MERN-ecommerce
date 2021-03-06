import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listOrder, deleteOrder, updateOrderStatus } from '../actions/order'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const adminScreen = (props) => {
    const [id, setId] = useState('')
    const [status, setStatus] = useState('')

    const orderList = useSelector(state => state.orderList)
    const { orders, loading, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete)
    const { order, success } = orderDelete;

    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const updateHandler =(item)=>{
        setId(item._id)
        setStatus(item.status)
    }

    const submitHandler = (e) => {
        e.preventDefault();
            dispatch(updateOrderStatus(id, status));
      }

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/admin') }
        dispatch(listOrder())

        if (success) {
            toast('Deleted Successfully')
        }

    }, [success, adminInfo])

    return <>

        <div className='container'>
            <Link to='/add-product'>
                <button className="btn btn-info">Add Product</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {
                    orders && orders.length == 0 ? <p style={{ textAlign: 'center' }}>order Not Found</p> :

                        <tbody>
                            {
                                orders && orders.map(item =>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{item.user.name}</td>
                                        <td>{item.user.email}</td>
                                        <td>
                                            <button onClick={()=>updateHandler(item)} type="button" className="btn btn-primary" data-toggle="modal" data-target={"#statusModel" + item._id}>{item.status}</button>
                                        </td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        <td>
                                            <span className="fa fa-eye" data-toggle="modal" data-target={"#exampleModal" + item._id} style={{ fontSize: '25px' }}></span>
                                            <span className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure to delete this item?')) deleteHandler(item._id) }} ><i className='fa fa-trash'></i></span>
                                        </td>

                                        {/* order details models */}
                                        <div className="modal fade" id={"exampleModal" + item._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">{item.user.name}</h5>
                                                    </div>

                                                    <div className="modal-body">
                                                        <b>Address: </b> {item.address} <br />

                                                        <b>City: </b> {item.city} <br />

                                                        <b>Country: </b> {item.country} <br />

                                                        <b>Postal Code: </b> {item.postalCode} <br />

                                                        <b>Email: </b> {item.user.email} <br />
                                                    </div>
                                                    {
                                                        item.product.map(product =>
                                                            <div className="modal-body">
                                                                <b>Brand: </b> {product.name} <br />
                                                                <b>Price: </b> {product.price} <br />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="modal-body">
                                                        <b>Qty: </b> {item.qty}
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* order status model */}

                                        <div className="modal fade" id={"statusModel" + item._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">{item.user.name}</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={submitHandler}>
                                                            <div className="form-group">
                                                                <label> <b>{item.status}</b> </label>
                                                                <select onChange={(e)=>setStatus(e.target.value)} className="form-control" > 
                                                                    <option></option>
                                                                    <option>Initiated</option>
                                                                    <option>In Progress</option>
                                                                    <option>Delevired</option>
                                                                    <option>Cancel</option>
                                                                </select>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </tr>

                                )
                            }
                            <ToastContainer />

                        </tbody>
                }
            </table>
        </div>

    </>
}

export default adminScreen