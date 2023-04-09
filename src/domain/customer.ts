import CustomerUpdatedEvent from "./event/Customer/customer-updated.event";
import EventDispatcherInterface from "./event/@shared/event-dispatcher.interface";

export default class Customer {
    private id: string;
    private name: string;
    private address: string;
    private eventDispatcher: EventDispatcherInterface;

    constructor(eventDispatcher: EventDispatcherInterface, id: string, name: string, address: string) {
        this.eventDispatcher = eventDispatcher;
        this.id = id;
        this.name = name;
        this.address = address;
    }

    changeAddress(newAddress: string) {
        this.address = newAddress;
        const customerUpdatedEvent = new CustomerUpdatedEvent({
            id: this.id,
            name: this.name,
            address: this.address
        });
        this.eventDispatcher.notify(customerUpdatedEvent);
    }
}