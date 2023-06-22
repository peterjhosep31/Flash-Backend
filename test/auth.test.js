import superTest from "supertest";
import app from "../src/index.js";

const request = superTest("http://localhost:3105/");

describe("Auth Controller Test", () => {

  describe("POST /signUpCustomer", () => {
    /*
    test("should return 200 and success message when user is registered successfully", async () => {
      const requestBody = {
        data: {
          nameUser: "John Doe",
          email: "johndo@example.com",
          password: "password123",
        },
      };

      const response = await request.post("authUser/signUpCustomer").send(requestBody);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ mensaje: "Usuario registrado con exito" });
    }, 10000);
    */
    /*
        test("should return 404", async () => {
          const response = await request.post("stores/consultationStore/10");
          expect(response.body).toBeInstanceOf(Object)
          expect(response.statusCode).toBe(200);
        }, 10000);
    */
    /*
     test("should return 404", async () => {
       const response = await request.post("stores/getDataStore")
         .send('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiRnJpc2J5X0ItNEBmbGFzaC5jb20iLCJpZFVzZXIiOjU5LCJwZXJtaXNzaW9uIjoiZW1wbGVhZG8ifSwiaWF0IjoxNjg2NzUxNDQ3LCJleHAiOjE2ODY4Mzc4NDd9.ZefUc_UgBbJU8ZxXm0YeeiGgzL7Z_Ems27tyTsNEur0')
       expect(response.body).toBeInstanceOf(Object)
       expect(response.statusCode).toBe(200);
     }, 10000);
    */
  });

});
