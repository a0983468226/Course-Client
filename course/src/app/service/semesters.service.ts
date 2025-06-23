import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SemestersService {
    constructor(private http: HttpClient) { }

    updateSemesters(params: any) {
        return this.http.put(`/api/semesters`, params);
    }

    insertSemesters(params: any) {
        return this.http.post(`/api/semesters`, params);
    }

    deleteSemesters(id: string) {
        return this.http.delete(`/api/semesters/${id}`);
    }
}