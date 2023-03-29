import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"

const Musica = () => {
    const dataMusicas = [
        { id: 1, nombre: "Luis Miguel", descripcion: "Luis Miguel Gallego Bastery nació el 19 de abril de 1970 en Puerto Rico y es una de las mejores voces masculinas de habla hispana. En 1982, con sólo 12 años de edad, grabó su primer álbum titulado Un Sol" },
        { id: 2, nombre: "Andres Calamaro", descripcion: "Andrés Calamaro es un cantante y compositor argentino de rock y pop. Nació el 22 de agosto de 1961. Integró el grupo de candombe-rock Raíces, luego formó parte de Los Abuelos de la Nada para quien compuso dos exitosos temas: Mil Horas y Sin Gamulán." }
    ];
    const [data, setData] = useState(dataMusicas);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);


    const [musicaSeleccionado, setMusicaSeleccionado] = useState({
        id: "",
        nombre: "",
        descripcion: "",
    });
    const seleccionarMusica = (elemento, caso) => {
        setMusicaSeleccionado(elemento);
        (caso === "Editar") ? setModalEditar(true) : setModalEliminar(true)
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setMusicaSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const editar = () => {
        var dataNueva = data;
        dataNueva.map(musica => {
            if (musica.id === musicaSeleccionado.id) {
                musica.descripcion = musicaSeleccionado.descripcion;
                musica.nombre = musicaSeleccionado.nombre;
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }

    const eliminar = () => {
        setData(data.filter(musica => musica.id !== musicaSeleccionado.id));
        setModalEliminar(false);
    }
    const abrirModalInsertar = () => {
        setMusicaSeleccionado(null);
        setModalInsertar(true);
    }
    const insertar = () => {
        var valorInsertar = musicaSeleccionado;
        valorInsertar.id = data[data.length - 1].id + 1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false)
    }

    return (
        <div className="mover">
            <button className="btn btn-success" style={{ left: "1cm" }} onClick={() => abrirModalInsertar()}>Insertar</button>
            <div className="remake">
                <div className="card border-dark  bg-secondary text-light" style={{ maxWidth: "25cm", left: "8cm" }}>
                    <div className="row">
                        {data.map((elemento, key) => (
                            <div key={key}>{elemento.id}
                                <div className="card-body">
                                    <div className="card-tittle">
                                        <strong style={{ textTransform: "uppercase" }}>{elemento.nombre}</strong>
                                    </div>
                                    <div className="col-7">
                                        <div className="card-body">
                                            <p className="card-text"><strong>{elemento.descripcion}</strong></p>
                                        </div>
                                        <div className="card-text">
                                            <button className="btn btn-primary" onClick={() => seleccionarMusica(elemento, "Editar")}>EDITAR</button>{" "}
                                            <button className="btn btn-danger" onClick={() => seleccionarMusica(elemento, "Eliminar")}>ELIMINAR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div><h3>Editar Musica</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input className="form-control" readOnlytype="text" name="id" value={musicaSeleccionado && musicaSeleccionado.id} />
                        <br />
                        <label>País</label>
                        <input className="form-control" type="text" name="nombre" value={musicaSeleccionado && musicaSeleccionado.nombre} onChange={handleChange} />
                        <br />

                        <label>Descripcion</label>
                        <input className="form-control" type="text" name="descripcion" value={musicaSeleccionado && musicaSeleccionado.descripcion} onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => editar()}>Actualizar</button>
                    <button className="btn btn-danger" onClick={() => setModalEditar(false)}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Estas seguro que deseas eliminar el musica {musicaSeleccionado && musicaSeleccionado.nombre}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>Si</button>
                    <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>No</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar Musica</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input className="form-control" readOnly type="text" name="id" value={data[data.length - 1].id + 1} />
                        <br />
                        <label>Musica</label>
                        <input className="form-control" type="text" name="nombre" value={musicaSeleccionado ? musicaSeleccionado.nombre : ''} onChange={handleChange} />
                        <br />
                        <label>Descripcion</label>
                        <input className="form-control" type="text" name="descripcion" value={musicaSeleccionado ? musicaSeleccionado.descripcion : ''} onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => insertar()}>Insertar</button>
                    <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Musica;