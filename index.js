window.onload = function () {
  initIframe();
};

// events available
const EVENT_MODULE = {
  INIT_MODULE: "INIT_MODULE",
  PROCESS_INIT: "PROCESS_INIT",
  PROCESS_ERROR: "PROCESS_ERROR",
  PROCESS_COMPLETED: "PROCESS_COMPLETED",
  MODULE_READY: "MODULE_READY",
  SKIP_FINGERPRINTS: "SKIP_FINGERPRINTS"
};
// optional, by default use 30000 miliseconds
const CAPTURE_TIMEOUT = 30000;
// optional, by default use LF4
const DETECTION_MODES = {
  L4F: 'L4F',
  LEFT_INDEX: 'LEFT_INDEX',
  LEFT_MIDDLE: 'LEFT_MIDDLE',
  LEFT_RING: 'LEFT_RING',
  LEFT_LITTLE: 'LEFT_LITTLE',
  LEFT_THUMB: 'LEFT_THUMB',
  R4F: 'R4F',
  RIGHT_INDEX: 'RIGHT_INDEX',
  RIGHT_MIDDLE: 'RIGHT_MIDDLE',
  RIGHT_RING: 'RIGHT_RING',
  RIGHT_LITTLE: 'RIGHT_LITTLE',
  RIGHT_THUMB: 'RIGHT_THUMB',
};


// optional, the app has default legends and colors
const CONFIGURATION = {
  views: {
    instructions: true
  },
  customization: {
    fadCustomization: {
      colors: {
        primary: "#A70635",
        secondary: "#A70635",
        tertiary: "#363636",
      },
      buttons: {
        primary: {
          backgroundColor: "#A70635",
          backgroundColorDisabled: "#dcdcdc",
          labelColor: "#ffffff",
          labelColorDisabled: "#8e8e8e",
          border: "1px solid #A70635",
        },
      },
      fonts: {
        title: {
          fontSize: '25px',
          fontFamily: 'system-ui'
        },
        subtitle: {
          fontSize: '17px',
          fontFamily: 'system-ui'
        },
        content: {
          fontSize: '15px',
          fontFamily: 'system-ui'
        },
        informative: {
          fontSize: '12px',
          fontFamily: 'system-ui'
        },
        button: {
          fontSize: '17px',
          fontFamily: 'system-ui'
        }
      }
    },
    moduleCustomization: {
      legends: {
        identy: {
          FEEDBACK_RETRY: "Algo salió mal, favor de reintentar",
          FEEDBACK_SEARCHING: 'Buscando...',
          FEEDBACK_INSIDE_GUIDE: 'Por favor esté dentro de la guía',
          FEEDBACK_PLEASE_HOLD: 'Mantenga ',
          FEEDBACK_PLEASE_HOLD_FLASH: 'Mantenga para el flash',
          FEEDBACK_PLEASE_MOVE: 'Por favor mueva los dedos ligeramente, mejora el enfoque',
          FEEDBACK_PLEASE_MOVE_2: 'Espere al enfoque',
          FEEDBACK_PLEASE_MOVE_IOS_2: 'Vuelve a colocar los dedos <br> para mejorar el enfoque.',
          FEEDBACK_NO_FINGERS: "Buscando mano {0}",
          FEEDBACK_STABLE: 'Por favor no se mueva',
          FEEDBACK_HAND_FAR: 'Acerca la mano',
          FEEDBACK_HAND_CLOSE: 'Mueva y aleje la mano',
          FEEDBACK_CAMERA_ACQUIRING_FAILED: 'No se puede acceder a la cámara, permita permiso o reintente la captura',
          FEEDBACK_INITIALIZATION: 'iniciando',
          FEEDBACK_NEXT_DETECTION: '¿Continuar a la siguiente mano?',
          FEEDBACK_ORIENTATION_NOT_SUPPORTED: 'Solo se admite el modo Retrato',
          FEEDBACK_CAPTURING: 'Capturando',
          FEEDBACK_CAPTURED: 'Capturada',
          FEEDBACK_BLURRY: "Calidad borrosa, reintentar captura",
          FEEDBACK_BLURRY_NO_FLASH: "La iluminación no era adecuada, vuelva a intentarlo en un lugar más iluminado.",
          FEEDBACK_RETRY_QUALITY: "Mala calidad, reintentar captura",
          FEEDBACK_RETRY_QUALITY_NO_FLASH: 'La iluminación no era la adecuada. Vuelva a intentarlo en una ubicación mejor.',
          FEEDBACK_RETRY_ERROR: 'Mala calidad, reintentar captura',
          FEEDBACK_FINGER_QUALITY: 'Calidad del dedo, reintentar captura',
          FEEDBACK_LICENCE_INVALID: 'Licencia invalida',
          FEEDBACK_DIALOG_CLOSED: '',
          FEEDBACK_CAPTURE_TIMEOUT: 'Mano no detectada, ¿Reintentar?',
          FEEDBACK_PROCESSING: 'procesando',
          FEEDBACK_BUTTON_CLOSE: "Cerrar",
          FEEDBACK_BUTTON_RETRY: "Reintentar",
          FEEDBACK_TRAINING_BUTTON_NEXT: 'Siguiente',
          FEEDBACK_TRAINING_LABEL: 'No volver a mostrar',
          FEEDBACK_NO_FLASH: 'Asegúrate de estar en un lugar iluminado',
          FEEDBACK_TRAINING_DIALOG_CLOSED: 'Proceso cancelado',
          FEEDBACK_DETECTION_ERROR: 'Ocurrió un error de detección',
          FEEDBACK_CHANGE_LOCATION: 'Cambie de lugar, para mejorar el enfoque',
          FEEDBACK_CHANGE_LOCATION_IOS: "Cambie de ubicación, con mejor luz",
          ERROR_BROWSER_NOT_SUPPORTED: 'Navegador no compatible. Actualice su navegador.',
          ERROR_URL_NOT_SUPPORTED: 'URL no admitida, se requiere que la URL sea https o "localhost"',
          ERROR_WEBRTC_NOT_SUPPORTED: 'Webrtc no soportado',
          ERROR_DETECTION_CANCELLED: 'Próxima detección cancelada',
          ERROR_MODEL_FAIL: "Error en la detección del modelo",
          ERROR_INTERNAL_SERVER: "Error Interno del Servidor",
          ERROR_DEVICE_NOT_SUPPORTED: 'Device not supported',
          ERROR_REQUEST_EXPIRED: 'La solicitud ha caducado, inténtalo de nuevo.',
          ERROR_DECRYPTION_FAILED: 'Error de integridad',
          ERROR_SERVER_CONNECTION_FAILURE: 'Server connection failure',
          FEEDBACK_ENROLLED: "Registrado correctamente",
          FEEDBACK_ALREADY_ENROLLED: 'Id de sesión ya registrado',
          BUTTON: {
            OK: 'Ok',
            CANCEL: 'Cancelar'
          },
          HAND: {
            LEFT: 'izquierda',
            RIGHT: 'derecha'
          }
        },
      },
      legendsInstructions: {
        title: 'Huellas',
        subtitle: 'Tomaremos unas capturas de tus huellas',
        buttonNext: 'Comenzar',
        instructions: 'Tengo problemas para realizar la captura de mis huellas'
      }
    },
  },
  pathDependencies: {
    // imageDirectory: 'ASSETS_URL/'
  }
};

// errors
const ERROR_CODE = {
  NO_MODEL_URL: -1,
  NO_FINGERS: -2,
  IDENTY_GENERIC: -3,
  ORIENTATION: -4,
  DEVICE_BROWSER_ERROR: 100,
  ERROR_WEBRTC_NOT_SUPPORTED: 101,
  ERROR_BROWSER_VERSION_NOT_SUPPORTED: 103,
  FEEDBACK_CAMERA_ACQUIRING_FAILED: 104,
  FEEDBACK_RETRY: 401,
  FEEDBACK_RETRY_INSECURE: 408,
  SERVER_ERROR: 500,
  TIMEOUT_CAPTURE: 501,
  FEEDBACK_LICENSE_INVALID: 600,
  ERROR_REQUEST_EXPIRED: 604
};

// models
class ResponseEvent {
  event;
  data;
  constructor(event, data) {
    this.event = event;
    this.data = data;
  }
}

class Result {
  leftHand;
  rightHand;
  constructor(data) {
    this.leftHand = data.leftHand;
    this.rightHand = data.rightHand;
  }
}

// subscribe to message event to recive the events from the iframe
window.addEventListener("message", (message) => {
  // IMPORTANT: check the origin of the data
  if (message.origin.includes("firmaautografa.com")) {
    if (message.data.event === EVENT_MODULE.MODULE_READY) { // MODULE_READY
      // the module is ready for receive configuration
      initModule();
    }
    if (message.data.event === EVENT_MODULE.PROCESS_INIT) { // PROCESS_INIT
      // only informative
      console.log("Process init");
    } else if (message.data.event === EVENT_MODULE.PROCESS_ERROR) { // PRROCESS_ERROR
        console.log(JSON.stringify(message.data.data));
    } else if (message.data.event === EVENT_MODULE.SKIP_FINGERPRINTS) { // SKIP_FINGERPRINTS
        console.log('Skip Fingerprints');
    } else if (message.data.event === EVENT_MODULE.PROCESS_COMPLETED) { // PROCESS_COMPLETED
        console.log("Process completed");
        const result = new Result(message.data.data);
      // show result example
      const containerResult = document.getElementById("container-result");
      const containerIframe = document.getElementById("container-iframe-identy");

      containerIframe.style.display = "none";
      containerResult.style.display = "grid";
      console.log(message.data.data);
      const fingers = ['left_index', 'left_little', 'left_middle', 'left_ring','right_index', 'right_little', 'right_middle', 'right_ring'];
      for (const finger of fingers) {
        const fingerPosition = finger.split('_');
        const fingerData = result[`${fingerPosition[0]}Hand`][fingerPosition[1]];
        const fingerImage = document.getElementById(`image_${finger}`);
        const fingerName = document.getElementById(`name_${finger}`);
        const fingerWsq = document.getElementById(`wsq_${finger}`);
        fingerImage.src = "data:image/png;base64, " + fingerData.image;
        fingerName.innerHTML = finger.replace("_", " ");
        fingerWsq.innerHTML = fingerData.wsq;
      }

    }
  } else return;
});

function initIframe() {
  // get iframe
  const iframe = document.getElementById("fad-iframe-identy");
  // url - https://devapiframe.firmaautografa.com/fad-iframe-identy
  const tkn = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const url = `https://devapiframe.firmaautografa.com/fad-iframe-identy?tkn=${tkn}`;
  // set src to iframe
  iframe.src = url;
}

function initModule() {
  const iframe = document.getElementById("fad-iframe-identy");
  iframe.contentWindow.postMessage(
    new ResponseEvent(EVENT_MODULE.INIT_MODULE, {
      configuration: CONFIGURATION,
      detectionModes: [DETECTION_MODES.L4F,DETECTION_MODES.R4F],
      captureTimeout: CAPTURE_TIMEOUT
    }),
    iframe.src
  );
}