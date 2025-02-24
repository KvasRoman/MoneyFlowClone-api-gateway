import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'TRANSACTION_SERVICE',
            transport: Transport.TCP,
            options: { host: '127.0.0.1', port: 3003 },
          },
        ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {
  
}
