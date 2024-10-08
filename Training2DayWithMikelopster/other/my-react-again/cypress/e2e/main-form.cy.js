describe('ทดสอบฟอร์มผู้ใช้', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('แสดงฟอร์มผู้ใช้และส่งข้อมูลได้สำเร็จ', () => {
        // ตรวจสอบว่ามีฟอร์มแสดงอยู่
        cy.get('form').should('exist')

        // กรอกข้อมูลในฟอร์ม
        cy.get('#name').type('ปัณณพร')
        cy.get('#email').type('punnaporn@gmail.com')
        cy.get('#password').type('pure1234')

        // กดปุ่มส่งข้อมูล
        // cy.get('button[type="submit"]').click() //ใช้ไม่ได้ เพราะมีปุ่มมากเกินไป
        cy.get('#submit-regis1').click()
        // หรือ
        // cy.get('button[type="submit"]').eq(0).click() // คลิกปุ่มแรก


        // ตรวจสอบว่าข้อมูลที่ส่งแสดงขึ้นมา
        cy.get('div').contains('ปัณณพร').should('exist')
    })

    // it('แสดงข้อความแจ้งเตือนเมื่อกรอกข้อมูลไม่ครบ', () => {
    //     // กดปุ่มส่งข้อมูลโดยไม่กรอกข้อมูล
    //     cy.get('button[type="submit"]').click()

    //     // ตรวจสอบข้อความแจ้งเตือน
    //     cy.get('span').should('contain', 'กรุณากรอกชื่อ')
    //     cy.get('span').should('contain', 'กรุณากรอกนามสกุล')
    //     cy.get('span').should('contain', 'กรุณากรอกเบอร์โทรศัพท์')
    //     cy.get('span').should('contain', 'กรุณาเลือกวันเกิด')
    // })

    // it('แสดงข้อความแจ้งเตือนเมื่อกรอกเบอร์โทรศัพท์ไม่ถูกต้อง', () => {
    //     cy.get('#phoneNumber').type('123')
    //     cy.get('button[type="submit"]').click()

    //     cy.get('span').should('contain', 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (10 หลัก)')
    // })
})