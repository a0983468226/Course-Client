import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    insertEnrollment(id: any) {
        return this.http.post(`/api/students/enrollments/${id}`, {});
    }

    addCourseRequests(params: any) {
        return this.http.post(`/api/students/course-requests`, params);
    }

    dropCourseRequests(params: any) {
        return this.http.put(`/api/students/course-requests`, params);
    }
}