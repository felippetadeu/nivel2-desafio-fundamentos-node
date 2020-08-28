import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTotal = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((total: number, values: number) => total + values, 0);

    const outcomeTotal = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((total: number, values: number) => total + values, 0);

    const balance = incomeTotal - outcomeTotal;

    const balanceObject = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: balance,
    };

    return balanceObject;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}


export default TransactionsRepository;
