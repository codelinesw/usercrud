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

	parseJson(data){
		try{
			let newdata = JSON.parse(data);
			return true;
		}catch(e){
			return false;
		}
	}

	getData(id_){
		let data = localStorage.getItem('userscrud');
		if(data){
			if(data !== null || data !== undefined || data !== 'undefined' || (typeof data !== 'object' || typeof data !== 'Object')){				
				if(this.parseJson(data)){
					data = JSON.parse(data);
					if(Array.isArray(data)){
						if(typeof data[0] === 'object' || typeof data[0] === 'Object'){
							this.setState({
								id:id_,
								code:data[id_].u_code,
								names:data[id_].u_names,
								lastnames:data[id_].u_lastnames,
								email:data[id_].u_email,
								loadData:true
							});
						}
					}
				}
			}
		}

	}

	addUser(obj){
		let currentData = localStorage.getItem('userscrud');
		console.log(typeof currentData !== 'string');
		if(currentData){			
			if(currentData !== null || currentData !== undefined || typeof currentData !== 'undefined' || typeof currentData !== 'string'){
				console.log('adding up');
				if(this.parseJson(currentData)){
					currentData = JSON.parse(currentData);
					if(Array.isArray(currentData)){
						if(currentData.length > 0){
							let newdata = currentData;
							console.log('data for new add ', newdata);
							newdata.push(obj);
							localStorage.setItem('userscrud',JSON.stringify(newdata));
							Swal.fire(
								'Felicidades!',
								'El usuario se ha creado correctamente',
								'success'
							);						
						}else{
							console.log('adding up else length');
						}
					}else{
						console.log('adding up else array');
					}
				}else{
					console.log('agrego uno nuevo');
					let newdata = JSON.stringify([obj]);
					localStorage.setItem('userscrud',newdata);
					Swal.fire(
						'Felicidades!',
						'El usuario se ha creado correctamente',
						'success'
					);
				}			
			}else{
				console.log('adding up else');
			}
		}
	}

	updateUser(obj){
		let currentData = localStorage.getItem('userscrud');
		console.log('updating...', currentData);
		if(currentData){
			if(currentData !== null || currentData !== undefined || typeof currentData !== 'undefined'){
				currentData = JSON.parse(currentData);
				if(Array.isArray(currentData)){
					if(currentData.length > 0){
						let newdata = currentData;
						newdata[this.state.id] = obj;
						localStorage.setItem('userscrud',JSON.stringify(newdata));
						Swal.fire(
							'Felicidades!',
							'El usuario se ha actualizado correctamente',
							'success'
						);						
					}
				}
			}
		}
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
			if(!this.state.loadData){
				let user = {u_code:code,u_names:names,u_lastnames:lastnames,u_email:email};
				this.addUser(user);
			}else{
				let user = {u_code:code,u_names:names,u_lastnames:lastnames,u_email:email};
				this.updateUser(user);
			}
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
							<Link to="/indexwithoutdb/" className="btn btn-primary" style={{paddingTop:'11px',height:'52px'}}>Ver listado</Link>
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