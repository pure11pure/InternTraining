var params = new URLSearchParams(window.location.search);
var username = params.get('username');
var position = params.get('position');
var course = params.get('course');
console.log(username, position, course)

/* เรียกไฟล์ config.json */
var data;
setting();
async function setting() {
    console.log("print")
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data = await response.json();
        console.log(data); // ดูข้อมูลใน console
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

/* ประกาศตัวแปร */
var interfaceObj;
var eventEmitterObj;

/* main */
window.addEventListener("moduleReadyEvent", function (evt) {
    interfaceObj = evt.Data;
    eventEmitterObj = interfaceObj.getEventEmitter();

    // ทุกครั้งที่เราเปลี่ยนจากหน้าหนึ่งไปหน้าสอง จะทำการเก็บค่าหน้าหนึ่งเอาไว้ (หน้าที่เราออกมา)
    eventEmitterObj.addEventListener("CPAPI_SLIDEEXIT", function (e) {
        console.log("CPAPI_SLIDEEXIT", e)


        // เมื่อกดปุ่ม "begin" > ดึงข้อมูลมาดูว่า username,course นี้ถึงบทไหนแล้ว
        startBtn = window.cpAPIInterface.getVariableValue(data.button.start);
        if (startBtn) {
            console.log("begin/start")
            checkLesson(username, course);
        }

        // จับ event การคลิก
        evtClick = e.cpData.topMostObjectInteractiveObject
        continueBtnAll = data.button.continues
        // ดูว่ามีปุ่มที่สนใจไหม เช่น continue / ทำ quiz เสร็จ
        let condition = false;
        continueBtnAll.forEach(item => {
            if(item.variable == evtClick){
                condition = true
            }
        })

        // ถ้ามีการคลิกปุ่ม continue
        if ((condition)) {
            let lessonClick = continueBtnAll.find(item => item.variable === evtClick);
            // console.log("check: ", username, lessonClick.name, course)
            checkData(username, course, lessonClick.name)
                .then(found => {
                    // ถ้าไม่พบ ให้ทำการบันทึกได้เลย
                    if (condition && !found) {
                        let lesson = continueBtnAll.find(item => item.variable === evtClick);
                        let data = {
                            lesson: lesson.name,
                            course: course,
                            time: "",
                            id: 0,
                            username: username,
                        };
                        saveData(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });

        }
    })
})


/* เช็คข้อมูลใน database และ แสดงเริ่มแรก*/
var dataListStudy;
async function checkLesson(username, course) {
    console.log('function: checkLesson', username, course)

    let dataCheck = {
        lesson: "",
        course: course,
        time: "",
        id: 0,
        username: username,
    };

    // ดึงข้อมูลจาก databse ว่า username, course มีเรียนไปกี่บท
    try {
        const response = await fetch('http://localhost:8778/pure-controller/get-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCheck),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        dataListStudy = await response.json();
    } catch (error) {
        console.error('Error:', error); // จัดการข้อผิดพลาด
    }

    const allLessons = data.lessons; // บทเรียนทั้งหมด
    dataListStudy.forEach(item => {
        // เช็คว่าบทที่เรียนไปแล้วมีอะไรบ้าง
        allLessons.forEach(lessonItem => {
            if (item.lesson === lessonItem.lesson) {
                cp.show(lessonItem.image);
                window[lessonItem.variable] = cp.ho('1');
            }
        });
    })

    // เช็คว่าต้องแสดงปุ่ม Quiz ไหม
    let showButtonQuiz = true;
    allLessons.forEach(lesson => {
        if (lesson.lesson !== "Quiz") {
            const variableName = `${lesson.variable}`;
            if (cp.ho(variableName) !== cp.ho('1')) {
                showButtonQuiz = false;
            }
        }
        console.log(showButtonQuiz)
    });
    if (showButtonQuiz) {
        cp.show(data.button.quiz);
    }
}


function saveData(data) {
    fetch('http://localhost:8778/pure-controller/save-time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // แปลงข้อมูล JSON เป็น string และส่งไปใน body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        })
        .then(data => {
            console.log('Success:', data); // พิมพ์ข้อมูลที่ได้รับไปยังคอนโซล
        })
        .catch(error => {
            console.error('Error:', error); // จัดการข้อผิดพลาด
        });
}

// ดูว่า username นี้ ได้เรียน courseและlessonแล้วหรือยัง
function checkData(username, course, lesson) {
    return new Promise((resolve, reject) => {
        let found = false;

        let dataSearch = {
            lesson: lesson,
            course: course,
            time: "",
            id: 0,
            username: username,
        };

        fetch('http://localhost:8778/pure-controller/check-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSearch)
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                if (data.length > 0) {
                    found = true;
                    // console.log("found", found);
                    resolve(found);
                } else {
                    resolve(found);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}