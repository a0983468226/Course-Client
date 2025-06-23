import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TeachersService {
    
    constructor(private http: HttpClient) { }

    findStudentByCourses(id: any) {
        return this.http.get(`/api/teachers/courses/${id}/students`);
    }

    addDropCourse(id: any, params: any) {
        return this.http.post(`/api/teachers/courses/${id}/course-requests`, params);
    }


}