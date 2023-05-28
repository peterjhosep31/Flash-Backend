import coonectionDB from "../../config/dataBase/dataBase.js";

const controllerSesionEmpleyoee = {};

controllerSesionEmpleyoee.updateData = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  let emialUser = req.user.emialUser;
  let data = req.body.data;


}

controllerSesionEmpleyoee.getData = (req, res) => {
  coonectionDB.query("SELECT * FROM employee WHERE ")
}


export default controllerSesionEmpleyoee;