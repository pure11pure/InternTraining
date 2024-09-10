import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CourseData {
  courseCode: string;
  lessonAllByCourse: any[];
  learnAllByCourseAndUser: any[];
  course_url: string;
  course_name: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }


  userCode: string = '';

  listCourse: any[] = [];

  listAll: CourseData[] =[];
  // listLessonAll: any[] = [];
  // listLearnAll: any[] = [];

  ngOnInit() {
    const userCode = localStorage.getItem('userCode');

    if (userCode) {
      this.userCode = userCode;
    }
    this.start()
  }

  async getCourse() {
    try {
      const res = await this.getCoursesApi(this.userCode);
      if (res) {
        console.log(res)
        this.listCourse = res;
      }
    } catch (error) {
    }
  }

  async getLesson(courseCode: string) {
    try {
      const res = await this.getLessonsApi(courseCode);
      if (res) {
        return res;
      }
    } catch (error) {
    }
  }

  async getLearn(courseCode: string, userCode: string) {
    try {
      const res = await this.getLearnApi(courseCode, userCode);
      if (res) {
        return res;
      }
    } catch (error) {
    }
  }

  linkToCourse(course: any) {
    console.log(course)
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.location.href = course.course_url;
    }
  }

  getLessonBackgroundColor(course: CourseData, lesson: any): string {
    return course.learnAllByCourseAndUser.some(l => l.learned_lesson_code === lesson.lesson_code) ? '#B6C7AA' : '#F6E6CB';
  }

  getCoursesApi(userCode: string) {
    const url = `http://localhost:8778/dt-controller/get-course-by-userCode?userCode=${userCode}`
    return this.http.get<any>(url).toPromise();
  }

  getLessonsApi(courseCode: string) {
    const url = `http://localhost:8778/dt-controller/get-Lesson?courseCode=${courseCode}`
    return this.http.get<any>(url).toPromise();
  }

  getLearnApi(courseCode: string, userCode: string) {
    const url = `http://localhost:8778/dt-controller/get-Learned?courseCode=${courseCode}&userCode=${userCode}`
    return this.http.get<any>(url).toPromise();
  }

  async start() {
    await this.getCourse();
    for (let i = 0; i < this.listCourse.length; i++) {
      const courseCode = this.listCourse[i].course_code;
      const url = this.listCourse[i].course_url;
      const name = this.listCourse[i].course_name;
      console.log(courseCode)
      const lessonAllByCourse = await this.getLesson(courseCode);
      const learnAllByCourseAndUser = await this.getLearn(courseCode, this.userCode);

      this.listAll.push({
        courseCode: courseCode,
        lessonAllByCourse: lessonAllByCourse,
        learnAllByCourseAndUser: learnAllByCourseAndUser,
        course_url : url,
        course_name: name
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }



}
