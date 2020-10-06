import { EventEmitter } from "./event-emitter";

test("base", () => {
  const eventEmitter = new EventEmitter();
  eventEmitter.on("click", () => {
    console.log("click 1");
  });
  eventEmitter.on("click", () => {
    console.log("click 2");
  });

  // eventEmitter.off('click')
  eventEmitter.emit("click");
  eventEmitter.once("click", () => {
    console.log("click once");
  });
  eventEmitter.emit("click");
  console.log(eventEmitter);
});
