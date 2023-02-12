import { RoleEnum } from './../roleENUM';

export class UserClass {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private role: RoleEnum,
        private password: string
    ) { }
    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getName() {
        return this.name
    }
    public setName(newName: string) {
        this.name = newName
    }

    public getEmail() {
        return this.email
    }
    public setEmail(newEmail: string) {
        this.email = newEmail
    }

    public getRole() {
        return this.role
    }
    public setRole(newRole: RoleEnum) {
        this.role = newRole
    }

    public getPassword() {
        return this.password
    }
    public setPassword(newPassword: string) {
        this.password = newPassword
    }
}