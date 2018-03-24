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
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            career: "Colegio mayor ingenieria de software",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            career: "Colegio mayor filosofia",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            career: "Colegio mayor ingenieria de software",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            career: "Colegio mayor filosofia",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            career: "Colegio mayor ingenieria de software",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            career: "Colegio mayor filosofia",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            career: "Colegio mayor ingenieria de software",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            career: "Colegio mayor filosofia",
            description: "una descripcion del colegio mayor",
            location:  {
              lat: 0,
              long: 0,
            }
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            career: "Colegio mayor diseño de videojuegos y Productos Interactivos",
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
