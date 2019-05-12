import React, { Component } from 'react';

export default class IfOffLine extends Component {
  constructor(props){
    super(props);
    this.state = {
      //hay que tomar una excepcion en caso de que se este utilizando server side render
      onLine: navigator ? navigator.onLine : true //este no es el caso de server side rendering
    }
  }

  componentDidMount(){
    if(! window) return;
    window.addEventListener('online', this.goOnline)
    window.addEventListener('offline', this.goOffline)
    // Siempre que se haga un set de un EventListener en un componente de react es importante quitarlo cuando el componente
    // deja de existir, de lo contrario se podria dejar el EventListener sueltos que no deberian estar funcionando y van a
    // empezar a dar errores
  }

  // QUitar los eventsListeners cuando deja de existir el component
  componentWillUnmount(){ //se corre inmediatamente antes de remover un componente
    window.removeEventListener('online', this.goOnline)
    window.removeEventListener('offline', this.goOffline)
  }

  //se va a ejecutar cuando el navegador este online
  goOnline = () => {
    this.setState({ onLine: true })
  }
  goOffline = () => this.setState({ onLine: false })

  render(){
    const { children } = this.props;
    const { onLine } = this.state;

    //el componente se llama IfOffLine, por lo que resulta al reves este caso de condicion
    if(onLine) return null
    
    return <span>{children}</span>;
  }
}

//la children indica el contenido de este componente
