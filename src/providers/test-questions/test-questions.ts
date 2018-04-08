import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TestQuestionsProvider {

  testQuestions: Array<Array<{question: string, answers:Array<{value: string, type: string, name: string}>}>>;

  constructor(public http: HttpClient) {
    this.testQuestions = [
      [
        {
          question: "¿Te gusta ayudar a los demás?",
          answers: [
            {
              value: "1",
              type: 'salud',
              name: "Si"
            },
            {
              value: "0",
              type: 'salud',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te preguntas cómo funcionan las cosas?",
          answers: [
            {
              value: "1",
              type: 'tecnologia',
              name: "Si"
            },
            {
              value: "0",
              type: 'tecnologia',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te relacionas bien con las personas?",
          answers: [
            {
              value: "1",
              type: 'sociales',
              name: "Si"
            },
            {
              value: "0",
              type: 'sociales',
              name: "No"
            }
          ]
        },
        {
          question: "¿Consideras que tienes buena memoria y puedes retener mucha información?",
          answers: [
            {
              value: "1",
              type: 'humanidades',
              name: "Si"
            },
            {
              value: "0",
              type: 'humanidades',
              name: "No"
            }
          ]
        },
        {
          question: "¿Sacas buenas notas en dibujo artístico?",
          answers: [
            {
              value: "1",
              type: 'arte',
              name: "Si"
            },
            {
              value: "0",
              type: 'arte',
              name: "No"
            }
          ]
        }
      ],
      [
        {
          question: "¿Sientes curiosidad por ver una operación en vivo?",
          answers: [
            {
              value: "1",
              type: 'salud',
              name: "Si"
            },
            {
              value: "0",
              type: 'salud',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te apasiona montar y desmontar aparatos?",
          answers: [
            {
              value: "1",
              type: 'tecnologia',
              name: "Si"
            },
            {
              value: "0",
              type: 'tecnologia',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te gusta escuchar?",
          answers: [
            {
              value: "1",
              type: 'sociales',
              name: "Si"
            },
            {
              value: "0",
              type: 'sociales',
              name: "No"
            }
          ]
        },
        {
          question: "¿Es para ti importante hablar idiomas?",
          answers: [
            {
              value: "1",
              type: 'humanidades',
              name: "Si"
            },
            {
              value: "0",
              type: 'humanidades',
              name: "No"
            }
          ]
        },
        {
          question: "¿Valoras la estética de las cosas?",
          answers: [
            {
              value: "1",
              type: 'arte',
              name: "Si"
            },
            {
              value: "0",
              type: 'arte',
              name: "No"
            }
          ]
        }
      ],
      [
        {
          question: "¿Eres de los que no le asusta la sangre?",
          answers: [
            {
              value: "1",
              type: 'salud',
              name: "Si"
            },
            {
              value: "0",
              type: 'salud',
              name: "No"
            }
          ]
        },
        {
          question: "¿Eres de los que no le sobran tornillos y piezas cuando cacharreas?",
          answers: [
            {
              value: "1",
              type: 'tecnologia',
              name: "Si"
            },
            {
              value: "0",
              type: 'tecnologia',
              name: "No"
            }
          ]
        },
        {
          question: "¿Sigues la actualidad y estas al día de lo que pasa en el mundo?",
          answers: [
            {
              value: "1",
              type: 'sociales',
              name: "Si"
            },
            {
              value: "0",
              type: 'sociales',
              name: "No"
            }
          ]
        },
        {
          question: "¿Se te da bien razonar, explicar y convencer con tus palabras?",
          answers: [
            {
              value: "1",
              type: 'humanidades',
              name: "Si"
            },
            {
              value: "0",
              type: 'humanidades',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te atrae diseñar objetos, muebles o moda y la creatividad marca tu personalidad?",
          answers: [
            {
              value: "1",
              type: 'arte',
              name: "Si"
            },
            {
              value: "0",
              type: 'arte',
              name: "No"
            }
          ]
        }
      ],
      [
        {
          question: "¿Jugabas de pequeño a ser médico o a vender medicamentos en tu tienda imaginaria?",
          answers: [
            {
              value: "1",
              type: 'salud',
              name: "Si"
            },
            {
              value: "0",
              type: 'salud',
              name: "No"
            }
          ]
        },
        {
          question: "¿Consideras que tu teléfono móvil tiene funciones más importantes que jugar, chatear o ver videos y fotos?",
          answers: [
            {
              value: "1",
              type: 'tecnologia',
              name: "Si"
            },
            {
              value: "0",
              type: 'tecnologia',
              name: "No"
            }
          ]
        },
        {
          question: "¿Denuncias y luchas contra las injusticias?",
          answers: [
            {
              value: "1",
              type: 'sociales',
              name: "Si"
            },
            {
              value: "0",
              type: 'sociales',
              name: "No"
            }
          ]
        },
        {
          question: "¿Eres delegado de clase o capitán de tu equipo?",
          answers: [
            {
              value: "1",
              type: 'humanidades',
              name: "Si"
            },
            {
              value: "0",
              type: 'humanidades',
              name: "No"
            }
          ]
        },
        {
          question: "¿Oyes música con los ruidos y con las letras haces canciones?",
          answers: [
            {
              value: "1",
              type: 'arte',
              name: "Si"
            },
            {
              value: "0",
              type: 'arte',
              name: "No"
            }
          ]
        }
      ],
      [
        {
          question: "¿Te entretiene mirar por el microscopio y diseccionar bichos en en Laboratorio?",
          answers: [
            {
              value: "1",
              type: 'salud',
              name: "Si"
            },
            {
              value: "0",
              type: 'salud',
              name: "No"
            }
          ]
        },
        {
          question: "¿Conoces más de cinco nombres de inventores?",
          answers: [
            {
              value: "1",
              type: 'tecnologia',
              name: "Si"
            },
            {
              value: "0",
              type: 'tecnologia',
              name: "No"
            }
          ]
        },
        {
          question: "¿Te atraen los logos, las marcas y la imagen de los productos?",
          answers: [
            {
              value: "1",
              type: 'sociales',
              name: "Si"
            },
            {
              value: "0",
              type: 'sociales',
              name: "No"
            }
          ]
        },
        {
          question: "¿Están en tu vocabulario las palabras como acción, Bolsa, Wall Street o broker y reúnes el dinero de los amigos para pagar cuando salís?",
          answers: [
            {
              value: "1",
              type: 'humanidades',
              name: "Si"
            },
            {
              value: "0",
              type: 'humanidades',
              name: "No"
            }
          ]
        },
        {
          question: "¿Llevas siempre un libro bajo el brazo y ahorras para ir al cine o al teatro?",
          answers: [
            {
              value: "1",
              type: 'arte',
              name: "Si"
            },
            {
              value: "0",
              type: 'arte',
              name: "No"
            }
          ]
        }
      ]
    ]
  }

  getTotalLength() {
    return [].concat.apply([], this.testQuestions).length;
  }

  getQuestions() {
    return this.testQuestions;
  }

}
