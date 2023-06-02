import axios from "axios";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = { username, password };
    try {
      const res = await axios.post("https://service-frontend-tic-tac-toe.onrender.com/api/v1/auth/signin", credentials);
      const token = res.data.data.token;
      localStorage.setItem("jwt-token", token);
      console.log(localStorage.getItem("jwt-token"));
      navigate("/");
    } catch (error) {
      toast.error("Falló: " + error.message);
    }
  };

  return (
    <>
      <Row className="justify-content-md-center pt-5">
        <ToastContainer />
        <Col lg={3} md={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control value={username} type="username" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control value={password} type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
