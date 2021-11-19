import {CarEntity} from "./carEntity";

export interface OwnerEntity {
  id: number | null,
  surname: string,
  name: string,
  patronymic: string
  cars: CarEntity[]
}
