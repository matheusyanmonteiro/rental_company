import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository
{
  private specifications: Specification[];

  constructor() 
  {
    this.specifications = [];
  }
  findByName(name: string): Specification {
    const specification = this.specifications.find(
                          (specification) => specification.name === name);
    return specification;
  }
  create({ description, name }: ICreateSpecificationDTO): void 
  {
    const specification = new Specification();

    Object.assign(specification, {
    name,
    description,
    create_at: new Date(),
    });

    this.specifications.push();
  }

}

export { SpecificationsRepository }; 