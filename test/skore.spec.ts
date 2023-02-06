import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { JwtService } from '../src/utils/jwt.service'
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/utils/auth.guard'

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker =
  describe('Skore testes', () => {
    let app: INestApplication;
    let skoreService = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTY3NTM2MjY3MSwiZXhwIjoxNzA2OTIwMjcxfQ.zE1QUizLxftgngO9OJ0hEKbiUk0Ek-yPBp1NHU9JwD0'

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        providers: [
          AuthGuard,
          JwtService
        ],
      }).overrideProvider(AuthGuard)
        .useValue(AuthGuard)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    describe('Skore Criações', () => {

      it(`'Teste de criação de dados, sem permissão`, () => {
        return request(app.getHttpServer())
          .post('/v1/skore/create')
          .send({
            "content": {
              "name": "Lucas Belusso",
              "description": "oidjsaofjdosjfs",
              "type": "pdf"
            }
          })
          .expect(403)
      });
      it(`'Teste de criação de dados, sem permissão`, () => {
        return request(app.getHttpServer())
          .post('/v1/skore/create')
          .set('Authorization', skoreService)
          .send({
            "content": {
              "name": "Lucas Belusso",
              "description": "oidjsaofjdosjfs",
              "type": "pdf"
            }
          })
          .expect(201)
      });

    })

    describe('Skore Atualizações', () => {
      it(`'Teste de atualizar  dados, sem permissão`, () => {
        return request(app.getHttpServer())
          .put('/v1/skore')
          .send({
            "content": {
              "name": "Lucas Belusso",
              "description": "oidjsaofjdosjfs",
              "type": "pdf"
            }
          })
          .query({ id: 1 })
          .expect(403)
      });
      it(`'Teste de atualizar  dados, com permissão`, () => {
        return request(app.getHttpServer())
          .put('/v1/skore')
          .send({
            "content": {
              "name": "Lucas Belusso",
              "description": "oidjsaofjdosjfs",
              "type": "pdf"
            }
          })
          .query({ id: 1 })
          .set('Authorization', skoreService)
          .expect(200)
      });
    })

    describe('Skore Buscas', () => {
      it('Teste de pesquisa de dados, sem permissão', async () => {
        return request(app.getHttpServer())
          .get('/v1/skore/list-all')
          .expect(403)
      })

      it(`'Teste de pesquisa de dados, com permissão`, () => {
        return request(app.getHttpServer())
          .get('/v1/skore/list-all')
          .set('Authorization', skoreService)
          .expect(200)
      });
      it(`'Teste de busca especifica de dados, sem permissão`, () => {
        return request(app.getHttpServer())
          .get('/v1/skore/find-one')
          .query({ id: 1 })
          .expect(403)
      });
      it(`'Teste de busca especifica de dados, sem dado cadastrado`, () => {
        return request(app.getHttpServer())
          .get('/v1/skore/find-one')
          .query({ id: 10000 })
          .set('Authorization', skoreService)
          .expect(500)
      });
      it(`'Teste de busca especifica de dados, com permissão`, () => {
        return request(app.getHttpServer())
          .get('/v1/skore/find-one')
          .query({ id: 1 })
          .set('Authorization', skoreService)
          .expect(200)
      });
    })
    describe('Skore Exclusões', () => {
      it(`'Teste de exclusão especifica de dados, sem permissão`, () => {
        return request(app.getHttpServer())
          .delete('/v1/skore')
          .query({ id: 1 })
          .expect(403)
      });
      it(`'Teste de busca especifica de dados, com permissão`, () => {
        return request(app.getHttpServer())
          .delete('/v1/skore')
          .query({ id: 1 })
          .set('Authorization', skoreService)
          .expect(200)
      });
    })
  });