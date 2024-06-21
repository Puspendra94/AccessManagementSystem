import { Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyEntity } from './entities/key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeyService {

  constructor(
    @InjectRepository(KeyEntity) public readonly keyRepository: Repository<KeyEntity>,
  ) {}
  create(createKeyDto: CreateKeyDto) {
    return this.keyRepository.save(createKeyDto);
  }

  findAll() {
    return this.keyRepository.find();
  }

  findOne(key: string) {
    return this.keyRepository.findOne({where: {key}});
  }

  update(key: string, updateKeyDto: UpdateKeyDto) {
    return this.keyRepository.update({key}, updateKeyDto);
  }

  softDelete(key: string) {
    return this.keyRepository.softDelete({key});
  }
}
