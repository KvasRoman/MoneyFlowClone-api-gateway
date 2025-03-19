import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AccountValidateDTO } from 'src/dto/account-validate';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get("list")
    async getTransactions(
        @Query('page') page: number,
        @Req() req) {
        const account: AccountValidateDTO = req.user.account;
        Logger.log(req.headers, "headers")
        return await this.transactionService.getTransactions(account.id, page, 50)

    }
    @Get(":id")
    async getTransaction(
        @Param('id') id: string,
        @Req() req) {
        const account: AccountValidateDTO = req.user.account;
        return await this.transactionService.getTransaction(id, account.id)

    }
    @Post("create")
    async createTransaction(
        @Body() data: { amount: number, description?: string, transactionDate: Date, currency: string },
        @Req() req) {
        const account: AccountValidateDTO = req.user.account;
        
        return await this.transactionService.createTransaction({ ...data, accountId: account.id })
    }
    @Put(':id')
    async updateTransaction(
        @Param('id') id: string,
        @Body() data: { amount?: number, description?: string, transactionDate?: Date, currency?: string },
        @Req() req) {
        const account: AccountValidateDTO = req.user.account;
        return await this.transactionService.updateTransaction(id, account.id, data)

    }
    @Delete(":id")
    async deleteTransaction(
        @Param('id') id: string,
        @Req() req) {
        const account: AccountValidateDTO = req.user.account;
        return await this.transactionService.deleteTransaction(id, account.id)

    }
}
