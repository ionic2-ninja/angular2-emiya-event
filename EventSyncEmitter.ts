'use strict'

export class EventSyncEmitter {
  private _listener = [];

  constructor() {
  }

  public emit(msg) {
    let _event = {
      defaultPrevented: false,
      propagationPrevented: false,
      preventDefault: ()=> {
        _event.defaultPrevented = true
      },
      stopPropagation: ()=> {
        _event.propagationPrevented = true
      }
    }
    for (let c in this._listener) {
      this._listener[c](_event, msg)
      if (_event.propagationPrevented != false)
        break
    }
    return _event
  }

  public subscribe(callback) {
    if (this._listener.indexOf(callback) < 0) {
      this._listener.push(callback)
    }
    return {
      unsubscribe: ()=> {
        this._listener.splice(this._listener.indexOf(callback), 1);
      }
    }
  }

}
