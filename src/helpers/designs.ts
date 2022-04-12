import { MixinDesign } from "../models/MixinDesign";
import { Constructor } from "./types";

export const designs = new Map<Function | Constructor, MixinDesign>()
