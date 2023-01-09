import {
  BusEvents,
  EventDetail,
  EventType,
  SubscribeOptions
} from './types';

export class EventBus extends EventTarget {
  constructor(defaultEvents?: BusEvents) {
    super();

    if (defaultEvents) {
      this.#events = defaultEvents;
    }
  }

  #events: BusEvents = {};

  #generateHash(length = 10) {
    return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
  }

  on(type: EventType, listener: EventListener, options?: SubscribeOptions) {
    const id = options?.id ?? this.#generateHash();
    const hasEvent = Object.prototype.hasOwnProperty.call(this.#events, type);
    const controller = new AbortController();

    if (!hasEvent) {
      this.#events[type] = {};
    }

    this.#events[type][id] = controller;

    this.addEventListener(
      type,
      listener,
      { signal: controller.signal },
    );
  }

  once(type: EventType, listener: EventListener) {
    this.addEventListener(type, listener, { once: true });
  }

  off(type: EventType, predicate: EventListener | string) {
    const existingEvent = this.#events[type];
    const isFunction = typeof predicate === 'function';

    if (!existingEvent) {
      throw new Error(`'${type}' is not registered event`);
    }

    if (isFunction) {
      this.removeEventListener(type, predicate);
    } else {
      existingEvent[predicate]?.abort();
      existingEvent[predicate] = null;
    }
  }

  allOff(type: EventType) {
    const existingEvent = this.#events[type];

    if (existingEvent) {
      for (const controller of Object.values(existingEvent)) {
        controller?.abort('Triggered by allOff call');
      }

      this.#events[type] = {};
    }
  }

  emit(type: EventType, detail?: EventDetail) {
    const customEvent = new CustomEvent(type, { detail });

    this.dispatchEvent(customEvent);
  }
}
