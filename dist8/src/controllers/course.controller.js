"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const course_repository_1 = require("../repositories/course.repository");
const rest_1 = require("@loopback/rest");
const course_model_1 = require("../models/course.model");
const review_model_1 = require("../models/review.model");
const review_repository_1 = require("../repositories/review.repository");
let CourseController = class CourseController {
    constructor(courseRepo, reviewRepo) {
        this.courseRepo = courseRepo;
        this.reviewRepo = reviewRepo;
    }
    async getCourseById(course_id) {
        return await this.courseRepo.findById(course_id);
    }
    async findAllCourses() {
        let result = await this.courseRepo.find();
        console.dir(result);
        return result;
    }
    async searchCourses(subject, number) {
        return await this.courseRepo.find({
            where: {
                and: [
                    { subject: subject },
                    { number: number }
                ]
            }
        });
    }
    async findCourse(subject, number) {
        let courseExists = !!(await this.courseRepo.count({ subject }, { number }));
        if (!courseExists) {
            throw new rest_1.HttpErrors.BadRequest('course does not exist');
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
    async addCourse(course) {
        if (!course.subject || !course.number) {
            throw new rest_1.HttpErrors.BadRequest('missing required data');
        }
        let courseExists = !!(await this.courseRepo.count({ subject: course.subject }, { number: course.number }));
        if (courseExists) {
            throw new rest_1.HttpErrors.BadRequest('course already exists');
        }
        return await this.courseRepo.create(course);
    }
    // make sure course and student exist or else this will fail
    async postReview(review) {
        return this.reviewRepo.create(review);
    }
    async getAllReviewsByCourseId(course_id) {
        return await this.reviewRepo.find({
            where: {
                course_id: course_id
            }
        });
    }
    async getAllReviewsByStudentId(student_id) {
        return await this.reviewRepo.find({
            where: {
                student_id: student_id
            }
        });
    }
};
__decorate([
    rest_1.get('/course'),
    __param(0, rest_1.param.path.number('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    rest_1.get('/courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAllCourses", null);
__decorate([
    rest_1.get('/courses/search'),
    __param(0, rest_1.param.query.string('subject')),
    __param(1, rest_1.param.query.number('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchCourses", null);
__decorate([
    rest_1.get('/courses/{subject}/{number}'),
    __param(0, rest_1.param.path.string('subject')),
    __param(1, rest_1.param.path.number('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findCourse", null);
__decorate([
    rest_1.post('/addCourse'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_model_1.Course]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourse", null);
__decorate([
    rest_1.post('/review'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_model_1.Review]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "postReview", null);
__decorate([
    rest_1.get('/reviews/course'),
    __param(0, rest_1.param.query.number('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllReviewsByCourseId", null);
__decorate([
    rest_1.get('/reviews/student'),
    __param(0, rest_1.param.query.number('student_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllReviewsByStudentId", null);
CourseController = __decorate([
    __param(0, repository_1.repository(course_repository_1.CourseRepository)),
    __param(1, repository_1.repository(review_repository_1.ReviewRepository)),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository,
        review_repository_1.ReviewRepository])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map