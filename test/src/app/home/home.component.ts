import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }


  user: string = '';
  position: string = '';

  courseAndLessonsToStudy: any[] = []; // [{course: '101', lesson: 'Lesson02'}, ...]
  courseFromPosition: any[] = []; //[{course: '101'}, ...]

  listCourse: any[] = [];

  ngOnInit() {
    const username = localStorage.getItem('username');
    const position = localStorage.getItem('position');

    if (username && position) {
      this.user = username;
      this.position = position;
    }
    this.start()
  }

  getCoursesApi(position: string) {
    const url = `http://localhost:8778/pure-controller/t-get-courses?position=${position}`
    return this.http.get<any>(url).toPromise();
  }

  getCourseAndLessonApi(username: string) {
    const url = `http://localhost:8778/pure-controller/t-get-courses-to-learn-lesson-form-username?username=${username}`
    return this.http.get<any>(url).toPromise();
  }

  getCourseAndListLessonApi(position: string) {
    const url = `http://localhost:8778/pure-controller/t-get-courseAndListlessons-form-position?position=${position}`
    return this.http.get<any>(url).toPromise();
  }

  async getCourse(position: string): Promise<void> {
    try {
      const response = await this.getCoursesApi(position);
      if (response) {
        this.listCourse = response;
        console.log('get course all successful: ' + this.user);
        console.log("this.listCourse", this.listCourse)

        // ดูว่าแต่ละ course มี กี่บท
        this.listCourse.forEach(course => {
          const listLearnLesson = this.courseFromPosition.find(item => item.course === course.course); //บทที่ได้เรียนไปแล้ว
          console.log(`บทที่ได้เรียนไปแล้ว: ${course.course}`, listLearnLesson)
          console.log(`บทที่ทั้งหมดที่มี: ${course.course}`, course.numberLesson)

          // บทที่เรียนแล้วจะเป็น true  ถ้ายังไม่ได้เรียนจะเป็น  false
          const lessons = this.checkLessons(course.numberLesson, listLearnLesson.lessons);
          console.log("lessons: ", lessons)

          let numStudy = listLearnLesson.lessons.length //จำนวนที่เรียนไป
          course['lessons'] = lessons;
          course['numStudy'] = numStudy;
        })

      } else {
        console.log('get course failed');
        alert('get course failed')
      }
    } catch (error) {
      console.error('get course API Error:', error);
    }
  }

  // ที่เรียนไปแล้ว
  async getStudyListLessons(username: string): Promise<void> {
    try {
      const response = await this.getCourseAndLessonApi(username);
      if (response) {
        this.courseAndLessonsToStudy = response;
        console.log("getStudyListLessons: ", response)
      } else {
        console.log('get course&elessons failed');
        alert('get course&elessons failed')
      }
    } catch (error) {
      console.error('get course&elessons API Error:', error);
    }
  }

  // คอร์สทั้งหมด
  async getListAllLessons(position: string): Promise<void> {
    try {
      const response = await this.getCourseAndListLessonApi(position);
      if (response) {
        this.courseFromPosition = response;
        console.log("getListAllLessons: ", response)

      } else {
        console.log('get course&elessons failed');
        alert('get course&elessons failed')
      }
    } catch (error) {
      console.error('get course&elessons API Error:', error);
    }
  }

  // เอาคอร์สทั้งหมด มาดูว่าแต่ละคอร์สเรียนบทไหนแล้วบ้าง
  async createCoursetoListLesson(courseAndLessonsToStudy: any[], courseFromPosition: any[]): Promise<void> {
    for (let i = 0; i < courseFromPosition.length; i++) {
      let course = courseFromPosition[i].course; // 'Lesson01'
      courseFromPosition[i].lessons = []; // สร้างที่เก็บบทที่เรียนไปแล้ว

      for (let j = 0; j < courseAndLessonsToStudy.length; j++) {
        if (courseAndLessonsToStudy[j].course === course) {
          courseFromPosition[i].lessons.push(courseAndLessonsToStudy[j].lesson);
        }
      }
    }

    console.log('Updated courseFromPosition:', courseFromPosition);
  }

  // ----------------
  linkToCourse(course: any) {
    console.log(course.url)
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const url = `${course.url}?username=${this.user}&position=${this.position}&course=${course.course}`; // ส่งค่าที่ต้องการเก็บผ่าน URL parameters
      newWindow.location.href = url;
    }
  }

  calculateSpan(numLessons: number): number {
    return Math.floor(24 / numLessons);
  }

  checkLessons(allLessons: string[], learnedLessons: string[]): { [key: string]: boolean } {
    const lessonStatus: { [key: string]: boolean } = {};

    allLessons.forEach(lesson => {
      lessonStatus[lesson] = learnedLessons.includes(lesson);
    });

    return lessonStatus;
  }


  async start() {
    try {
      await this.getStudyListLessons(this.user);
      await this.getListAllLessons(this.position);

      // วนลูปเพื่อเพิ่มข้อมูล lesson ลงใน userCountLesson ตาม course ที่ตรงกัน
      await this.createCoursetoListLesson(this.courseAndLessonsToStudy, this.courseFromPosition);

      this.getCourse(this.position)

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }




}

