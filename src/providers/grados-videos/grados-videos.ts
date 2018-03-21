import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GradosVideosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GradosVideosProvider Provider');
  }

  getVideos() {
    return new Promise<Array<any>>((resolve, rejec) => {
      setTimeout(() => {
        resolve([
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            hasVideo: true,
            career: "Grado en ingenieria de software",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            hasVideo: true,
            career: "Grado en filosofia",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            hasVideo: true,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            hasVideo: true,
            career: "Grado en ingenieria de software",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            hasVideo: true,
            career: "Grado en filosofia",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            hasVideo: true,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            hasVideo: true,
            career: "Grado en ingenieria de software",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            hasVideo: true,
            career: "Grado en filosofia",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            hasVideo: true,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
            hasVideo: true,
            career: "Grado en ingenieria de software",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
            hasVideo: true,
            career: "Grado en filosofia",
          },
          {
            videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
            hasVideo: true,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          },
          {
            videoUrl: null,
            hasVideo: false,
            career: "Grado en diseño de videojuegos y Productos Interactivos",
          }
        ])
      }, 2500);
    })
  }

}
