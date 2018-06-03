import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { LoginPage } from '../login/login';
// import { PretestPage } from '../pretest/pretest';
// import { RegisterPictureStepPage } from '../register-picture-step/register-picture-step';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('registeremail') input: {[key: string]: any};
  ages: Array<number>
  avatars: Array<string>
  avatar: number;
  user: {[key: string]: any};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  accept: boolean;
  privacyPolicyTemplate: string;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toasterService: ToasterProvider, public loaderService: LoaderProvider, public alertCtrl: AlertController ) {
    this.ages = Array.from(Array(100).keys()).slice(14, 100);
    this.user = {};

    this.avatar = 0;
    this.avatars = ['assets/imgs/avatar/1.png','assets/imgs/avatar/2.png','assets/imgs/avatar/3.png','assets/imgs/avatar/4.png','assets/imgs/avatar/5.png','assets/imgs/avatar/6.png','assets/imgs/avatar/7.png','assets/imgs/avatar/8.png','assets/imgs/avatar/9.png','assets/imgs/avatar/10.png','assets/imgs/avatar/11.png'];

    this.privacyPolicyTemplate = `
    <div class="iub_content legal_pp">
      <div class="iub_header">
        <h1>Política de privacidad de <strong>wikigrado</strong></h1>
        <p>Esta Aplicación recoge algunos Datos Personales de sus Usuarios.</p>
      </div>
      <div class="simple_pp">
        <div class="one_line_col">
          <h2 style="text-align: center; font-variant:small-caps;">Resumen de la política de privacidad</h2>
        </div>
        <h2 id="purposes_data">Datos Personales recogidos para las siguientes finalidades y utilizando los siguientes servicios:</h2>
        <ul class="for_boxes cf">
          <li class="one_line_col">
            <ul class="for_boxes">
              <li>
                <div class="iconed policyicon_purpose_17">
                  <h3> Interacciones basadas en la localización</h3>
                  <ul class="unstyled">
                    <li>
                      <h3>Geolocalización no continua</h3>
                      <p>Datos Personales: posición geográfica</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="iconed policyicon_purpose_5">
                  <h3>Estadísticas</h3>
                  <ul class="unstyled">
                    <li>
                      <h3>Google Analytics</h3>
                      <p>Datos Personales: Cookies y Datos de uso</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="iconed policyicon_purpose_9">
                  <h3>Registro y autenticación</h3>
                  <ul class="unstyled">
                    <li>
                      <h3>Registro directo</h3>
                      <p>Datos Personales: apellido(s), dirección, dirección de correo electrónico, fecha de nacimiento (edad), nombre y password</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="one_line_col">
        <h2 style="text-align: center; font-variant:small-caps;">Política de privacidad completa</h2>
      </div>
      <div class="one_line_col">
        <h2 id="owner_of_the_data">Titular y Responsable del tratamiento de los Datos</h2>
      </div>
      <div class="one_line_col">
        <h2 id="types_of_data">Clases de Datos recogidos</h2>
        <p>
          Entre las clases de Datos Personales que recoge esta Aplicación, ya sea directamente o a través de terceros, se encuentran:
          Cookies, Datos de uso, posición geográfica, nombre, apellido(s), fecha de nacimiento, dirección, dirección de correo electrónico y password.
        </p>
        <p>La información completa referente a cada categoría de Datos Personales que se recogen se proporciona en las secciones de la presente política de privacidad dedicadas a tal fin o mediante textos explicativos específicos que se muestran antes de la recogida de dichos Datos.<br>
          Los Datos Personales podrán ser proporcionados libremente por el Usuario o, en caso de los Datos de Uso, serán recogidos automáticamente cuando se utilice esta Aplicación.<br>
          Todos los Datos solicitados por esta Aplicación son obligatorios y la negativa a proporcionarlos podrá imposibilitar  que esta Aplicación pueda proceder a la prestación del Servicio. En los casos en los que esta Aplicación indique específicamente que ciertos Datos no son obligatorios, los Usuarios serán libres de no comunicar tales Datos sin que esto tenga consecuencia alguna sobre la disponibilidad o el funcionamiento del Servicio.
          Los Usuarios que tengan dudas sobre qué Datos son obligatorios pueden contactar con el Titular.<br>
          El uso de Cookies - o de otras herramientas de seguimiento - por parte de esta Aplicación o por los titulares de servicios de terceros utilizados por esta Aplicación tiene como finalidad la prestación del Servicio solicitado por el Usuario, además de cualesquiera otras finalidades que se describan en el presente documento y en la Política de Cookies, en caso de estar disponible. <br>
        </p>
        <p>
          El Usuario asume la responsabilidad respecto de los Datos Personales de terceros que se obtengan, publiquen o compartan a través de esta Aplicación y declara por la presente que tiene el consentimiento de dichos terceros para proporcionar dichos Datos al Titular.
        </p>
      </div>
      <div class="one_line_col">
        <h2 id="place_of_processing">Modalidad y lugar del tratamiento de los Datos recogidos</h2>
        <h3>Modalidades de Tratamiento</h3>
        <p>El Titular tratará los Datos de los Usuarios de manera adecuada y adoptará las medidas de seguridad apropiadas para impedir el acceso, la revelación, alteración o destrucción no autorizados de los Datos.<br>
          El tratamiento de Datos se realizará mediante ordenadores y/o herramientas informáticas, siguiendo procedimientos y modalidades organizativas estrictamente relacionadas con las finalidades señaladas. Además del Titular, en algunos casos podrán acceder a los Datos ciertas categorías de personas autorizadas, relacionadas con el funcionamiento de esta Aplicación (administración, ventas, marketing, departamento jurídico y de administración de sistemas) o contratistas externos que presten servicios al Titular (tales como proveedores externos de servicios técnicos, empresas de mensajería, empresas de hosting, empresas de informática, agencias de comunicación) que serán nombrados por el Titular como Encargados del Tratamiento, si fuera necesario. Se podrá solicitar al Titular en cualquier momento una lista actualizada de dichas personas.</p>
        <h3>Bases legales del Tratamiento</h3>
        <p>El Titular podrá tratar los Datos Personales del Usuario,  si se cumple una de las siguientes condiciones:</p>
        <ul>
          <li>Cuando los Usuarios hayan dado su consentimiento para una o más finalidades específicas. Aviso: Al amparo de varias legislaciones diferentes, el Titular podrá estar autorizado a tratar los Datos Personales hasta en tanto el Usuario se oponga a ello (“rechazar”), sin necesidad de consentimiento o cualquier otra base legal. No será de aplicación, cuando el tratamiento de los Datos Personales esté sujeto a la normativa europea en materia de protección de Datos Personales;</li>
          <li>Cuando la obtención de Datos sea necesaria para el cumplimiento de un contrato entre el Usuario y/o cualquier otra obligación precontractual del mismo;</li>
          <li>Cuando el tratamiento sea necesario para el cumplimiento de una obligación legal de obligado cumplimiento por parte del Usuario;</li>
          <li>Cuando el tratamiento esté relacionado con una tarea ejecutada en interés público o en el ejercicio de competencias oficiales otorgadas al Titular;</li>
          <li>Cuando el tratamiento sea necesario con el fin de un interés legítimo perseguido por el Titular o un tercero.</li>
        </ul>
        <p>En cualquier caso, el Titular estará dispuesto a esclarecer las bases legales específicas que se aplican al tratamiento y en particular, si la obtención de los Datos Personales es un requisito contractual o estatutario o un requisito necesario para formalizar un contrato.</p>
        <h3>Lugar</h3>
        <p>Los Datos se tratan en las oficinas del Titular, así como en cualquier otro lugar en el que se encuentren situadas las partes implicadas en dicho proceso de tratamiento.<br>
          Dependiendo de la localización de los Usuarios, las transferencias de Datos pueden implicar la transferencia de los Datos de los Usuarios a otro país diferente al suyo propio. Para más información sobre el lugar de tratamiento de dichos Datos transferidos, los Usuarios podrán consultar la sección que contiene los detalles sobre el tratamiento de los Datos Personales.</p>
        <p>Los Usuarios también tendrán derecho a conocer las bases legales de las transferencias de Datos a otro país fuera de la Unión Europea o a cualquier organismo internacional que se rija por el Derecho Público Internacional o que esté formado por dos o más países, como la ONU, y además conocer las medidas de seguridad tomadas por el Titular para salvaguardar sus Datos.<br><br>
            En caso de que tuviera lugar dicha transferencia de Datos, los Usuarios podrán obtener más información consultando las secciones relevantes del presente documento o solicitándola al Titular, a través de la información de contacto que aparece en la sección de contacto.</p>
        <h3>Período de conservación</h3>

        <p>Los Datos Personales serán tratados y conservados durante el tiempo necesario y para la finalidad por la que han sido recogidos.</p>
        <p>Por lo tanto:</p>
        <ul>
          <li>Los Datos Personales recogidos para la formalización de un contrato entre el Titular y el Usuario deberán conservarse como tales hasta en tanto dicho contrato se haya formalizado por completo.</li>
          <li>Los Datos Personales recogidos en legítimo interés del Titular deberán conservarse durante el tiempo necesario para cumplir con dicha finalidad. Los Usuarios pueden encontrar información específica relacionada con el interés legítimo del Titular consultando las secciones relevantes del presente documento o contactando con el Titular. </li>
        </ul>
        <p>El Titular podrá conservar los Datos Personales durante un periodo adicional cuando el Usuario preste su consentimiento a tal tratamiento, siempre que dicho consentimiento siga vigente. Además, el Titular estará obligado a conservar Datos Personales durante un periodo adicional siempre que se precise para el cumplimiento de una obligación legal o por orden que proceda de la autoridad.<br><br>
          Una vez terminado el período de conservación, los Datos Personales deberán eliminarse. Por lo tanto, los derechos de acceso, modificación, rectificación y portabilidad de datos no podrán ejercerse una vez haya expirado dicho periodo.</p>
      </div>
      <div class="one_line_col">
        <h2 id="use_collected_data">Finalidad del Tratamiento de los Datos recogidos</h2>
        <p>Los Datos relativos al Usuario son recogidos para permitir al Titular la prestación de sus Servicios, así como para las siguientes finalidades: Estadísticas,  Interacciones basadas en la localización y Registro y autenticación.</p>
        <p>Los Usuarios pueden encontrar información detallada sobre tales finalidades del tratamiento y sobre los Datos Personales específicos utilizados para cada finalidad en las respectivas secciones del presente documento.</p>
      </div>
      <div class="one_line_col">
        <h2 id="data_processing_detailed_info">Información detallada del Tratamiento de los Datos Personales</h2>
        <p>Los Datos Personales se recogen para las siguientes finalidades y utilizando los siguientes servicios:</p>
        <ul class="for_boxes">
          <li>
            <div class="box_primary box_10 expand collapsed">
              <h3 class="expand-click w_icon_24 policyicon_purpose_5145300"> Interacciones basadas en la localización</h3>
              <div class="expand-content" style="display: none;">
                <h4>Geolocalización no continua (esta Aplicación)</h4>
                <div class="wrap">
                  <p>Esta Aplicación puede recoger, utilizar y compartir los Datos relativos a la localización geográfica del Usuario, con la finalidad de prestarle servicios basados en dicha localización.<br>
                  La mayoría de los navegadores y dispositivos proporcionan de modo predefinido medios para desactivar el rastreo geográfico. Si el Usuario ha dado su autorización expresa a tal posibilidad, esta Aplicación podrá recibir información sobre su localización geográfica real.<br>
                  La localización geográfica del Usuario se determina de forma no continua, ya sea a solicitud expresa del Usuario o cuando el Usuario no indica su localización actual en el campo adecuado y permite a la aplicación que detecte la posición automáticamente.</p>
                </div>
                <p>
                  Datos Personales recogidos:
                  posición geográfica.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box_primary box_10 expand collapsed">
              <h3 class="expand-click w_icon_24 policyicon_purpose_5145299">Estadísticas</h3>
              <div class="expand-content" style="display: none;">
                <p>Los servicios contenidos en esta sección permiten al Titular monitorizar y analizar el tráfico web y pueden ser utilizados para rastrear el comportamiento del Usuario.</p>
                <h4>Google Analytics (Google Inc.)</h4>
                <div class="wrap">
                  <p>Google Analytics es un servicio de análisis web prestado por Google Inc. (“Google”). Google utiliza los Datos recogidos para rastrear y examinar el uso de esta Aplicación, para preparar informes de sus actividades y compartirlos con otros servicios de Google.<br>
                    Google puede utilizar los Datos recogidos para contextualizar y personalizar los anuncios de su propia red de publicidad.</p>
                </div>
                <p>
                  Datos Personales recogidos:
                  Cookies y Datos de uso.
                </p>
                <p>
                  Lugar de tratamiento:
                  EE.UU.
                  –
                  <a href="https://www.google.com/intl/es/policies/privacy/" target="_blank" rel="noopener noreferrer">Política de privacidad</a> – <a href="https://tools.google.com/dlpage/gaoptout?hl=es" onclick="javascript:return tryFunc('tryGaOptOut',{href:'https://tools.google.com/dlpage/gaoptout?hl=es'})" target="_blank">Opt Out</a>.
                  Integrante del acuerdo „Privacy Shield”.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box_primary box_10 expand collapsed">
              <h3 class="expand-click w_icon_24 policyicon_purpose_5145305">Registro y autenticación</h3>
              <div class="expand-content" style="display: none;">
                <p>Al registrarse o autenticarse, el Usuario permite que esta Aplicación le identifique y le dé acceso a los servicios dedicados.<br>
                  Dependiendo de lo indicado a continuación, los servicios de registro y autenticación podrán ser prestados por la asistencia de terceros. En tal caso, esta Aplicación podrá  acceder a algunos Datos almacenados por el servicio de terceros utilizado para el registro o autenticación.
                </p>
                <h4>Registro directo (esta Aplicación)</h4>
                <div class="wrap">
                  <p>El Usuario se registra rellenando el formulario de registro y proporcionando sus Datos Personales directamente a esta Aplicación.</p>
                </div>
                <p>
                  Datos Personales recogidos:
                  apellido(s), dirección, dirección de correo electrónico, fecha de nacimiento, nombre y password.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="one_line_col">
        <h2>Los derechos de los Usuarios</h2>
        <p>Los Usuarios podrán ejercer ciertos derechos con respecto al tratamiento de Datos por parte del Titular.</p>
        <p>Especialmente, los Usuarios tienen derecho a hacer lo siguiente:</p>
        <ul>
          <li><b>Retirar su consentimiento en cualquier momento.</b> Los Usuarios tienen derecho a retirar su consentimiento cuando lo hubieran concedido con anterioridad para el tratamiento de sus Datos Personales.</li>
          <li><b>Objeción al tratamiento de sus Datos.</b> Los Usuarios tienen derecho a oponerse al tratamiento de sus Datos, si dicho tratamiento se lleva a cabo con arreglo a una base legal distinta al consentimiento. Para más información, dirigirse a la sección correspondiente, más adelante.</li>
          <li><b>Acceso a sus Datos.</b> Los Usuarios tienen derecho a conocer si sus Datos serán tratados por el Titular, a obtener información sobre ciertos aspectos del tratamiento, además de obtener una copia de los Datos objeto del tratamiento.</li>
          <li><b>Verificar y solicitar la modificación.</b> Los Usuarios tienen derecho a verificar la exactitud de sus Datos y solicitar que los mismos se actualicen o corrijan.</li>
          <li><b>Restringir el tratamiento de sus Datos.</b> Los Usuarios tienen derecho, en ciertos supuestos, a restringir el tratamiento de sus Datos. En ese supuesto, el Titular procesará sus Datos con el único propósito de almacenarlos.</li>
          <li><b>Borrar o eliminar los Datos Personales.</b> Los Usuarios tienen derecho, en ciertos supuestos, a obtener la eliminación de sus Datos por parte del Titular.</li>
          <li><b>Recibir sus Datos y transferirlos a otro responsable.</b> Los Usuarios tienen derecho a recibir sus Datos en un formato estándar, estructurado, mecánicamente legible y, si fuera técnicamente posible, a que se dé traslado de los mismos a otro responsable sin ningún impedimento. Esta provisión será de aplicación siempre que los Datos se hayan tratado a través de medios automatizados y que el tratamiento se base en el consentimiento del Usuario, en un contrato del que el Usuario forme parte o que aparezca en las obligaciones precontractuales del mismo.</li>
          <li><b>Poner una reclamación.</b> Los Usuarios tienen derecho a poner una reclamación ante la autoridad competente en materia de protección de datos de carácter personal.</li>
        </ul>
        <h3>Detalles sobre el derecho de oposición al tratamiento</h3>
        <p>Cuando el tratamiento de los Datos Personales sea de interés público, en el ejercicio de competencias oficiales otorgadas al Titular o con motivo de un interés legítimo del Titular, los Usuarios podrán oponerse a dicho tratamiento explicando un motivo con relación a su situación particular para justificar su objeción.</p>
        <p>Los Usuarios deben saber que, sin embargo, en caso de que sus Datos Personales sean tratados con fines comerciales, pueden oponerse en cualquier momento a tal tratamiento sin necesidad de justificación. Para saber si los Datos Personales de los Usuarios están siendo tratados por parte del Titular para fines comerciales, éstos deberán consultar las secciones relevantes del presente documento.</p>
        <h3>Cómo ejercer estos derechos</h3>
        <p>Cualquier solicitud para ejercer los derechos del Usuario puede dirigirse al Titular a través de los datos de contacto facilitados en el presente documento. Dichas solicitudes serán tramitadas por el Titular sin coste alguno tan pronto como le sea posible y siempre dentro del plazo de un mes.</p>
      </div>
      <div class="one_line_col">
        <h2 id="further_data_processing_info">Información adicional sobre la recogida de Datos y su tratamiento</h2>
        <h3>Defensa jurídica</h3>
        <p>
          Los Datos Personales del Usuario podrán ser utilizados para la defensa jurídica del Titular ante un tribunal o en las fases judiciales previas a un posible pleito derivado del uso inapropiado de esta Aplicación o de los Servicios relacionados.<br>
          El Usuario declara conocer que el Titular puede ser requerido por las autoridades públicas a fin de revelar Datos Personales.
        </p>
        <h3>Información adicional acerca de los Datos Personales del Usuario</h3>
        <p>
          Además de las informaciones contenidas en esta política de privacidad, esta Aplicación podrá proporcionar al Usuario información adicional y contextual relativa a Servicios específicos o a la recogida y tratamiento de los Datos Personales.
        </p>
        <h3>Log del sistema y mantenimiento</h3>
        <p>
          Por motivos relativos al funcionamiento y mantenimiento,  esta Aplicación y cualquier otro servicio, proporcionado por terceros, que se utilice, podrá recoger un registro del sistema; es decir, archivos que registren la interacción con esta Aplicación  y que puedan contener Datos Personales, tales como la dirección IP del Usuario.
        </p>
        <h3>Información no contenida en esta política de privacidad</h3>
        <p>
          Se podrá solicitar en cualquier momento información adicional sobre la recogida y el tratamiento de los Datos Personales al Titular. La información de contacto se indica al inicio del presente documento.
        </p>
        <h3>Cómo se procesan las solicitudes „Do Not Track”</h3>
        <p>
          Esta Aplicación no permite solicitudes “Do Not Track”.<br>Para determinar si cualquiera de los servicios de terceros que utiliza acepta solicitudes “Do Not Track”, por favor lea sus políticas de privacidad.
        </p>
        <h3>Modificación de la presente política de privacidad</h3>
        <p>
          El Titular se reserva el derecho de modificar esta política de privacidad en cualquier momento, notificándolo a los Usuarios a través de esta página y, a ser posible, a través de esta Aplicación y/o de ser técnica y legalmente posible notificando directamente a los Usuarios, en caso de que el Titular cuente con la información de contacto necesaria a tal fin. Se recomienda encarecidamente que revisen esta página con frecuencia, tomando como referencia la fecha de la última actualización indicada al final de la página.<br><br>
          En el caso de que los cambios afectasen a las actividades de tratamiento realizadas en base al consentimiento del Usuario, el Titular deberá obtener, si fuera necesario, el nuevo consentimiento del Usuario.
        </p>
      </div>
      <div class="one_line_col">
        <div class="box_primary box_10 definitions expand expanded">
          <h3 class="expand-click w_icon_24 icon_ribbon">
            Definiciones y referencias legales
          </h3>

          <div class="expand-content" style="display: block;">
            <h4>Datos Personales (o Datos)</h4>
            <p>Constituye un dato personal cualquier información que, directa, indirectamente o en relación con otra información – incluyendo un número de identificación personal – permita identificar una persona física.</p>
            <h4>Datos de Uso</h4>
            <p>Las informaciones recogidas de forma automática por esta Aplicación (o por servicios de terceros utilizados por esta Aplicación), podrán incluir: las direcciones IP o nombres de dominio de los ordenadores utilizados por el Usuario que se conecte a esta Aplicación, las direcciones URI (Uniform Resource Identifier), la hora de la solicitud, el método utilizado para realizar la solicitud al servidor, las dimensiones del archivo obtenido en respuesta, el código numérico indicando el estado de la respuesta del servidor (resultado satisfactorio, error, etc.), el país de origen, las características del navegador y del sistema operativo utilizados por el visitante, las diversas coordenadas temporales de la visita (por ejemplo, el tiempo de permanencia en cada una de las páginas) y los detalles relativos al itinerario seguido dentro de la Aplicación, con especial referencia a la secuencia de páginas consultadas, a los parámetros relativos al sistema operativo y al entorno informático del Usuario.
            </p>
            <h4>Usuario</h4>
            <p>El individuo que utilice esta Aplicación, quien, a menos que se indique lo contrario deberá coincidir con el Titular de los Datos.</p>
            <h4>Titular de los Datos</h4>
            <p>La persona física a la que se refieren los Datos Personales.</p>
            <h4>Encargado del Tratamiento (o Supervisor de Datos)</h4>
            <p>La persona física o jurídica, administración pública, agencia o cualquier otra institución, que procese los Datos Personales en nombre del Responsable del Tratamiento, descrita en la presente política de privacidad.</p>
            <h4>Responsable del Tratamiento (o Titular)</h4>
            <p>La persona física o jurídica, administración pública, agencia o cualquier otra institución, que actuando en solitario o conjuntamente con otras, determine las finalidades y las medidas del tratamiento de los Datos Personales, incluyendo las medidas de seguridad relativas al funcionamiento y al uso de esta Aplicación. A menos que se especifique lo contrario, el Responsable del Tratamiento es el Titular de esta Aplicación.</p>
            <h4>
              Esta Aplicación
            </h4>
            <p>El medio a través del cual se han recogido y tratado los Datos Personales del Usuario.</p>
            <h4>Servicio</h4>
            <p>El servicio proporcionado por esta Aplicación, tal y como se describe en las definiciones y referencias legales (en caso de estar disponibles) y en esta página o aplicación.</p>
            <h4>Unión Europea (o UE)</h4>
            <p>A menos que se indique lo contrario, todas las referencias hechas a la Unión Europea en el presente documento incluyen todos los actuales Estados miembros de la Unión Europea y del Espacio Económico Europeo.</p>
            <h4>Cookies</h4>
            <p>Pequeñas unidades de datos almacenados en el dispositivo del Usuario.</p>
            <hr>
            <h4>Información legal</h4>
            <p>Esta política de privacidad se ha redactado en base a las provisiones de múltiples legislaciones, incluyendo los Arts. 13 y 14 del Reglamento (UE) 2016/679 (Reglamento general de protección de datos).</p>
            <p>Esta política de privacidad se refiere sólo a esta Aplicación, a menos que se indique lo contrario en el presente documento.</p>
          </div>
        </div>
      </div>
      <div class="iub_footer">
        <p>Última revisión:  3 junio 2018</p>
        <p>
          <a href="//www.iubenda.com" title="iubenda – generador de Políticas de Privacidad" target="_blank">iubenda</a> aloja este contenido y únicamente recoge
          <a href="//www.iubenda.com/privacy-policy/877900" target="_blank">los Datos Personales que sean estrictamente necesarios</a> para prestar este servicio
        </p>
      </div>
    </div>

    `;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  slideChanged() {
    this.avatar = this.slides.getActiveIndex();
  }

  register() {
    this.loaderService.showLoader({content:'registrando...'});
    this.userService.register({...this.user, avatar: this.avatar}, (success, error) => {
      this.loaderService.hideLoader();
      if (error) {
        switch (error.error) {
          case 'retryToast':
          case 'error':
          case 1:
            return this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
          case 'emailTakenToast':
            return this.toasterService.showToast({message: 'Ya existe un usuario con este email'});
        }
      } else {
        this.registerSuccessAlert();
        // this.toasterService.showToast({message: '', duration: 10000});
        // this.navCtrl.setRoot(PretestPage);
      }
    });
  }

  registerSuccessAlert() {
    const alert = this.alertCtrl.create({
      title: 'Valida tu email',
      subTitle: 'Solo falta un paso para que tu registro sea completo, ve a tu casilla de correo y valida el email que ingresaste.',
      buttons: [{
        text: 'Ir al login',
        role: 'accept',
        handler: data => {
          this.navCtrl.push(LoginPage)
        }
      }]
    });
    alert.present();
  }

  checkEmail() {
    if (this.user.email && this.input.valid) {
      this.userService.checkEmail(this.user.email, (type) => {
        if (type === 'not-available') {
          this.toasterService.showToast({message: 'Ya existe un usuario con este email'});
        } else if (type === 'error') {
          this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
        }
      })
    }
  }

  seePrivacyPolicy() {
    const confirm = this.alertCtrl.create({
      title: 'Politicas de Privacidad',
      message: this.privacyPolicyTemplate,
      buttons: [
        {
          text: 'No Acepto',
          handler: () => {
            this.accept = false;
          }
        },
        {
          text: 'Acepto',
          handler: () => {
            this.accept = true;
          }
        }
      ]
    });
    confirm.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
