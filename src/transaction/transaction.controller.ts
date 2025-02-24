import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
constructor(private readonly transactionService: TransactionService) {}

    @Get("list")
    async getTransactions(
        @Query() page: number,
        @Req() req){
        try{
            this.transactionService.getTransactions(req.user.accountId, page, 50)
        }
        catch(e){
            Logger.error(e)
        }
    }
    @Get("/:id")
    async getTransaction(
        @Param() id:string,
        @Req() req){
            try{
                this.transactionService.getTransaction(id,req.user.accountId)
            }
            catch(e){
                Logger.error(e)
            }
    }
    @Post("create")
    async createTransaction(
        @Body() data: { amount: number, description?: string, transactionDate: Date, currency: string },
        @Req() req){
        try{
            Logger.log(data, "data");
            this.transactionService.createTransaction({...data, accountId: req.user.accountId})
        }
        catch(e){
            Logger.error(e)
        }
    }
    @Patch("/:id")
    async updateTransaction(
        @Param() id: string,
        @Body() data: { amount?: number, description?: string, transactionDate?: Date, currency?: string },
        @Req() req){
            try{
                this.transactionService.updateTransaction(id,req.user.accountId,data)
            }
            catch(e){
                Logger.error(e)
            }
    }
    @Delete("/:id")
    async deleteTransaction(
        @Param() id:string,
        @Req() req){
        try{
            this.transactionService.deleteTransaction(id,req.user.accountId)
        }
        catch(e){
            Logger.error(e)
        }
    }
}
