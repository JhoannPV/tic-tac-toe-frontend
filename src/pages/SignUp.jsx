import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const resetFields = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = { username, password, email, role };
    try {
      const created_user = await axios.post("https://service-frontend-tic-tac-toe.onrender.com/api/v1/auth/signup", user);
      if (created_user) {
        toast.success("Usuario registrado!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            resetFields();
          },
        });
      }
    } catch (error) {
      toast.error("Falló: " + error.message);
    }
  };

  return (
    <Row className="justify-content-md-center pt-5">
      <ToastContainer />
      <Col lg={4}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control value={username} name="username" type="username" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control value={password} name="password" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>Rol</Form.Label>
              <Form.Select value={role} defaultValue="Selecciona..." onChange={(e) => setRole(e.target.value)}>
                <option value="">Selecciona...</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
