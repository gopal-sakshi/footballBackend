const request = require('supertest');
const express = require('express');
const userRoutes = require('./z_users');
const baseURL = 'localhost:3050'
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('Users Route Testing', () => {
    it('test11', async()  => {
        const res = await request(app)                          // request(app)         vs      // request(baseURL)
            .get('/users/base23')
            .set('Content-Type', 'application/json')
            .send({name:'name12', password:'pass12'});
        expect(res.statusCode).toEqual(202)
        expect(res.text).toEqual('base23 path anta');
    });
});

describe("testing GET Todos23", () => {
    const newTodo1 = { id: 12, item: "Drink water", completed: false };
    const newTodo2 = { id: 13, item: "start eating", completed: false };
    beforeAll(async () => { 
        await request(baseURL).post("/users/todos").send(newTodo1); 
        await request(baseURL).post("/users/todos").send(newTodo2); 
    });
    afterAll(async () => { await request(baseURL).delete(`/users/todos`); });
    it("statusCode23 = 200", async () => {
        const response = await request(baseURL).get("/users/todos");
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(null);
        expect(response.body.data.length >= 1).toBe(true);
    });
    it("should return todos", async () => {
        const response = await request(baseURL).get("/users/todos/1");
        // console.log(response.body);
        expect(response.body.data).toBeDefined();
    });
});

// describe("POST /todo", () => {
//     const newTodo = { id: 14, item: "watch football", completed: false };
//     afterAll(async () => { await request(baseURL).delete(`/users/todos`) });
//     it("should add an item to todos array", async () => {
//         const response = await request(baseURL).post("/users/todos").send(newTodo);
//         // console.log(response.body);
//         const lastItem = response.body.data[response.body.data.length-1];
//         expect(response.statusCode).toBe(201);
//         expect(lastItem.item).toBe(newTodo["item"]);
//         expect(lastItem.completed).toBe(newTodo["completed"]);
//     });
// });