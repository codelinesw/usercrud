import React from 'react';
import {
 Link
} from  'react-router-dom';
import Swal from 'sweetalert2';

import routes from '../../Request/routes';
import { listUserforID, addUsers } from '../../Api/index';

export default class Addwithdb extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			id:0,
			code:'',
			names:'',
			lastnames:'',
			email:'',
			loadData:false
		};
	}

	componentDidMount(){
		this.setIdUser();
	}

	setIdUser(){
		let url = this.props.location;
		if(url.search){
			if(url.search !== null || url.search !== undefined || url.search !== ''){
				let id = url.search.split('=');
				if(id.length > 0){					
					if(!isNaN(parseInt(id[1]))){
						this.getData(id[1]);
					}
				}
			}
		}
	}

	getData(id_){
		let data = new FormData();
		data.append('id',id_);
		listUserforID(data)
		.then(res => {
			console.log(res);
			if(Array.isArray(res)){
				if(typeof res[0] === 'object'){
					if(!res[0].hasOwnProperty('response')){
						this.setState({
							id:res[0].id_user,
							code:res[0].u_code,
							names:res[0].u_names,
							lastnames:res[0].u_lastnames,
							email:res[0].u_email,
							loadData:true
						});
					}
				}
			}
		})
	}

	save(ev){

		ev.preventDefault();

		const { id , code, names, lastnames, email, loadData } = this.state;

		if(code.length === 0 && names.length === 0 && lastnames.length === 0 && email.length === 0){
			Swal.fire(
				'Upps!',
				'Debes de selecionar una hora para la cita para poder continuar!',
				'warning'
			);
		}else if(code.length === 0){
			Swal.fire(
				'Upps!',
				'Debes de ingresar una identificación y esta debe ser numerica para poder continuar!',
				'warning'
			);
		}else if(names.length === 0){
			Swal.fire(
				'Upps!',
				'Debes de ingresar tus nombre para poder continuar!',
				'warning'
			);
		}else if(lastnames.length === 0){
			Swal.fire(
				'Upps!',
				'Debes de ingresar tu apellido para poder continuar!',
				'warning'
			);			
		}else if(email.length === 0){
			Swal.fire(
				'Upps!',
				'Debes de ingresar un correo electronico para poder continuar!',
				'warning'
			);			
		}else{			
			const URL = this.state.loadData ? routes.update : routes.add ;
			console.log('ready for send ' , URL);
			let data = new FormData();
			if(this.state.loadData){
				data.append('id',id);
			}			
			data.append('code',code);
			data.append('names',names);
			data.append('lastnames',lastnames);
			data.append('email',email);
			addUsers(URL,data)
			.then(res => {
				console.log(res);
				if(res === 'success' || res === 'successfull'){
					let msg = this.state.loadData ? 'El usuario se ha actualizado correctamente' : 'El usuario se ha credo correctamente';
					Swal.fire(
						'Felicidades!',
						msg,
						'success'
					);
				}else{
					let msg = this.state.loadData ? 'No se ha podido actualizar este usuario por favor intentelo de nuevo mas tarde' : 'No se ha podido crear este usuario por favor intentelo de nuevo mas tarde';
					Swal.fire(
						'Error!',
						msg,
						'error'
					);
				}
			})
		}	
	}

	setContent = (ev) => {
		let id = ev.target.getAttribute('name'),
		text = ev.target.value,
		data = `[{"${id}":"${text}"}]`;
    	data = JSON.parse(data);
    	this.setState(data[0]);
	}

	render(){
		const { code , names, lastnames, email } = this.state;
		return(
			<div className='container-fluid d-flex justify-content-center'>
				<div className="w-100 d-block">
					<div className="row w-100 d-block mt-3 d-flex justify-content-center">
						<div className="w-90 d-flex justify-content-between">
							<h1 className="text-center ">Crea un usuario</h1>								
							<Link to="/indexwithdb/" className="btn btn-primary" style={{paddingTop:'11px',height:'52px'}}>Ver listado</Link>
						</div>
						<hr className="divider"/>
					</div>
					<div className="row w-100 d-flex justify-content-center mt-2">
						<div className="w-90">
							<div className="container-form">
								<form>
								  <div className="form-group">
								    <label htmlFor="exampleInputId"><b>Identificación</b></label>
								    <input type="text" className="form-control" id="InputNames" aria-describedby="IDHelp" name="code" placeholder="Ingresa tu numero de identificación" value={code || ''} onChange={this.setContent} />
								    <small id="InputID" className="form-text text-muted">El dato a ingresar debe ser numerico</small>
								  </div>
								  <div className="form-group">
								    <label htmlFor="exampleInputName"><b>Nombre Completo</b></label>
								    <input type="text" className="form-control" id="InputNames" aria-describedby="NameHelp" name="names" placeholder="Ingresa tus nombres" value={names || ''} onChange={this.setContent}/>								    
								  </div>
								  <div className="form-group">
								    <label htmlFor="exampleInputLastnames"><b>Apellidos</b></label>
								    <input type="text" className="form-control" id="InputLastNames" aria-describedby="LastNameHelp" name="lastnames" placeholder="Ingresa tus apellidos" value={lastnames || ''} onChange={this.setContent} />								    
								  </div>
								  <div className="form-group">
								    <label htmlFor="exampleInputemail"><b>Correo electronico</b></label>
								    <input type="text" className="form-control" id="Inputemail" aria-describedby="emailHelp" name="email" placeholder="Ingresa tus correo electronico" value={email || ''} onChange={this.setContent} />								    
								  </div>
								  <div className="form-group mt-3">
								  	<button type="button" className="btn btn-success" onClick={(ev) => this.save(ev)}>Guardar Cambios</button>
								  </div>								  								  								  
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}