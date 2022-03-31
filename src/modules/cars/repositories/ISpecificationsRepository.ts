import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO 
{
  name: string;
  description: string;
}

interface ISpecificationsRepository
{
  findByName(name: String): Promise<Specification>;
  create({ name, description } : ICreateSpecificationDTO) : Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO }; 