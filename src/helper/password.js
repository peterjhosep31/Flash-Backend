const password = {};

password.storePassword = () => {
  // crear una funcion ramdom de 6 carateres
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}; 

password.recoverUser = () => {
  const characters = "1234567890";
  let codeRecover = "";
  for (let i = 0; i < 4; i++) {
    codeRecover += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return codeRecover;
}

export default password;