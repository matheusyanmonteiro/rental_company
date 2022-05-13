import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";


interface ISpecificationsRepository
{
  findByName(name: String): Promise<Specification>;
  create({ name, description } : ICreateSpecificationDTO) : Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository }; 