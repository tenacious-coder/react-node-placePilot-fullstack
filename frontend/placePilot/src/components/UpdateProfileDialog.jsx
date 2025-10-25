 import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <Modal show={open} onHide={() => setOpen(false)} centered>
            <Form onSubmit={submitHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                           
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder="Enter full name"
                        />
                    </Form.Group>

                     <Form.Group className="mb-3" controlId="email"> 
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                             
                            type="text"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="Short bio"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="skills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            
                            type="text"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="e.g. React, Node.js"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="file">
                        <Form.Label>Resume (PDF)</Form.Label>
                        <Form.Control
                            name="file"
                           
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {loading ? (
                        <Button variant="primary" className="w-100" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" variant="primary" className="w-100">
                            Update
                        </Button>
                    )}
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateProfileDialog