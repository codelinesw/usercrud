import React from 'react';
import {
 Link
} from  'react-router-dom';
import Swal from 'sweetalert2';

//import the components
import Modal from '../../Components/Modal';
import { listUsers, deleteUser } from '../../Api/index';

export default class Indexwithdb extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			id:0,
			names:'',
			data:['']
		};
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		listUsers()
		.then(res => {
			if(Array.isArray(res)){
				if(typeof res[0] === 'object'){
					if(!res[0].hasOwnProperty('response')){
						this.setState({data:res});
					}
				}
			}
		});
	}

	renderItems(item, index){
		if(item === '' || (item === undefined || typeof item === 'undefined') || item === null){
			return <tr key={(index+1)}><td>Aun no existe ningun usuario</td></tr>;
		}else{
			return(
				<tr key={(index+1)}>
					<th scope="row">{(index+1)}</th>
					<td>{item.u_code}</td>
					<td>{item.u_names}</td>
					<td>{item.u_lastnames}</td>
					<td>{item.u_email}</td>
					<td>
						<div className="btn-group">
							<Link to={`/addwithdb/?user=${item.id_user}`} className="btn btn-warning">Editar</Link>
							<button type="button" className="btn btn-danger" onClick={(ev) => this.showForDelete(ev,item,index)}>Eliminar</button>
						</div>
					</td>
				</tr>
			);
		}
	}

	clearData = () => {
		this.setState({id:0,names:''});
	}

	delete = (ev) => {
		ev.preventDefault();
		const { id } = this.state;
		console.log('delete this user');
		if(id.length === 0 || (id === 0 || id === '0')){
			Swal.fire(
				'Upps!',
				'Debes de selecionar primero el usuario que deseas eliminar',
				'warning'
			);
		}else{
			let data = new FormData();
			data.append('id',id);
			deleteUser(data)
			.then(res => {
				console.log('this is response to ws:: ' , res);
				if(res === 'success' || res === 'successfull'){
					const { data , index } = this.state;
					if(data.length > 0){						
						let currentData = data;
						console.log('data complete ', currentData);
						currentData.splice(index,1);
						console.log('currentdata' , currentData);
						this.hideModal('#modaluser');
						this.setState({data:currentData,index:0,id:0});
					}
					Swal.fire(
						'Felicidades!',
						'El usuario se ha eliminado correctamente',
						'success'
					);
				}else{
					Swal.fire(
						'Error!',
						'No se ha podido eliminar este usuario por favor intentelo de nuevo mas tarde',
						'error'
					);
				}
			});
		}

	}

	showModal(ev,ElementID){
		//console.log('ID ELEMENT:: ', ElementID);
		document.getElementById(ElementID).style = "display: block;";
		document.getElementById(ElementID).classList.add('dark');
		setTimeout(() => document.getElementById(ElementID).className = 'modal fade dark show',200);
	}

	hideModal(idElement){
		setTimeout(() => document.getElementById(idElement).className = 'modal fade',300);
		setTimeout(() => {
			document.getElementById(idElement).style = "display: none; padding-right: 0px;";
		},400);
	}	

	showForDelete(ev,item,index){
		ev.preventDefault();
		console.log('this is user to delete:: ', item.u_names);
		this.setState({
			names:item.u_names,
			id:item.id_user,
			index:index
		});
		this.showModal(ev,'#modaluser');
	}	

	render(){

		const { data, names } = this.state;

		return(
			<div className='container-fluid d-flex justify-content-center'>
				<div className="w-100 d-block">
					<div className="row w-100 d-block mt-3 d-flex justify-content-center">
						<div className="w-90 d-flex justify-content-between">
						    <Link to="/" className="btn btn-secondary" style={{paddingTop:'11px',height:'52px'}}><i className="fas fa-arrow-left ml-2 mr-2"></i> Regresar al Home</Link>
							<h1 className="text-center ">Listado de usuarios</h1>								
							<Link to="/addwithdb/" className="btn btn-primary" style={{paddingTop:'11px',height:'52px'}}>+ Agregar nuevo usuario</Link>
						</div>
						<hr className="divider"/>
					</div>
					<div className="row w-100 d-flex justify-content-center mt-2">
						<div className="w-90">
							<table className="table m-auto">
							  <thead>
							    <tr>
							      <th scope="col">#</th>
							      <th scope="col">Identificacion</th>
							      <th scope="col">Nombre</th>
							      <th scope="col">Apellido</th>
							      <th scope="col">email</th>
							      <th scope="col">Acciones</th>
							    </tr>
							  </thead>
							  <tbody>
							   	{data.length === 0 ? <tr><td>Aun no existe ningun usuario</td></tr> : data.map((item , index) => {
							   		return this.renderItems(item , index);
							   	})}
							  </tbody>
							</table>
						</div>
					</div>
				</div>
				<Modal
					idElement="#modaluser"
					clearData={this.clearData}
					delete_={this.delete}
					name={names}
				/>				
			</div>
		);
	}
}