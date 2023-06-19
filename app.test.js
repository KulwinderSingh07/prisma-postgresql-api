import supertest from "supertest"
import createServer from "./server.js"
const app=createServer()
const request=supertest(app)
describe("User operation tests",()=>{

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

    test('getspecific User', async() => {
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