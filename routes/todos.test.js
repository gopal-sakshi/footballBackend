const request = require('supertest');
const express = require('express');
const todoRoutes = require('./todos');
const baseURL = 'localhost:3050'
const app = express();
app.use(express.json());
app.use('/todos23', todoRoutes);

describe('todos Route Testing', () => {
    it('test11', async()  => {
        const res = await request(app)                          // request(app)         vs      // request(baseURL)
            .get('/todos23/base23')
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
        await request(baseURL).post("/todos23/todos").send(newTodo1); 
        await request(baseURL).post("/todos23/todos").send(newTodo2); 
    });

    afterAll(async () => { await request(baseURL).delete(`/todos23/todos`); });

    it("statusCode23 = 200", async () => {
        const response = await request(baseURL).get("/todos23/todos");
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(null);
        expect(response.body.data.length >= 1).toBe(true);
    });

    it("should return todos", async () => {
        const response = await request(baseURL).get("/todos23/todos/1");
        // console.log(response.body);
        expect(response.body.data).toBeDefined();
    });
});

// describe("POST /todo", () => {
//     const newTodo = { id: 14, item: "watch football", completed: false };
//     afterAll(async () => { await request(baseURL).delete(`/todos/todos`) });
//     it("should add an item to todos array", async () => {
//         const response = await request(baseURL).post("/todos/todos").send(newTodo);
//         // console.log(response.body);
//         const lastItem = response.body.data[response.body.data.length-1];
//         expect(response.statusCode).toBe(201);
//         expect(lastItem.item).toBe(newTodo["item"]);
//         expect(lastItem.completed).toBe(newTodo["completed"]);
//     });
// });