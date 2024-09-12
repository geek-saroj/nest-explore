import { IsEmail, MinLength, minLength } from 'class-validator';
import { createHmac } from 'crypto';
import { Config } from 'src/config/config';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  name: string;

  @Index()
  @Column()
  @IsEmail()
  @MinLength(3)
  email: string;
  @Column()
  @MinLength(10)
  contact: string;

  @Column()
  @MinLength(4)
  address: string;

  @Column()
  @MinLength(4)
  password: string;

  @Column()
  status: boolean;

  @Column({ nullable: true })
  gender: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashpassword() {
    if (this.password) {
      this.password = this.hashFn(this.password);
    }
  }

  private hashFn(password: string): string {
    if (!password) return '';
    try {
      return createHmac('sha1', Config.saltSecret)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }

  public isCorrectPasswordcustomer(password: string) {
    return this.hashFn(password) === this.password;
  }
}
