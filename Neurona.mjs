import { v4 as uuid } from "uuid";

export default class Neurona {
    constructor(type = "default", activationState = 0) {
        this.id = uuid();
        this.type = type;
        this.activationState = activationState;
    }

    getActivationState() {
        return this.activationState;
    }

    setActivationState(value = 0) {
        if (
            typeof value != 'number' ||
            Number.isNaN(value)
        ) {
            throw new Error(
                `(Neurona.setActivationState) value argument: ${value} is not numeric type.`
            )
        }

        this.activationState = value;
    }

    isEqual(neurona){
        return this.id == neurona?.id;
    }
}