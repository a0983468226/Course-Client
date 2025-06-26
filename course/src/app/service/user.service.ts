import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    finduserById() {
        return this.http.get(`/api/users/my`, {});
    }

    findUser() {
        return this.http.get(`/api/users`, {});
    }

    insertUser(params: any) {
        return this.http.post(`/api/users`, params);
    }

    updateUserById(params: any) {
        return this.http.put(`/api/users/my`, params);
    }

    updateUser(params: any) {
        return this.http.put(`/api/users`, params);
    }
    
    deleteUserById(id: any) {
        return this.http.delete(`/api/users/${id}`, {});
    }
}