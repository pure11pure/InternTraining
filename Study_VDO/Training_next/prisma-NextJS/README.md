start [https://mikelopster.dev/posts/next-prisma]

1. โหลด Docker
    docker --version
    docker-compose --version
    `สร้างไฟล์ docker-compose.yml`
    docker-compose up -d


2. ติดตั้ง prisma
    npm install prisma --save-dev
    npm install @prisma/client

3.  create prisma
    npx prisma init
    - learn more about it in the docs: https://pris.ly/d/prisma-schema
    - https://www.prisma.io/docs/orm/prisma-schema/overview

4. extend Prisma


## Other
    npx prisma migrate dev --name <ชื่อ migrate>


#### pic
![alt text](image.png)
![alt text](image-1.png)


## !!! การจะสร้าง table 
ในการจะสร้าง table จะต้องคิดให้ดี เพราะอาจเกิดปัญหาได้
ในกรณีที่ เพิ่ม feild ที่หลัง > table ที่มี column เดิมที่เคยสร้างอยู่มีการเปลี่ยนแปลงบางอย่าง
* หากมีการแก้ไข column เดิมใน table เดิม ต้องตัดสินใจลบ data หรือ หาวิธีในการเลี่ยง(มันมีอยู่)