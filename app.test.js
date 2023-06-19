import supertest from "supertest"
import createServer from "./server.js"
const app=createServer()
const request=supertest(app)
describe.skip("User operation tests",()=>{

    test("signup",async()=>{
        const {body,statusCode}=await request.post("/user/signup").send(
            {
                "name":"Kulwe",
                "email":"ladia202@gmail.com",
                "password":"1234"
            }
        )
        expect(statusCode).toBe(200)
        expect(body).toEqual(
            {
                "id": expect.any(String),
                "name":"Kulwe",
                "email":"ladia202@gmail.com",
                "password": expect.any(String)
            }
        )
    })

    test("signin",async()=>{
        const {body,statusCode}=await request.post("/user/signin").send(
            {
                "email":"laddiaulakh2002@gmail.com",
                "password":"1234"
            }
        )
        expect(statusCode).toBe(200)
        expect(body).toEqual({
            "message": "Loged in"
        })
    })

    test("updateUser",async()=>{
        const {body,statusCode}=await request.patch("/user/update").send({
            "email":"kulwinderkh2002@gmail.com"
        }).set("Cookie",["loged=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNzAyOTdiZTgtMWFmYy00ODA3LWIxYzUtNzBjZjMyMDY4YWFkIiwiaWF0IjoxNjg3MTk3NTM1fQ.DhkFsTE2EQnPo29h7eaqwyuxmkwvfGgZyW3aprcv3gM"])
        expect(body).toEqual({
            message:"updated"
        })
        expect(statusCode).toBe(200)

    })

    test('getspecific poost', async() => {
    const {body,statusCode}=await request.get("/post/specific/acb37df5-bdc0-4d0b-b8ed-fd72e7fab99c")
    expect(statusCode).toBe(200);
    expect(body).toEqual(
        {
            "id": "acb37df5-bdc0-4d0b-b8ed-fd72e7fab99c",
            "authorId": "75c20d19-411a-4d11-bb11-8ae810794677",
            "title": "The sacred hear",
            "body": "This is  a demo post 1",
            "Publisher": "Arihant",
            "createdAt": "2023-06-18T20:12:41.069Z"
        }
    )
    })
})

describe("Post operation tests", ()=>{
    test("post creation",async ()=>{
        const {body,statusCode}=await request.post("/post/create").send({
            "title":"Anarchy",
            "body":"This is  a demo post 2 title ananrchy"
        }).set("Cookie",["loged=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNzAyOTdiZTgtMWFmYy00ODA3LWIxYzUtNzBjZjMyMDY4YWFkIiwiaWF0IjoxNjg3MTk3NTM1fQ.DhkFsTE2EQnPo29h7eaqwyuxmkwvfGgZyW3aprcv3gM"])
        expect(statusCode).toBe(200)
        expect(body).toEqual(
            {
                "id": expect.any(String),
                "authorId": expect.any(String),
                "title": "Anarchy",
                "body": "This is  a demo post 2 title ananrchy",
                "Publisher": expect.any(String),
                "createdAt": expect.any(String)
            }
        )
    })
    test("get specific post",async()=>{
        const {body,statusCode}=await request.get("/post/specific/8e23f59e-1786-483f-9fa1-100879f8c8ba")
        console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toEqual(
            {
                "id": expect.any(String),
                "authorId": expect.any(String),
                "title": expect.any(String),
                "body": expect.any(String),
                "Publisher": expect.any(String),
                "createdAt": expect.any(String)
            }
        )
    })
    test("delete specific post",async()=>{
        const {body,statusCode}=await request.delete("/post/delete/40ebb1ea-1412-4019-a948-bc4d8cc6ebb1")
        expect(statusCode).toBe(200)
        expect(body).toEqual(
            {
                "id": expect.any(String),
                "authorId": expect.any(String),
                "title": expect.any(String),
                "body": expect.any(String),
                "Publisher": expect.any(String),
                "createdAt": expect.any(String)
            }
        )
})
})