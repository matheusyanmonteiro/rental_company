import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailCOntroller = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailCOntroller.handle);

export { passwordRoutes };
