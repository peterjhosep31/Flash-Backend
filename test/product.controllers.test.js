import product from "../src/controllers/product.controllers.js";
import superTest from "supertest";

const request = superTest("http://localhost:3105/products");

describe("Product Controller Test", () => {
  describe("Test product path request true", () => {
    describe("GET request all", () => {
      describe("GET /productsConsultation", () => {
        test('should reply with status 200',  () => {
          const response =  request.get("/productsConsultation");
          expect(response.statusCode).toBe(200)
          expect(response.body).toBeInstanceOf(Object)
          expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        })
      })

      describe("GET /getProductsStore", () => {
        test("should reply with status 200", () => {
          const response = request.get('/getProductsStore')
          .set()
        })
      })

    })

    describe("")

  });


});


