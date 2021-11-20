import {CarEntity} from "./carEntity";

export interface OwnerEntity {
  id: number | null,
  lastName: string,
  firstName: string,
  secondName: string
  cars: CarEntity[]
}
