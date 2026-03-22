import { Optional } from "sequelize";

export interface IAmbitAttributes {
  id: string;
  name: string;
}

export type AmbitCreationAttributes = Optional<IAmbitAttributes, 'id'>;