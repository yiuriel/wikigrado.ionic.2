import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UniversidadesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UniversidadesProvider Provider');
  }

  getUniversidades() {
    return new Promise<Array<any>>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            "universidad": "Universidad Complutense de Madrid",
            "index": 0,
            "type": "universidad",
            "carreras": ["Bellas Artes","Biología","Ciencia y Tecnología de los Alimentos","Enfermería","Estudios Ingleses","Farmacia","Filología Hispánica","Física","Fisioterapia","Historia","Historia del Arte","Ingeniería Química","Magisterio Educación Infantil","Magisterio Educación Primaria","Matemáticas","Medicina","Odontología","Óptica y Optometría","Periodismo","Psicología","Publicidad y Relaciones Públicas","Trabajo Social","Veterinaria"],
          },
          {
            "universidad": "Universidad Autónoma de Barcelona",
            "index": 1,
            "type": "universidad",
            "carreras": ["Biología","Biotecnología","Ciencia y Tecnología de los Alimentos","Ciencias Ambientales","Ciencias Políticas y de la Administración","Comunicación Audiovisual","Economía","Educación Social","Filología Hispánica","Finanzas y Contabilidad","Física","Magisterio Educación Infantil","Magisterio Educación Primaria","Matemáticas","Periodismo","Publicidad y Relaciones Públicas","Química","Terapia Ocupacional","Traducción e Interpretación","Veterinaria"],
          },
          {
            "universidad": "Universidad Autónoma de Madrid",
            "index": 2,
            "type": "universidad",
            "carreras": ["Biología","Ciencias Ambientales","Ciencias Políticas y de la Administración","Derecho","Economía","Enfermería","Estudios Ingleses","Filología Hispánica","Física","Historia","Historia del Arte","Ingeniería Tecnologías de Telecomunicación","Magisterio Educación Infantil","Matemáticas","Medicina","Nutrición y Dietética","Psicología","Química","Terapia Ocupacional"],
          },
          {
            "universidad": "Universidad de Barcelona",
            "index": 3,
            "type": "universidad",
            "carreras": ["Bellas Artes","Biología","Biotecnología","Ciencias Ambientales","Ciencias de la Actividad Física","Enfermería","Farmacia","Física","Historia del Arte","Magisterio Educación Infantil","Magisterio Educación Primaria","Matemáticas","Medicina","Nutrición y Dietética","Psicología","Química","Trabajo Social"],
          },
          {
            "universidad": "Universidad Politécnica de Madrid",
            "index": 4,
            "type": "universidad",
            "carreras": ["Arquitectura","Biotecnología","Ciencias de la Actividad Física","Edificación","Ingeniería Agrícola","Ingeniería Civil","Ingeniería de Sistemas de Telecomunicación","Ingeniería de Tecnologías Industriales","Ingeniería Eléctrica","Ingeniería Informática","Ingeniería Mecánica","Ingeniería Tecnologías de Telecomunicación","Ingeniería Telemática"],
          },
          {
            "universidad": "Universidad Politécnica de Valencia",
            "index": 5,
            "type": "universidad",
            "carreras": ["Arquitectura","Bellas Artes","Biotecnología","Ciencia y Tecnología de los Alimentos","Edificación","Ingeniería Agrícola","Ingeniería Civil","Ingeniería de Sistemas de Telecomunicación","Ingeniería de Tecnologías Industriales","Ingeniería Eléctrica","Ingeniería Informática","Ingeniería Mecánica","Ingeniería Química","Ingeniería Tecnologías de Telecomunicación"],
          },
          {
            "universidad": "Universidad Politécnica de Cataluña",
            "index": 6,
            "type": "universidad",
            "carreras": ["Arquitectura","Edificación","Ingeniería Civil","Ingeniería de Sistemas de Telecomunicación","Ingeniería de Tecnologías Industriales","Ingeniería Eléctrica","Ingeniería Informática","Ingeniería Mecánica","Ingeniería Tecnologías de Telecomunicación","Ingeniería Telemática","Óptica y Optometría"],
          },
          {
            "universidad": "Universidad Carlos III",
            "index": 7,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Navarra",
            "index": 8,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Pompeu Fabra",
            "index": 9,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Granada",
            "index": 10,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Ramón Llull",
            "index": 11,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Rey Juan Carlos",
            "index": 12,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Salamanca",
            "index": 13,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Valencia",
            "index": 14,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de País Vasco",
            "index": 15,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Alicante",
            "index": 16,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Santiago de Compostela",
            "index": 17,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Pontificia de Comillas",
            "index": 18,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad CEU San Pablo",
            "index": 19,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Sevilla",
            "index": 20,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Alcalá de Henares",
            "index": 21,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de La Coruña",
            "index": 22,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Europea",
            "index": 23,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Zaragoza",
            "index": 24,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Córdoba",
            "index": 25,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Murcia",
            "index": 26,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Islas Baleares",
            "index": 27,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Gerona",
            "index": 28,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Deusto",
            "index": 29,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Internacional de Cataluña",
            "index": 30,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Miguel Hernández",
            "index": 31,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Málaga",
            "index": 32,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Lérida",
            "index": 33,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Pablo de Olavide",
            "index": 34,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Alfonso X",
            "index": 35,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de La Laguna",
            "index": 36,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Politécnica de Cartagena",
            "index": 37,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Cantabria",
            "index": 38,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Almería",
            "index": 39,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Camilo José Cela",
            "index": 40,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de Extremadura",
            "index": 41,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad Jaume I",
            "index": 42,
            "type": "universidad",
            "carreras": [],
          },
          {
            "universidad": "Universidad de León",
            "index": 43,
            "type": "universidad",
            "carreras": [],
          }
        ])
      }, 1000);
    })
  }

}
