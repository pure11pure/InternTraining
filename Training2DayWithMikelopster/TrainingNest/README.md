### [https://docs.mikelopster.dev/c/web-workshop-pccth/day1-nestjs]

# Nest.js

- [https://nestjs.com/]

## Start

- [https://docs.nestjs.com/first-steps]

#### install project

```
npm i -g @nestjs/cli
nest new <project-name>
```

#### start/run project

```
npm run start:dev
```

#### crate folder

```
# CLI สำหรับการสร้าง
nest g module <ชื่อ module>
nest g controller <ชื่อ controller>
nest g service <ชื่อ service>
```

#### connect database (docker-compose.yml)

```
docker-compose up -d
```

#### TypeORM
> TypeORM ใน NestJS คือเครื่องมือ (ORM: Object-Relational Mapping) ที่ช่วยให้การทำงานกับฐานข้อมูลในลักษณะเชิงวัตถุ (Object-Oriented) ง่ายขึ้น โดยที่ผู้พัฒนาไม่ต้องเขียนคำสั่ง SQL โดยตร [https://docs.nestjs.com/techniques/database]

```
npm install @nestjs/typeorm typeorm pg
```

##### PostgreSQL ด้วย TypeORM
```
npm install @nestjs/typeorm typeorm pg
```

#### Authentication
- [https://docs.nestjs.com/security/authentication]

```
npm install @nestjs/jwt bcryptjs typeorm pg
```



## Doc

- [https://docs.nestjs.com/modules]
- [https://docs.nestjs.com/providers]
- [https://docs.nestjs.com/controllers]
