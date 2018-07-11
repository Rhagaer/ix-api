import { CourseRepository } from "../repositories/course.repository";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";
export declare class CourseController {
    protected courseRepo: CourseRepository;
    protected reviewRepo: ReviewRepository;
    constructor(courseRepo: CourseRepository, reviewRepo: ReviewRepository);
    getCourseById(course_id: number): Promise<Course>;
    reviewCourse(course: Course): Promise<void>;
    findAllCourses(): Promise<Course[]>;
    searchCourses(subject: string, number?: number): Promise<Course[]>;
    findCourse(subject: string, number: number): Promise<Course | null>;
    addCourse(course: Course): Promise<Course>;
    makeReview(review: Review): Promise<Review>;
    getAllReviewsByCourseId(course_id: number): Promise<Review[]>;
}
