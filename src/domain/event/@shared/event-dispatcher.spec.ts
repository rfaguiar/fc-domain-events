import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EnviaConsoleLog1Handler from "../Customer/handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../Customer/handler/envia-console-log2-handler";
import CustomerCreatedEvent from "../Customer/customer-created.event";
import EnviaConsoleLogHandler from "../Customer/handler/envia-console-log-handler";
import CustomerUpdatedEvent from "../Customer/customer-updated.event";

describe("Domain product events tests", () => {
    it("should register an product event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreateEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.ProductCreateEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreateEvent.length).toBe(1);
        expect(eventDispatcher.getEventHandlers.ProductCreateEvent[0]).toMatchObject(eventHandler);
    });

    it("should unregister an product event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
    });

    it("should unregister all product event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeUndefined();
    });

    it("should notify all product event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        // deve executar o .handle deve ser executado.
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

});

describe("Domain customer created events tests", () => {
    it("should register an customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);
    });

    it("should unregister an customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(1);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(0);
    });

    it("should unregister all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeUndefined();
    });

    it("should notify all customer event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer ",
            address: "Av landscape"
        });

        // deve executar o .handle deve ser executado.
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

});

describe("Domain customer updated events tests", () => {
    it("should register an customer updated event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent.length).toBe(1);
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent[0]).toMatchObject(eventHandler);
    });

    it("should unregister an customer updated event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerUpdatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent.length).toBe(0);
    });

    it("should unregister all customer updated event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent).toBeUndefined();
    });

    it("should notify all customer updated event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers.CustomerUpdatedEvent[0]).toMatchObject(eventHandler);

        const customerUpdatedEvent = new CustomerUpdatedEvent({
            id: "1",
            name: "jhon",
            address: "Av 1"
        });

        // deve executar o .handle deve ser executado.
        eventDispatcher.notify(customerUpdatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

});
