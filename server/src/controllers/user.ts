class UserController {
    async register(): Promise<void> {
        console.log("Reached in register");
    }
}

export default new UserController();
