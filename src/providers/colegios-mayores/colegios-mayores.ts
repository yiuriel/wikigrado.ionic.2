import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ColegiosMayoresProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ColegiosMayoresProvider Provider');
  }

  getVideos() {
    return new Promise<Array<any>>((resolve, rejec) => {
      setTimeout(() => {
        resolve([
          {
            videoUrl: 'https://player.vimeo.com/video/250951635',
            "hasVideo": true,
            career: "Colegio mayor ingenieria de software",
            "index": 0,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728',
            "hasVideo": true,
            career: "Colegio mayor filosofia",
            "index": 1,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750',
            "hasVideo": true,
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            "index": 2,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635',
            "hasVideo": true,
            career: "Colegio mayor ingenieria de software",
            "index": 3,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728',
            "hasVideo": true,
            career: "Colegio mayor filosofia",
            "index": 4,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750',
            "hasVideo": true,
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            "index": 5,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635',
            "hasVideo": true,
            career: "Colegio mayor ingenieria de software",
            "index": 6,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728',
            "hasVideo": true,
            career: "Colegio mayor filosofia",
            "index": 7,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750',
            "hasVideo": true,
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            "index": 8,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635',
            "hasVideo": true,
            career: "Colegio mayor ingenieria de software",
            "index": 9,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728',
            "hasVideo": true,
            career: "Colegio mayor filosofia",
            "index": 10,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750',
            "hasVideo": true,
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            "index": 11,
            "type": "colegio_mayor",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          }
        ])
      }, 2500);
    })
  }

}
