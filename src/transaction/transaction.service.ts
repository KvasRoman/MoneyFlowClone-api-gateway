import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionService {
    constructor(@Inject('TRANSACTION_SERVICE') private readonly transactionService: ClientProxy) { }

    async getTransaction(id: string, accountId: string) {
        return await firstValueFrom(
            this.transactionService.send({ cmd: "get_single_transaction" }, { id: id, accountId: accountId }));
    }
    async getTransactions(accountId: string, page: number, limit: number) {
        return await firstValueFrom(
            this.transactionService.send({ cmd: "get_transactions" }, {
                accountId: accountId,
                page: page,
                limit: limit
            }));
    }
    async updateTransaction(id: string, accountId: string, dto: { amount?: number, description?: string, transactionDate?: Date,currency?:string }) {
        return await firstValueFrom(
            this.transactionService.send({ cmd: "update_transaction" }, { id: id, accountId: accountId, dto: dto }));
    }
    async createTransaction(dto: {accountId: string, amount: number, desicription?: string, transactionDate: Date, currency: string}) {
        Logger.log(dto, "api-dto")
        return await firstValueFrom(
            this.transactionService.send({ cmd: "create_transaction" }, dto));
    }

    async deleteTransaction(id: string, accountId: string) {
        return await firstValueFrom(
            this.transactionService.send({ cmd: "delete_transaction" }, { id: id, accountId: accountId }));
    }
}
