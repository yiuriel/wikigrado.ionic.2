import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvProvider } from '../env/env';
import { Injectable } from '@angular/core';

@Injectable()
export class AllAppDataProvider {

  BASEURL: string;
  allData: {[key: string]: any}
  grades_computed: Array<number>;
  universities_computed: Array<number>;

  constructor(public http: HttpClient, private env: EnvProvider) {
    console.log('Hello AllAppDataProvider Provider');

    this.grades_computed = [];
    this.universities_computed = [];

    this.BASEURL = this.env.getEnvironmentUrl('production') + "/data";

    this.getAllData((data, error) => {
      if (!error) {
        this.allData = data;
      }
    });
  }

  getAllData(callback) {
    this.http.get(this.BASEURL + "/").subscribe(data => {
      callback(data, null);
    }, error => {
      callback(null, error);
    });
  }

  get(key) {
    let result = [];
    if (this.allData[key]) {
      const keys = Object.keys(this.allData[key]);
      keys.forEach(id_key => {
        result.push(this.allData[key][id_key])
      });

      if (key === "grades") {
        let withVideo = result.filter(row => row.video).sort((prev, next) => {
          if (prev.grade[0].toLowerCase() < next.grade[0].toLowerCase())
            return -1;
          if (prev.grade[0].toLowerCase() > next.grade[0].toLowerCase())
            return 1;
          return 0;
        });
        let noVideo = result.filter(row => !row.video);
        return withVideo.concat(noVideo);
      } else {
        return result;
      }
    }
    return result;
  }

  getGradeWithUniversities(grade) {
    if (!this.grades_computed[grade.id]) {
      this.grades_computed[grade.id] = 1;
      let gradeWithUniversities = Object.assign({}, grade);
      gradeWithUniversities.universities.forEach((univ, i) => {
        const univObject = Object.assign({}, this.allData['universities'][univ], {grades: null})
        gradeWithUniversities.universities[i] = univObject;
      });
      return gradeWithUniversities;
    }
    return grade;
  }

  getUniversityWithGrades(university) {
    if (!this.universities_computed[university.id]) {
      this.universities_computed[university.id] = 1;
      let universityWithUniversities = Object.assign({}, university);
      universityWithUniversities.grades.forEach((grade, i) => {
        const gradeObject = Object.assign({}, this.allData['grades'][grade], {universities: null})
        universityWithUniversities.grades[i] = gradeObject;
      });
      return universityWithUniversities;
    }
    return university;
  }

  getDataBasedOnType(type) {
    return this.allData.filter(chunk => chunk.type === type);
  }

  getDataBasedOnTypeAndIndex(type, index) {
    const data = this.get(type);
    return data.find(chunk => chunk.id === index);
  }

  getDataBasedOnTypeAndValue(type, value) {
    return this.allData.filter(chunk => chunk.type === type && chunk.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
  }

}
