"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownersController = __importStar(require("../controllers/owners.controller"));
const owner_validator_1 = require("../validators/owner.validator");
const dto_middleware_1 = __importDefault(require("../middlewares/dto.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_1 = require("../types/auth");
const router = (0, express_1.Router)();
/**
 * Public GET endpoints - lectura de propietarios disponible para todos
 */
router.get('/', ownersController.getAllOwners);
router.get('/:id', ownersController.getOwnerById);
/**
 * Protected POST/PUT/DELETE endpoints - requiresRECEPCIONISTA or ADMIN
 */
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), owner_validator_1.createOwnerValidator, dto_middleware_1.default, ownersController.createOwner);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), owner_validator_1.updateOwnerValidator, dto_middleware_1.default, ownersController.updateOwner);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), ownersController.deleteOwner);
exports.default = router;
