import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerUpdatedEvent> {
    handle(event: CustomerUpdatedEvent): void {
        // tslint:disable-next-line:no-console
        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
        );
    }

}