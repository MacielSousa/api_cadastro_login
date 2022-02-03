import request  from "supertest";
import { Connection } from "typeorm";

import { hash } from "bcryptjs";
import {v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection
describe("Athentication User", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at) 
            values('${id}', 'admin', 'admin@admin.com', '${password}', false, 'now()')`
        )
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able for a user to login", async () => {
        const response = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin",
        });

        expect(response.status).toBe(200);
    });

    it("should be able to login with incorrect password", async () => {
        const response = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "123456",
        });

        expect(response.status).toBe(400);
    })

    it("should be able to login with incorrect email", async () => {
        const response = await request(app).post("/sessions").send({
            email: "julia@julia.com",
            password: "admin",
        });

        expect(response.status).toBe(400);
    })


})


