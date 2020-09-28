import React from 'react';
import {
 Link
} from  'react-router-dom';



export default class List extends React.Component{

	constructor(props){
		super(props);
		this.state = {

		};
	}

	render(){
		return(
			<div className='container-fluid d-flex justify-content-center'>
				<div className="w-100 d-block">
					<div className="row w-100 d-flex justify-content-center mt-3">
						<h1 className="text-center ">CRUD de usuarios</h1>
						<hr className="divider"/>
					</div>
					<div className="row w-100 d-flex justify-content-center mt-2">
						<div className="d-flex">
							<Link to="/indexwithoutdb/" className="btn btn-outline-secondary mr-3">REALIZAR PRUEBA CON LOCALSTORAGE</Link>
							<Link to="/indexwithdb/" className="btn btn-secondary">REALIZAR PRUEBA CON BASE DE DATOS</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}