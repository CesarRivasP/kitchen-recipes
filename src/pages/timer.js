import React, { Component } from 'react'


class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 3,
      timeLeft: 0
    }
  }

  start = async() => {
    //Chequear permisos
    // Chequear si se tienen notificaciones disponibles, a ver si el feature esta disponible
    if(! ('Notification' in window) || ! ('serviceWorker' in navigator) ){ //Hay un onjeto notification en window
      //En android, las notificaciones necesitan un serviceWorker, si no se tiene uno funcionando y registrado y se hacen
      // las notificaciones mediante este serviceWorker, las notificaciones no van a funcionar en android
      // En ios no hay soporte para notificaciones
      return alert('Tu browser no soporta notificaciones')
    }
    console.log(Notification.permission);
    // Chequear si se tiene el permiso necesario para hacer eso
    if(Notification.permission === 'default'){ //si lo esta, hay que pedir permiso
      await Notification.requestPermission();  //Avisara cuando el usuarios clickee en esto,
      // si no lo hace, no va a funcionar nada
    }

    // Una vez que se pide el permiso, hay que chequear si se tiene el permiso nuevamente
    if(Notification.permission === 'blocked'){ //si lo esta, hay que pedir permiso
      return alert('Bloqueaste las notificaciones');
    }

    if(Notification.permission !== 'granted'){ //granted es cuando tienes el permiso
      return;
    }

    let timer = this.state.timer;
    this.setState({ timeLeft: timer });

    let countDownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer });

      if(timer <= 0){
        clearInterval(countDownInterval);
        this.showNotification();
      }
    })
  }

  showNotification = async () => {
    //Enviar Notificación
    // flujo en android. Necesita un serviceWorker, por lo que solo va a funcionar en production
    const registration = await navigator.serviceWorker.getRegistration()
    //registacion del serviceWorker, por lo que se conecta con el serviceWorker
    //para que este mande la registracion

    if(! registration) return alert('No hay un service worker');

    // enviar la notificacion
    registration.showNotification("Listo el timer", {
      body: 'Ding Ding', //emular una alarma
      img: '/icon.png'
    })
  }

  handleChange = (e) => {
    this.setState({ timer: e.target.value })
  }

  render(){
    const { timer, timeLeft } = this.state;
    return (
      <div className="Timer">
        <div className="name">Timer</div>
        {
          timeLeft === 0 ?
            <div className="center">
              <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
              <button onClick={ this.start }>Start</button>
            </div>
            :
            <div className="timeLeft">{ timeLeft }s</div>
        }
      </div>
    );
  }
}

export default Timer;
