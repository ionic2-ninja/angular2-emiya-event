'use strict'
import {EventEmitter} from '@angular/core';
import {EventSyncEmitter} from './EventSyncEmitter';

export class Event {
  private static emitters: Object = window['eventQueue'] ? window['eventQueue'] : (window['eventQueue '] = {})
  private static emittersSync: Object = window['eventSyncQueue'] ? window['eventSyncQueue'] : (window['eventSyncQueue '] = {})

  public static createEmitter(id, isSync = true) {
    if (isSync != true && (typeof(Event.emitters[id]) == "undefined" || Event.emitters[id] == null)) {
      Event.emitters[id] = new EventEmitter();
    } else if (isSync == true && (typeof(Event.emittersSync[id]) == "undefined" || Event.emittersSync[id] == null)) {
      Event.emittersSync[id] = new EventSyncEmitter();
    }
  }


  public static getEmitter(id, isSync = true) {
    Event.createEmitter(id, isSync);
    if (isSync != true)
      return Event.emitters[id];
    else
      return Event.emittersSync[id];
  }


  public static removeEmitter(id, isSync = true) {
    if (isSync != true)
      delete Event.emitters[id];
    else
      delete Event.emittersSync[id];

  }


  public static emit(id, msg, isSync = true) {
    return Event.getEmitter(id, isSync).emit(msg)
  }


  public static subscribe(id, callback, isSync = true) {
    let emitter = Event.getEmitter(id, isSync);
    return emitter.subscribe((param0, param1?)=> {
      if (emitter instanceof EventEmitter)
        callback(undefined, param0)
      else
        callback(param0, param1)
    })
  }

  public static subscribeOnce(id, callback, isSync = true) {
    let emitter = Event.getEmitter(id, isSync), obj = emitter.subscribe((param0, param1?)=> {
      obj.unsubscribe();
      if (emitter instanceof EventEmitter)
        callback(undefined, param0)
      else
        callback(param0, param1)
    });
    return obj
  }
}
