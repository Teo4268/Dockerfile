document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://pool.rplant.xyz/api/walletEx/microbitcoin/BfDcTj8vqeuRoPizzA2SjzXL9QakY49dq7';

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            displayData(data);
        } catch (error) {
            document.querySelector('.container').innerHTML = `<h1 style="color: var(--highlight-color);">Error</h1><p style="text-align: center; color: var(--highlight-color);">Failed to load data: ${error.message}</p>`;
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const formatHashrate = (hashrate) => {
        if (hashrate === 0) return '0 H/s';
        const i = Math.floor(Math.log(hashrate) / Math.log(1000));
        const value = (hashrate / Math.pow(1000, i)).toFixed(2);
        return `${value} ${['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s'][i]}`;
    };

    const createCardContent = (title, dataObject, iconClass) => {
        let content = `<h2><i class="${iconClass}"></i> ${title}</h2>`;
        for (const [key, value] of Object.entries(dataObject)) {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            content += `<p><span class="label">${formattedKey}</span> <span class="value">${value}</span></p>`;
        }
        return content;
    };

    const displayData = (data) => {
        // Populate Wallet & Payments Card
        const walletPaymentsCard = document.getElementById('wallet-payments-card');
        const walletInfo = {
            balance: `${Math.floor(data.balance).toLocaleString()} MBC`,
            unpaid: `${Math.floor(data.unpaid).toLocaleString()} MBC`,
            paid_24h: `${Math.floor(data.paid24h).toLocaleString()} MBC`,
            total: `${Math.floor(data.total).toLocaleString()} MBC`,
        };
        
        const walletStatsDiv = document.createElement('div');
        walletStatsDiv.innerHTML = createCardContent('Wallet', walletInfo, 'fas fa-wallet');
        walletPaymentsCard.prepend(walletStatsDiv);

        // Populate Hashrate Card
        const hashrateCard = document.getElementById('hashrate-card');
        const hashrateInfo = {
            hashrate: formatHashrate(data.hashrate),
            hashrate_solo: formatHashrate(data.hashrate_solo),
            shares: Math.floor(data.shares).toLocaleString(),
        };
        hashrateCard.innerHTML = createCardContent('Hashrate', hashrateInfo, 'fas fa-tachometer-alt');

        // Populate General Stats Card
        const generalStatsCard = document.getElementById('general-stats-card');
        const generalInfo = {
            coin: data.coin,
            address: data.address.substring(0, 10) + '...',
            unsold: `${Math.floor(data.unsold).toLocaleString()} MBC`,
        };
        generalStatsCard.innerHTML = createCardContent('General Stats', generalInfo, 'fas fa-info-circle');

        // Populate Payments Table
        const paymentsTableBody = document.querySelector('#payments-table tbody');
        paymentsTableBody.innerHTML = '';
        if (data.payments && Array.isArray(data.payments)) {
            data.payments.forEach(payment => {
                const row = `<tr>
                    <td>${new Date(payment.time * 1000).toLocaleString()}</td>
                    <td>${Math.floor(parseFloat(payment.amount)).toLocaleString()} MBC</td>
                    <td><a href="#" onclick="alert('Transaction ID: ${payment.tx}')" title="${payment.tx}">${payment.tx.substring(0, 15)}...</a></td>
                </tr>`;
                paymentsTableBody.innerHTML += row;
            });
        }

        // Populate Miners Table
        const minersTableBody = document.querySelector('#miners-table tbody');
        minersTableBody.innerHTML = '';
        if (data.miners && Array.isArray(data.miners)) {
            data.miners.forEach(miner => {
                const row = `<tr>
                    <td>${miner.ID}</td>
                    <td>${formatHashrate(miner.hashrate)}</td>
                    <td>${Math.floor(miner.accepted).toLocaleString()}</td>
                    <td>${Math.floor(miner.rejected).toLocaleString()}</td>
                </tr>`;
                minersTableBody.innerHTML += row;
            });
        }
    };

    fetchData();
});
