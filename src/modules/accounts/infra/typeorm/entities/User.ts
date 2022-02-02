import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";


@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;


    @Expose({name: "avatar_url"})
    avatar_url(): string {
        return `http://localhost:3333/avatar/${this.avatar}`;
    }


    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { User }