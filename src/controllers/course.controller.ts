import { repository } from "@loopback/repository";
import { CourseRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";

export class CourseController {
    constructor(
        @repository(CourseRepository) protected courseRepo: CourseRepository
    ) { }

    // figure out many-to-many relationship
    // @post('/review')
    // async makeReview(
    //     @requestBody() review: Review,
    //     //@param.path.number('course_id') course_id: number
    // ) {
    //     if(!review.remark || !review.rating || !review.header) {
    //         throw new HttpErrors.BadRequest('missing required fields')
    //     }

    //     return review;
    // }

    // @post('/course/review')
    // async reviewCourse(
    //     @requestBody() course: Course
    // ) {

    // }

    @get('/courses')
    async findAllCourses(): Promise<Course[]> {
        return await this.courseRepo.find();
    }

    @get('/courses/search')
    async searchCourses(
        @param.path.string('subject') subject: string,
        @param.path.number('number') number?: number
    ) {
        return await this.courseRepo.find({
            where: {
                and: [
                    { subject: subject },
                    { number: number }
                ]
            }
        })
    }

    @get('/courses/{subject}/{number}')
    async findCourse(
        @param.path.string('subject') subject: string,
        @param.path.number('number') number: number
    ) {
        let courseExists: boolean = !!(await this.courseRepo.count(
            { subject },
            { number }
        ));

        if (!courseExists) {
            throw new HttpErrors.BadRequest('course does not exist');
        }

        return await this.courseRepo.findOne({
            where: {
                and: [
                    { subject: subject },
                    { number: number }
                ]
            }
        });
    }

    @post('/addCourse')
    async addCourse(
        @requestBody() course: Course
    ): Promise<Course> {

        if (!course.subject || !course.number) {
            throw new HttpErrors.BadRequest('missing required data');
        }

        let courseExists: boolean = !!(await this.courseRepo.count(
            { subject: course.subject },
            { number: course.number }
        ));

        if (courseExists) {
            throw new HttpErrors.BadRequest('course already exists');
        }

        return await this.courseRepo.create(course);
    }

}