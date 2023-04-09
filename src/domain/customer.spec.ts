import Customer from "./customer";
import EnviaConsoleLogHandler from "./event/Customer/handler/envia-console-log-handler";
import EventDispatcher from "./event/@shared/event-dispatcher";

describe("Domain customer tests", () => {
    it("should notify all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

        const customer = new Customer(eventDispatcher, "1", "jhon", "Av queen");
        customer.changeAddress("Av doctor");

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
