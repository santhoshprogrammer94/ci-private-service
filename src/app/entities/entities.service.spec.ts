import 'automapper-ts';
import { Test, TestingModule } from '@nestjs/testing';

import { EntitiesService } from './entities.service';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModel } from '../models/pagination.model';
import { PagedList } from '../models/pagedList.model';
import * as models from '../models';

describe('EntitiesService', () => {
  let service: EntitiesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [EntitiesService],
    }).compile();

    automapper.initialize((config: AutoMapperJs.IConfiguration) => {
      config.createMap('OrganisationModel', 'OrganisationDto')
        .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('logoUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('logo_url'))
        .forMember('scheduleUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('schedule_url'))
        .forMember('registrationUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('registration_url'));

      config.createMap('OrganisationDto', 'OrganisationModel')
        .forMember('logo_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.logoUrl !== undefined))
        .forMember('logo_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('logoUrl'))
        .forMember('schedule_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.scheduleUrl !== undefined))
        .forMember('schedule_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('scheduleUrl'))
        .forMember('registration_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.registrationUrl !== undefined))
        .forMember('registration_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('registrationUrl'));

      config.createMap('DomainModel', 'DomainDto')
        .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

      config.createMap('DomainDto', 'DomainModel');

      config.createMap('StandardModel', 'StandardDto')
        .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

      config.createMap('StandardDto', 'StandardModel');

      config.createMap('LocationModel', 'LocationDto')
        .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('longitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.location.coordinates[0])
        .forMember('latitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.location.coordinates[1]);

      config.createMap('LocationDto', 'LocationModel')
        .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.longitude !== undefined && source.latitude !== undefined))
        .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => ({ type: 'Point', coordinates: [opts.sourceObject.longitude, opts.sourceObject.latitude] } as any))
        .forMember('longitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('latitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

      config.createMap('TrainingModel', 'TrainingDto')
        .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
        .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

      config.createMap('TrainingDto', 'TrainingModel');
    });

    service = module.get<EntitiesService>(EntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve domains', async () => {
    const domains = await service.getEntities(models.DomainModel, models.DomainDto, new PaginationModel());
    expect(domains).toBeInstanceOf(PagedList);
  });

  it('should retrieve standards', async () => {
    const standards = await service.getEntities(models.StandardModel, models.StandardDto, new PaginationModel());
    expect(standards).toBeInstanceOf(PagedList);
  });

  it('should retrieve locations', async () => {
    const locations = await service.getEntities(models.LocationModel, models.LocationDto, new PaginationModel());
    expect(locations).toBeInstanceOf(PagedList);
  });

  it('should retrieve organisations', async () => {
    const organisations = await service.getEntities(models.OrganisationModel, models.OrganisationDto, new PaginationModel());
    expect(organisations).toBeInstanceOf(PagedList);
  });

  it('should retrieve trainings', async () => {
    const trainings = await service.getEntities(models.TrainingModel, models.TrainingDto, new PaginationModel());
    expect(trainings).toBeInstanceOf(PagedList);
  });
});
