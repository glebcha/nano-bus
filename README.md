<img width="200px" src="microbus.png" />

# [nano-event-bus](https://glebcha.github.io/nano-event-bus/)

[![npm version](https://badge.fury.io/js/nano-event-bus.svg)](https://badge.fury.io/js/nano-event-bus)

Tiny event bus based on custom events (for now only in browser)
<br />
<br />

## on(type: EventType, listener: EventListener, options?: SubscribeOptions): void;

Add subscription with handler to process events by type
<br />
<br />

## once(type: EventType, listener: EventListener): void;

Add subscription with handler to process event by type only once
<br />
<br />

## off(type: EventType, predicate: EventListener | string): void;

Remove subscription for defined event type by predicate (hash id or named function)
<br />
<br />

## allOff(type: EventType): void;

Remove all subscriptions for defined event type 
<br />
<br />

## emit(type: EventType, detail?: EventDetail): void;

Emit event with defined type and pass optional data (any object)
<br />
<br />

### Sample usage:

```javascript
import { EventBus } from 'nano-bus';

const bus = new EventBus();

function addCallback(event) {
  console.log(event);
}

bus.on('add', addCallback);
bus.emit('add');
```

### Use with JSDelivr CDN:

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/nano-event-bus/build/umd/nano-event-bus.umd.js"></script>

<body>
  <script type="text/javascript">console.log(window.NanoEventBus.EventBus);</script>
</body>
```

### Use ES-module with Skypack CDN:

```
<script type="module">
  import { EventBus } from 'https://cdn.skypack.dev/nano-event-bus';

  Object.defineProperty(window, 'EventBus',  {
    value: Object.freeze(new EventBus()),
    writable: false,
    configurable: false
  });
  
  console.log(window.EventBus)
</script>
```
