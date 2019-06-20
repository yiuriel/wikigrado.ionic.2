import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvProvider } from '../env/env';
import { Injectable } from '@angular/core';
//import {constructDependencies} from "@angular/core/src/di/reflective_provider";

@Injectable()
export class AllAppDataProvider {

  BASEURL: string;
  COLLEGESURL: string;
  GRADOMEDIOURL: string;
  GRADOSUPERIORURL: string;
  allData: {[key: string]: any}
  collegesData: {[key: string]: any}
  gradoMedioData:{[key: string]: any}
  gradoSuperiorData:{[key: string]: any}
  grades_computed: Array<number>;
  universities_computed: Array<number>;
  authHeaders: any;

  constructor(public http: HttpClient, private env: EnvProvider) {
    this.grades_computed = [];
    this.universities_computed = [];

    this.BASEURL = this.env.getEnvironmentUrl('production') + "/data";
    this.COLLEGESURL = this.BASEURL + "/colleges";
    this.GRADOMEDIOURL = this.BASEURL + "/fp_medio";
    this.GRADOSUPERIORURL = this.BASEURL + "/fp_superior";

    const authStr = 'Qzmea0rxbgO7ts3deYeUME wikigrado SSY0UFT2q9LInWF3lW44AfXYz7dIXN';
    const authStrKey = authStr.substr(Math.round(Math.random() * authStr.length / 2), Math.round(Math.random() * authStr.length / 2) + 10);
    this.authHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authStr,
        'Authorization-Key': authStrKey
      })
    };

    this.getAllData((data, error) => {
      if (!error) {
        this.allData = data;
      }
    });

    this.getCollegesData((data, error) => {
      if (!error) {
        this.collegesData = data;
      }
    });
    this.getGradoMedioData((data, error) => {
      if (!error) {
        this.gradoMedioData = data;
      }
    });
    this.getGradoSuperiorData((data, error) => {
      if (!error) {
        this.gradoSuperiorData = data;
      }
    });


  }

  getAllData(callback) {
    this.http.get(this.BASEURL + "/", this.authHeaders).subscribe(data => {
      callback(data, null);
    }, error => {
      callback(null, error);
    });
  }

  getCollegesData(callback) {
    this.http.get(this.COLLEGESURL + "/", this.authHeaders).subscribe(data => {
      callback(data, null);
    }, error => {
      callback(null, error);
    });
  }
  getGradoMedioData(callback) {
    this.http.get(this.GRADOMEDIOURL + "/", this.authHeaders).subscribe(data => {
      callback(data, null);
    }, error => {
      callback(null, error);
    });
  }
  getGradoSuperiorData(callback) {
    this.http.get(this.GRADOSUPERIORURL + "/", this.authHeaders).subscribe(data => {
      callback(data, null);
    }, error => {
      callback(null, error);
    });
  }

  getColleges() {
    return this.collegesData;
  }
  getGradoMedio() {
    console.log(this.gradoMedioData);
    return this.gradoMedioData;
  }
  getGradoSuperior() {
    console.log(this.gradoSuperiorData);
    return this.gradoSuperiorData;
  }

  get(key) {
    let result = [];
    if (this.allData[key]) {
      console.log(this.allData);
      const keys = Object.keys(this.allData[key]);
      keys.forEach(id_key => {
        result.push(this.allData[key][id_key])
      });

      if (key === "grades") {
        let withVideo = result.filter(row => row.video).sort((prev, next) => {
          if (prev.grade.toLowerCase() < next.grade.toLowerCase())
            return -1;
          if (prev.grade.toLowerCase() > next.grade.toLowerCase())
            return 1;
          return 0;
        });
        let noVideo = result.filter(row => !row.video);
        return withVideo.concat(noVideo);
      }else if (key === "universities") {
        let centers = result.filter(row => row.university.toLowerCase().indexOf("centro") > -1);
        let centerIds = centers.map(row => row.id);
        let universities = result.filter(row => centerIds.indexOf(row.id) === -1).sort((prev, next) => {
          const importanceOrder = prev.importance - next.importance;
          if (importanceOrder === 0) {
            if (prev.university.toLowerCase() > next.university.toLowerCase()) return 1;
            if (prev.university.toLowerCase() < next.university.toLowerCase()) return -1;
            return 0;
          } else {
            return importanceOrder;
          }
        });
        return universities.concat(centers);
      } else {
        return result;
      }
    }
    return result;
  }

  getGradeWithUniversities(grade) {
    // this.grades_computed[grade.id] = 1;
    let gradeWithUniversities = Object.assign({}, grade);
    let nullMappedGrade = gradeWithUniversities;
    Object.keys(nullMappedGrade).forEach(key => {
      if (nullMappedGrade[key] === "NULL") {
        nullMappedGrade[key] = null;
      }
    });

    gradeWithUniversities.universities.forEach((univ, i) => {
      Object.keys(this.allData['universities'][univ.id]).forEach(key => {
        if (this.allData['universities'][univ.id][key] === "NULL") {
          this.allData['universities'][univ.id][key] = null;
        }
      });
      const univObject = Object.assign({}, this.allData['universities'][univ.id], {grades: null})
      if (univ.paid_for_it) {
        gradeWithUniversities.main_university = univObject;
      } else {
        if (!gradeWithUniversities.list) {
          gradeWithUniversities.list = [];
        }
        gradeWithUniversities.list.push(univObject);
      }
    });
    return gradeWithUniversities;
  }



  getUniversityWithGrades(university) {
    if (!this.universities_computed[university.id]) {
      this.universities_computed[university.id] = 1;
      let nullMappedUniversity = university;
      Object.keys(nullMappedUniversity).forEach(key => {
        if (nullMappedUniversity[key] === "NULL") {
          nullMappedUniversity[key] = null;
        }
      });
      let universityWithUniversities = Object.assign({}, nullMappedUniversity);
      universityWithUniversities.grades.forEach((grade, i) => {
        const gradeObject = Object.assign({}, this.allData['grades'][grade], {universities: null})
        universityWithUniversities.grades[i] = gradeObject;
      });
      universityWithUniversities.grades = universityWithUniversities.grades.sort((prev, next) => {
        if (prev.grade.toLowerCase() < next.grade.toLowerCase())
          return -1;
        if (prev.grade.toLowerCase() > next.grade.toLowerCase())
          return 1;
        return 0;
      });
      return universityWithUniversities;
    }
    return university;
  }

  getDataBasedOnType(type) {
    return this.allData.filter(chunk => chunk.type === type);
  }

  getDataBasedOnTypeAndIndex(type, index) {
    if (type === 'colleges') {
      return this.collegesData.find(college => college.id === index);
    }
    const data = this.get(type);
    return data.find(chunk => chunk.id === index);
  }

  getDataBasedOnTypeAndValue(type, value) {
    return this.allData.filter(chunk => chunk.type === type && chunk.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
  }

}
