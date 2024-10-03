# InternTraining
Training 12

### เทคโนโลยี
- Front-end : Angular
- Back-end : Java

### tool
- vscode
- DBeaver
- springtoolsuite4

### run serve
    ng serve
    ng serve --port 4201
    npm start

### create project
    ng new <name-project>

### create module
    ng g module <name-module>

### create module 
    ng g c <name-component> --module app

### app.module.ts ไม่มีใน Angular 17
    ng new my-first-angular --no-standalone


## Install Bootstrap 4
#### install
    npm install bootstrap@4.6.1
    npm install jquery@3.6.0
    npm install popper.js@1.16.1
    
#### angular.json
##### พิมพใน "styles" 
    "node_modules/bootstrap/scss/bootstrap.scss",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"

##### พิมพใน "scripts"
    "node_modules/jquery/dist/jquery.slim.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"


## Install NG-ZORRO
     ng add ng-zorro-antd
    
#### angular.json
##### พิมพใน "styles"
    "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
##### ใช้คำสั่ง
    npm install


## Date
[Angular Bootstrap (valor-software.com)](https://valor-software.com/ngx-bootstrap/#/components/datepicker?tab=overview)
    
#### install
    npm install ngx-bootstrap@7.1.2 --save
    ng add ngx-bootstrap  --component datepicker

#### import
    import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
    import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
    import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
    import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
    defineLocale('th-be', thBeLocale); //calendar[bootstrap]
    
      constructor(
        private localeService: BsLocaleService, //calendar[bootstrap]
        private http: HttpClient
      ) {
        this.localeService.use(this.locale); //calendar[bootstrap]
      }
    
      locale = 'th-be'; //calendar[bootstrap]
      locales = listLocales();  //calendar[bootstrap]

