import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Offer, OfferStatus } from '@products/models';

@Injectable()
export class OfferRepository extends Repository<Offer> {
  constructor(private readonly dataSource: DataSource) {
    super(Offer, dataSource.createEntityManager());
  }

  findActiveOffers(): Promise<Offer[]> {
    return this.createQueryBuilder('offer')
      .innerJoinAndSelect('offer.product', 'product')
      .where('offer.status = :status', { status: OfferStatus.Active })
      .orderBy('product.name', 'ASC')
      .addOrderBy('offer.code', 'ASC')
      .getMany();
  }
}
