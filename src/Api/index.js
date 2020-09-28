

import routes from '../Request/routes';


const addUsers = (URL,obj) => {
	return fetch(URL,
      { 
        method:'POST',
        body:obj
      }
    ).then(res => res.text())
};

const listUsers = (obj) => {
	return fetch(routes.list,
      { 
        method:'POST'
      }
    ).then(res => res.json())
};

const listUserforID = (obj) => {
	return fetch(routes.listId,
      { 
        method:'POST',
        body:obj
      }
    ).then(res => res.json())
};



const editUser = (obj) => {
	return fetch(routes.edit,{ 
        method:'POST',
        body:obj
      }
    ).then(res => res.json())
};


const deleteUser = (obj) => {
	return fetch(routes.delete,{ 
        method:'POST',
        body:obj
      }
    ).then(res => res.text())
};


export {
	addUsers,
	listUsers,
	listUserforID,
	editUser,
	deleteUser
};

