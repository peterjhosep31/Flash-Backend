import coonectionDB from "../../config/dataBase/dataBase.js";

const controllerSesionEmpleyee = {};

controllerSesionEmpleyee.getData = (req, res) => {
  let idStore = req.user.idUser;
  coonectionDB.query("SELECT * FROM employee WHERE id_store = ?", [idStore], (err, rows) => {
    if (!err && rows.length > 0) {
      return res.status(200).send({
        mensaje: "Mostrando datos del empleado",
        data: rows
      });
    } else {
      return res.status(404).send({
        mensaje: "Error al mostrar los datos del empleado"
      });
    }
  })
}


export default controllerSesionEmpleyee;