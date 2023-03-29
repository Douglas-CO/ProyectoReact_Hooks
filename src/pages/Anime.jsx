import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"

const Anime = () => {
    const dataAnimes = [
        { id: 1, nombre: "Dragon Ball Z", descripcion: "Dragon Ball Z continúa las aventuras de Son Goku en su vida adulta mientras él y sus compañeros defienden la Tierra contra villanos, incluidos extraterrestres (Vegeta, Freezer), androides (Cell) y criaturas mágicas (Majin Buu)." },
        { id: 2, nombre: "Naruto", descripcion: "Naruto es un niño huérfano,que fue odiado desde pequeño por llevar adentro al Kyubi , al crecer se vuelve un ninja de konoha y es integrante del equipo 7 ,con en tiempo se vuelve el mejor ninja y al fin es amado por todos y se vuelve hokage." }
    ];
    const [data, setData] = useState(dataAnimes);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);


    const [animeSeleccionado, setAnimeSeleccionado] = useState({
        id: "",
        nombre: "",
        descripcion: "",
    });
    const seleccionarAnime = (elemento, caso) => {
        setAnimeSeleccionado(elemento);
        (caso === "Editar") ? setModalEditar(true) : setModalEliminar(true)
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setAnimeSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const editar = () => {
        var dataNueva = data;
        dataNueva.map(anime => {
            if (anime.id === animeSeleccionado.id) {
                anime.descripcion = animeSeleccionado.descripcion;
                anime.nombre = animeSeleccionado.nombre;
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }

    const eliminar = () => {
        setData(data.filter(anime => anime.id !== animeSeleccionado.id));
        setModalEliminar(false);
    }
    const abrirModalInsertar = () => {
        setAnimeSeleccionado(null);
        setModalInsertar(true);
    }
    const insertar = () => {
        var valorInsertar = animeSeleccionado;
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
                                            <button className="btn btn-primary" onClick={() => seleccionarAnime(elemento, "Editar")}>EDITAR</button>{" "}
                                            <button className="btn btn-danger" onClick={() => seleccionarAnime(elemento, "Eliminar")}>ELIMINAR</button>
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
                    <div><h3>Editar Anime</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input className="form-control" readOnlytype="text" name="id" value={animeSeleccionado && animeSeleccionado.id} />
                        <br />
                        <label>País</label>
                        <input className="form-control" type="text" name="nombre" value={animeSeleccionado && animeSeleccionado.nombre} onChange={handleChange} />
                        <br />

                        <label>Descripcion</label>
                        <input className="form-control" type="text" name="descripcion" value={animeSeleccionado && animeSeleccionado.descripcion} onChange={handleChange} />
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
                    Estas seguro que deseas eliminar el anime {animeSeleccionado && animeSeleccionado.nombre}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>Si</button>
                    <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>No</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar Anime</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input className="form-control" readOnly type="text" name="id" value={data[data.length - 1].id + 1} />
                        <br />
                        <label>Anime</label>
                        <input className="form-control" type="text" name="nombre" value={animeSeleccionado ? animeSeleccionado.nombre : ''} onChange={handleChange} />
                        <br />
                        <label>Descripcion</label>
                        <input className="form-control" type="text" name="descripcion" value={animeSeleccionado ? animeSeleccionado.descripcion : ''} onChange={handleChange} />
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

export default Anime;