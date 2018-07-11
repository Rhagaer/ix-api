import { CourseRepository } from "../repositories/course.repository";
import { Course } from "../models/course.model";
export declare class CourseController {
    protected courseRepo: CourseRepository;
    constructor(courseRepo: CourseRepository);
    findAllCourses(): Promise<Course[]>;
    findCourse(subject: string, number: number): Promise<Course | null>;
    addCourse(course: Course): Promise<Course>;
}
