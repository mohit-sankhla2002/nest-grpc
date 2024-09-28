import { NestFactory } from '@nestjs/core';
import { ContactsModule } from './contacts.module';

async function bootstrap() {
  const app = await NestFactory.create(ContactsModule);
  await app.listen(3000);
}
bootstrap();
