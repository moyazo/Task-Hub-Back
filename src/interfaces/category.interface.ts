import { Optional } from 'sequelize';

export interface ICategoryAttributes {
  id: string;
  name: string;
  ambit_id: string;
}

export type CategoryCreationAttributes = Optional<ICategoryAttributes, 'id'>;