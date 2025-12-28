// models/Fortune.ts
import { Schema, model, models } from "mongoose";

export interface IFortune {
  text: string;
  active: boolean;
}

const FortuneSchema = new Schema<IFortune>({
  text: { type: String, required: true },
  active: { type: Boolean, default: true },
});

export const Fortune =
  models.Fortune || model<IFortune>("Fortune", FortuneSchema);
