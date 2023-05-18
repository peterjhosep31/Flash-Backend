import connectionDB from "../../config/dataBase/dataBase.js";

const controllerSesionCustomer = {};

controllerSesionCustomer.updateData = async (req, res) => {
  // let emailUser = req.user.emailUser;
  // let name = (req.body.data.name) ? req.body.data.name : 'anonymous';
  // let email = (req.body.data.email) ? req.body.data.email : null;
  // let phone = (req.body.data.phone) ? req.body.data.phone : null;
  // let address = (req.body.data.address) ? req.body.data.address : null;
console.log(req.body);
console.log(req.files);

};

controllerSesionCustomer.deleteCount = async (req, res) => {

};

controllerSesionCustomer.getData = async (req, res) => {
  connectionDB.query("SELECT * FROM customer WHERE email_customer  =?", [req.user.emailUser], (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Error",
        data: err,
      });
    } else {
      res.status(200).json({
        message: "Success",
        rows 
      });
    }
  })
};

controllerSesionCustomer.getShopping = async (req, res) => {

};



export default controllerSesionCustomer;