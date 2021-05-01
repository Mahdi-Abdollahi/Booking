import React, { useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';
import uniqid from 'uniqid';

export default function Dashboard() {
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [deleteEvent, setDeleteEvent] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        {axios.get("https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json")
        .then(res => {
            const booksArray = Object.values(res.data);
            const booksIds = Object.keys(res.data);
            const updatedBooks = booksArray.map( (book, index) => {
                return {
                    ...book,
                    id: booksIds[index]
                }
            })
            setBooks(updatedBooks)

            console.log(updatedBooks)
        })
        .catch(err => console.log(err))}
    }, [])

    useEffect(() => {
        {axios.get("https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json")
        .then(res => {
            const booksArray = Object.values(res.data);
            const booksIds = Object.keys(res.data);
            const updatedBooks = booksArray.map( (book, index) => {
                return {
                    ...book,
                    id: booksIds[index]
                }
            })
            setBooks(updatedBooks)

            console.log(updatedBooks)
        })
        .catch(err => console.log(err))}
    }, [deleteEvent])


    const handleLogOut = async () => {
        setError("");

        try {
            await logout();
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const deleteBookHandler = (id) => {
        console.log(id);
        setLoading(false)
        axios.delete("https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books/" + id + ".json")
        .then( res => {
            console.log(res);
            setDeleteEvent(true)
        })
        .catch( err=> {
            console.log(err);
            setLoading(false)
        })
    }


    return(
        <>
        <button onClick={handleLogOut} className="btn btn-primary"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        <div className="py-5 text-right d-flex flex-wrap justify-content-center">
            {books &&
                books.map(book => (
                <div className="card w-25 m-1">
                    <div className="card-body d-flex flex-column">
                        <h3>{book.name}</h3>
                        <p 
                            style={{
                                marginBottom: 'auto',
                                textAlign: "right",
                                direction: "rtl"
                            }}
                        >
                            {book.text.slice(0, 30)+"..."}
                        </p>
                    </div>
                    <p className="pr-2"><strong>{book.auther}</strong></p>
                    <div className="card-footer d-flex justify-content-center">
                        <Link to={{pathname: "/edit", state: { id: book.id, name: book.name, auther: book.auther, text: book.text}}} class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></Link>
                        <button onClick={() => deleteBookHandler(book.id)} class="btn btn-sm btn-danger mx-2"><i class="fa fa-trash"></i></button>
                        <button class="btn btn-sm btn-success"><i class="fa fa-bookmark" aria-hidden="true"></i></button>
                    </div>
                </div>
            ))
                }
        </div>

        <div className="w-100 text-center">
            <Link disable={loading} to="/add-book" className="btn btn-primary">افزودن کتاب<i class="fa fa-plus-square ml-2" aria-hidden="true"></i></Link>
        </div>
        </>
    )
}