import { TxHistoryStore } from 'background/service/transactionHistory';

export default {
  version: 5,
  async migrator(data: { txHistory: TxHistoryStore | undefined }) {
    try {
      if (!data.txHistory) return undefined;
      for (const addr in data.txHistory.transactions) {
        const txs = data.txHistory.transactions[addr];
        for (const key in txs) {
          txs[key] = {
            ...txs[key],
            dbIndexed: true,
          };
        }
      }
      return {
        txHistory: data.txHistory,
      };
    } catch (e) {
      // drop custom tokens if migrate failed
      return data;
    }
  },
};
