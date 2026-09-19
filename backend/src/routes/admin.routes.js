import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import {
    createTemplate,
    getTemplates,
    getTemplateById,
    updateTemplate,
    toggleTemplateStatus
} from "../controllers/admin.controller.js";
import {
    createTemplateValidator,
    updateTemplateValidator
} from "../validators/admin.validator.js";

const adminRouter = Router();

adminRouter.use(verifyAuth, requireAdmin);

adminRouter.post("/templates", createTemplateValidator, createTemplate);
adminRouter.get("/templates", getTemplates);
adminRouter.get("/templates/:id", getTemplateById);
adminRouter.patch("/templates/:id", updateTemplateValidator, updateTemplate);
adminRouter.patch("/templates/:id/toggle", toggleTemplateStatus);

export default adminRouter;
