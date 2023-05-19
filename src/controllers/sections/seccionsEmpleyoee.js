import coonectionDB from "../../config/dataBase/dataBase.js";

const controllerSesionEmpleyoee = {};

controllerSesionEmpleyoee.updateData = (req, res) => {
  let emialUser = req.user.emialUser;


}

controllerSesionEmpleyoee.getData = (req, res) => {
  coonectionDB.query("SELECT * FROM employee WHERE ")
}


export default controllerSesionEmpleyoee;