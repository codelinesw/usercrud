import React from 'react';
const hideModal = (ev,idElement,clearData) => {
	ev.preventDefault();
	setTimeout(() => document.getElementById(idElement).className = 'modal fade',300);
	setTimeout(() => {
		document.getElementById(idElement).style = "display: none; padding-right: 0px;";
		clearData();
	},400);
}

const Modal = ({ idElement, delete_, clearData, name }) => {
	return(
			<div className="modal fade position-relative" id="#modaluser" tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
						    <h5 className="modal-title">Elimine una tienda</h5>
						    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(ev) => hideModal(ev,idElement,clearData)}>
						          <span aria-hidden="true">&times;</span>
						    </button>
						</div>
						<div className="modal-body">
						    <p>¿Esta seguro que desea eliminar el usuario <b>{name}</b>?</p>
						</div>
						<div className="modal-footer">
						    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(ev) => hideModal(ev,idElement,clearData)}>Cancelar</button>
						    <button type="button" className="btn btn-primary" onClick={(ev) => delete_(ev)}>Continuar</button>
						</div>
						<div className="container_circle_preloader preloader-hidden">
							<div className="child_container_">
								<div className="circle">
									<div className="child">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}


export default Modal;