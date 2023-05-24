import product from "../src/controllers/product.controllers.js";
import superTest from "supertest";

const request = superTest("http://localhost:3105/products");

describe("Product Controller Test", () => {
  describe("GET request all", () => {
    describe("GET /productsConsultation", () => {
      test('should reply with status 200', async () => {
        const response = await request.get("/productsConsultation");
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
      });
    });
    describe("GET /getProductsStore", () => {
      test("should reply with status 403", async () => {
        const response = await request.get('/getProductsStore')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYmVybXVkZXpsb3BlenBlZHJvam9zZUBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjoiYWRtaW5pc3RyYWRvciJ9LCJpYXQiOjE2ODQ4NTI1MDMsImV4cCI6MTY4NDkzODkwM30.XMjawHoKlpfVHC_TmxHyy5uk_1nQvpfQEgkKYiyyHAM');
        expect(response.statusCode).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
      test("should reply with status 200", async () => {
        const response = await request.get('/getProductsStore')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZG9uX2p1YW5fb3J0b0BmbGFzaC5jb20iLCJwZXJtaXNzaW9uIjoiZW1wbGVhZG8ifSwiaWF0IjoxNjg0ODU1MzAwLCJleHAiOjE2ODQ5NDE3MDB9.NBCSugz6bavLpZ9L4YdOxkJhbJiBvtbdBLL_1zXLnV4')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
      });
    });
  })

  describe("POST request", () => {
    describe("POST /addProducts", () => {
      let data =
      {
        'data[name]': "Testing",
        'data[description]': ""
      }


      test("should reply with status 500", async () => {
        const response = await request.post('/addProducts')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZG9uX2p1YW5fb3J0b0BmbGFzaC5jb20iLCJwZXJtaXNzaW9uIjoiZW1wbGVhZG8ifSwiaWF0IjoxNjg0ODU1MzAwLCJleHAiOjE2ODQ5NDE3MDB9.NBCSugz6bavLpZ9L4YdOxkJhbJiBvtbdBLL_1zXLnV4')
        expect(response.statusCode).toBe(500)
      });
      test("should reply with status 403", async () => {
        const response = await request.post('/addProducts')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYmVybXVkZXpsb3BlenBlZHJvam9zZUBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjoiYWRtaW5pc3RyYWRvciJ9LCJpYXQiOjE2ODQ4NTI1MDMsImV4cCI6MTY4NDkzODkwM30.XMjawHoKlpfVHC_TmxHyy5uk_1nQvpfQEgkKYiyyHAM', data);
        expect(response.statusCode).toBe(403)
      })
    })
  });

});


