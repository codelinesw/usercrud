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
			id:'',
			names:'',
			data:['']
		};
	}

	componentDidMount(){
		this.getData();
	}

	parseJson(data){
		try{
			let newdata = JSON.parse(data);
			return true;
		}catch(e){
			return false;
		}
	}
	getData(){
		let data = localStorage.getItem('userscrud');
		if(data){
			if(data !== null || data !== undefined || data !== 'undefined' || (typeof data !== 'object' || typeof data !== 'Object')){
					if(this.parseJson(data)){
						data = JSON.parse(data);
						if(Array.isArray(data)){
							if(typeof data[0] === 'object' || typeof data[0] === 'Object'){
								this.setState({data:data});
							}
						}
					}
			}
		}
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
							<Link to={`/addwithoutdb/?user=${index}`} className="btn btn-warning">Editar</Link>
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
		const { id, data } = this.state;
		console.log('delete this user');
		if(id.length === 0 || id === '' || typeof id === 'undefined'){
			Swal.fire(
				'Upps!',
				'Debes de selecionar primero el usuario que deseas eliminar',
				'warning'
			);
		}else{
			let currentData = data;
			console.log('data complete ', currentData);
			currentData.splice(id,1);
			localStorage.setItem('userscrud',JSON.stringify(currentData));
			console.log('currentdata' , currentData);
			Swal.fire(
				'Felicidades!',
				'El usuario se ha eliminado correctamente',
				'success'
			);
			this.hideModal('#modaluser');			
			this.setState({data:currentData,id:0});

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
		console.log('this is user to delete:: ', index);
		this.setState({
			names:item.u_names,
			id:index
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
							<Link to="/addwithoutdb/" className="btn btn-primary" style={{paddingTop:'11px',height:'52px'}}>+ Agregar nuevo usuario</Link>
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