import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"

const Juegos = () => {
    const dataJuegos = [
        { id: 1, nombre: "God Of War", descripcion: "Se basa en las aventuras de un semidiós espartano, Kratos, quien se enfrenta a diversos personajes de la mitología griega y nórdica, tanto héroes como (Heracles, Teseo, Perseo, etc.)" },
        { id: 2, nombre: "Resident Evil", descripcion: "¿Cuál es la historia de Resident Evil Village? Ethan llega a una aldea cercana que está siendo atacada por criaturas mutantes parecidas a hombres lobo, conocidas como licántropos. Al escapar de una masacre, Ethan es capturado por la deidad del pueblo, la Madre Miranda, y sus cuatro jerarcas: Alcina Dimitrescu, Donna Beneviento, Salvatore Moreau y Karl Heisenberg" }
    ];
    const [data, setData] = useState(dataJuegos);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);


    const [juegosSeleccionado, setJuegosSeleccionado] = useState({
        id: "",
        nombre: "",
        descripcion: "",
    });
    const seleccionarJuegos = (elemento, caso) => {
        setJuegosSeleccionado(elemento);
        (caso === "Editar") ? setModalEditar(true) : setModalEliminar(true)
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setJuegosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const editar = () => {
        var dataNueva = data;
        dataNueva.map(juegos => {
            if (juegos.id === juegosSeleccionado.id) {
                juegos.descripcion = juegosSeleccionado.descripcion;
                juegos.nombre = juegosSeleccionado.nombre;
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }

    const eliminar = () => {
        setData(data.filter(juegos => juegos.id !== juegosSeleccionado.id));
        setModalEliminar(false);
    }
    const abrirModalInsertar = () => {
        setJuegosSeleccionado(null);
        setModalInsertar(true);
    }
    const insertar = () => {
        var valorInsertar = juegosSeleccionado;
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
                                            <button className="btn btn-primary" onClick={() => seleccionarJuegos(elemento, "Editar")}>EDITAR</button>{" "}
                                            <button className="btn btn-danger" onClick={() => seleccionarJuegos(elemento, "Eliminar")}>ELIMINAR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal isOpen={modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Juegos</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>ID</label>
                            <input className="form-control" readOnlytype="text" name="id" value={juegosSeleccionado && juegosSeleccionado.id} />
                            <br />
                            <label>País</label>
                            <input className="form-control" type="text" name="nombre" value={juegosSeleccionado && juegosSeleccionado.nombre} onChange={handleChange} />
                            <br />

                            <label>Descripcion</label>
                            <input className="form-control" type="text" name="descripcion" value={juegosSeleccionado && juegosSeleccionado.descripcion} onChange={handleChange} />
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
                        Estas seguro que deseas eliminar el juegos {juegosSeleccionado && juegosSeleccionado.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => eliminar()}>Si</button>
                        <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>No</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Juegos</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>ID</label>
                            <input className="form-control" readOnly type="text" name="id" value={data[data.length - 1].id + 1} />
                            <br />
                            <label>Juegos</label>
                            <input className="form-control" type="text" name="nombre" value={juegosSeleccionado ? juegosSeleccionado.nombre : ''} onChange={handleChange} />
                            <br />
                            <label>Descripcion</label>
                            <input className="form-control" type="text" name="descripcion" value={juegosSeleccionado ? juegosSeleccionado.descripcion : ''} onChange={handleChange} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => insertar()}>Insertar</button>
                        <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default Juegos;