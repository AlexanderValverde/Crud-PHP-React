import React, { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

export function ApiUsers() {
  const baseUrl = "http://localhost:80/PHP/ApiPHP/";
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalInsert, setUserInsert] = useState(false);
  const [modalEdit, setUserEdit] = useState(false);
  const [modalDelete, setUserDelete] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [userSelected, setUserSelected] = useState({
    idUsuarios: "",
    nombreUsuario: "",
    emailUsuario: "",
    telfUsuario: "",
  });

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    console.log("Busqueda: " + e.target.value);
    
    const { name, value } = e.target;
    setUserSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(userSelected);
  };

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=dataUser.filter((elemento)=>{
      if(elemento.nombreUsuario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setData(resultadosBusqueda);
  }

  const openCloseUserInsert = () => {
    setUserInsert(!modalInsert);
  };

  const openCloseUserEdit = () => {
    setUserEdit(!modalEdit);
  };

  const openCloseUserDelete = () => {
    setUserDelete(!modalDelete);
  };

  const openCloseUserDetails = () => {
    setModalDetails(!modalDetails);
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setDataUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    var formData = new FormData();
    formData.append("nombreUsuario", userSelected.nombreUsuario);
    formData.append("emailUsuario", userSelected.emailUsuario);
    formData.append("telfUsuario", userSelected.telfUsuario);
    formData.append("METHOD", "POST");
    await axios
      .post(baseUrl, formData)
      .then((response) => {
        console.log(response.data);
        setData(data.concat(response.data));
        openCloseUserInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    var formData = new FormData();
    formData.append("nombreUsuario", userSelected.nombreUsuario);
    formData.append("emailUsuario", userSelected.emailUsuario);
    formData.append("telfUsuario", userSelected.telfUsuario);
    formData.append("METHOD", "PUT");
    await axios
      .post(baseUrl, formData, {
        params: { idUsuarios: userSelected.idUsuarios },
      })
      .then((response) => {
        var dataNew = data;
        dataNew.map((usuario) => {
          if (usuario.idUsuarios === userSelected.idUsuarios) {
            usuario.nombreUsuario = userSelected.nombreUsuario;
            usuario.emailUsuario = userSelected.emailUsuario;
            usuario.telfUsuario = userSelected.telfUsuario;
          }
        });
        setData(dataNew);
        openCloseUserEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    var formData = new FormData();
    formData.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, formData, {
        params: { idUsuarios: userSelected.idUsuarios },
      })
      .then((response) => {
        setData(
          data.filter(
            (usuario) => usuario.idUsuarios !== userSelected.idUsuarios
          )
        );
        openCloseUserDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectionUser = (usuario, estado) => {
    setUserSelected(usuario);
    if (estado === "Editar") {
      openCloseUserEdit();
    } else if (estado === "Detalle") {
      openCloseUserDetails();
    } else {
      openCloseUserDelete();
    }
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <br />

      <div class="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Búsqueda por Nombre"
          onChange={handleChange}
          value={busqueda}
        />
        <div class="input-group-append">
          <button class="btn btn-outline-success" type="button">
            <BiSearchAlt />
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => openCloseUserInsert()}
          >
            <MdPersonAddAlt1 /> Agregar Usuario
          </button>
        </div>
      </div>
      <br />
      <br />
      <table className="table table-responsive table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>TELEFONO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {dataUser && data.map((usuario) => (
            <tr key={usuario.idUsuarios}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.telfUsuario}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => selectionUser(usuario, "Detalle")}
                >
                  <IoEyeSharp />
                </button>
                {"    "}
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => selectionUser(usuario, "Editar")}
                >
                  <FiEdit2 />
                </button>
                {"    "}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => selectionUser(usuario, "Eliminar")}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL INSERTAR */}
      <Modal isOpen={modalInsert}>
        <ModalHeader>Insertar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombreUsuario"
              onChange={handleChange}
            />
            <br />
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="emailUsuario"
              onChange={handleChange}
            />
            <br />
            <label>Teléfono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telfUsuario"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            <MdPersonAddAlt1 /> Agregar Usuario
          </button>
          {"  "}
          <button
            className="btn btn-danger"
            onClick={() => openCloseUserInsert()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* MODAL DETALLE */}
      <Modal isOpen={modalDetails}>
        <ModalHeader>
          Detalle del Usuario {userSelected && userSelected.nombreUsuario}
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: {userSelected && userSelected.nombreUsuario}</label>
            <br />
            <br />
            <label>Email: {userSelected && userSelected.emailUsuario}</label>
            <br />
            <br />
            <label>Teléfono: {userSelected && userSelected.telfUsuario}</label>
            <br />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => openCloseUserDetails()}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal isOpen={modalEdit}>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombreUsuario"
              onChange={handleChange}
              value={userSelected && userSelected.nombreUsuario}
            />
            <br />
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="emailUsuario"
              onChange={handleChange}
              value={userSelected && userSelected.emailUsuario}
            />
            <br />
            <label>Teléfono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telfUsuario"
              onChange={handleChange}
              value={userSelected && userSelected.telfUsuario}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            <FiEdit2 /> Editar Usuario
          </button>
          {"  "}
          <button
            className="btn btn-danger"
            onClick={() => openCloseUserEdit()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal isOpen={modalDelete}>
        <ModalHeader>Eliminar Usuario</ModalHeader>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el usuario{" "}
          {userSelected && userSelected.nombreUsuario}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Eliminar
          </button>
          {"  "}
          <button
            className="btn btn-secondary"
            onClick={() => openCloseUserDelete()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
