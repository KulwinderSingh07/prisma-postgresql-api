import supertest from "supertest"
import createServer from "./server.js"
const app=createServer()
const request=supertest(app)
describe("User operation tests",()=>{
    test('signup', async() => {
    const response=await request.get("/post/specific/acb37df5-bdc0-4d0b-b8ed-fd72e7fab99c")
    console.log(response.data)
    // expect(response.status).to.equal(200);
    })
})

// describe("User",()=>{
//     it("first run",()=>{
//         expect(true).toBe(true)
//     })
// })