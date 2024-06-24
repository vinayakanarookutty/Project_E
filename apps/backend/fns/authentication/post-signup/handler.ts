export class PostSignUpHandler {
    constructor() {
        this.handler = this.handler.bind(this);
    }

    async handler(event, context) {
        console.log("Event triggered successfully", event)
    }
}

const handler = new PostSignUpHandler().handler;

export { handler }