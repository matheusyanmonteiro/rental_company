import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Category } from "./Category";

@Entity()
class Car {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  daily_rate: number;
  @Column()
  license_plate: string;
  @Column()
  available: boolean;
  @Column()
  fine_amount: number;
  @Column()
  brand: string;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category

  constructor(){
    if(!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };