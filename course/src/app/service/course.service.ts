import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class CourseService {
    constructor(private http: HttpClient) { }

    getCoursesList() {
        return this.http.get('/api/courses', {});
    }

    getPaddingCoursesList() {
        return this.http.get('/api/courses/padding', {});
    }
    
    getCourses() {
        return this.http.get('/api/courses/my', {});
    }

    getCourseById(id: string) {
        return this.http.get(`/api/courses/${id}`);
    }

    findSemestersByCourse(id: string) {
        return this.http.get(`/api/courses/${id}/semesters`);
    }

    updateCoursesByAdmin(params: any) {
        return this.http.put(`/api/courses/audit`, params);
    }

    updateCourses(params: any) {
        return this.http.put(`/api/courses`, params);
    }

    insertCourses(params: any) {
        return this.http.post(`/api/courses`, params);
    }

    deleteCourses(id: string) {
        return this.http.delete(`/api/courses/${id}`);
    }
}