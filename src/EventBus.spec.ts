import { EventBus } from './';

describe('Tools / EventBus', () => {
  it('should add and remove event subscription', () => {
    const bus = new EventBus();
    const addCallback = jest.fn();

    bus.on('add', addCallback);
    bus.emit('add');
    bus.off('add', addCallback);
    bus.emit('add');
    bus.emit('add');

    expect(addCallback).toBeCalledTimes(1);
  });

  it('should execute event handler once', () => {
    const bus = new EventBus();
    const onceCallback = jest.fn();

    bus.once('add-id', onceCallback);
    bus.emit('add-id');
    bus.emit('add-id');

    expect(onceCallback).toBeCalledTimes(1);
  });
});

it('should unsubscribe all listeners from specified event', () => {
  const bus = new EventBus();
  const allCallback = jest.fn();
  const allCallbackSecond = jest.fn();

  bus.on('all-off', allCallback);
  bus.on('all-off', allCallbackSecond);

  bus.emit('all-off');
  
  bus.allOff('all-off');

  bus.emit('all-off');
  bus.emit('all-off');

  expect(allCallback).toBeCalledTimes(1);
  expect(allCallbackSecond).toBeCalledTimes(1);
});
