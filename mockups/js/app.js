// MyCash - Main Application Logic

// Sample Data
const sampleTransactions = [
  { id: 1, date: '2025-12-24', description: 'Supermercado Walmart', category: 'Comida', type: 'expense', amount: -1250.50, account: 'Tarjeta Crédito', icon: '🛒' },
  { id: 2, date: '2025-12-23', description: 'Salario Diciembre', category: 'Salario', type: 'income', amount: 25000.00, account: 'Cuenta Bancaria', icon: '💰' },
  { id: 3, date: '2025-12-22', description: 'Netflix', category: 'Entretenimiento', type: 'expense', amount: -299.00, account: 'Tarjeta Débito', icon: '🎬' },
  { id: 4, date: '2025-12-21', description: 'Uber', category: 'Transporte', type: 'expense', amount: -185.00, account: 'Efectivo', icon: '🚗' },
  { id: 5, date: '2025-12-20', description: 'Freelance Proyecto', category: 'Freelance', type: 'income', amount: 5000.00, account: 'Cuenta Bancaria', icon: '💼' },
  { id: 6, date: '2025-12-19', description: 'Farmacia', category: 'Salud', type: 'expense', amount: -450.00, account: 'Efectivo', icon: '💊' },
  { id: 7, date: '2025-12-18', description: 'Amazon', category: 'Tecnología', type: 'expense', amount: -899.00, account: 'Tarjeta Crédito', icon: '📦' },
  { id: 8, date: '2025-12-17', description: 'Restaurante', category: 'Comida', type: 'expense', amount: -680.00, account: 'Tarjeta Débito', icon: '🍽️' },
];

const sampleBudgets = [
  { category: 'Comida', icon: '🛒', spent: 3250, total: 5000, color: '#7C3AED' },
  { category: 'Transporte', icon: '🚗', spent: 1200, total: 2000, color: '#10B981' },
  { category: 'Entretenimiento', icon: '🎬', spent: 899, total: 1500, color: '#F59E0B' },
  { category: 'Salud', icon: '💊', spent: 1500, total: 2000, color: '#EF4444' },
  { category: 'Vivienda', icon: '🏠', spent: 8000, total: 8000, color: '#8B5CF6' },
];

const sampleAccounts = [
  { name: 'Cuenta Bancaria', type: 'Cuenta Bancaria', balance: 45250.00, icon: '🏦', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Tarjeta Crédito', type: 'Tarjeta de Crédito', balance: -2500.00, icon: '💳', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Efectivo', type: 'Efectivo', balance: 2500.00, icon: '💵', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Ahorros', type: 'Ahorros', balance: 15000.00, icon: '🏦', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

// Utility Functions
function formatCurrency(amount) {
  const sign = amount >= 0 ? '+' : '';
  return sign + '$' + Math.abs(amount).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getProgressStatus(percentage) {
  if (percentage < 80) return 'safe';
  if (percentage < 100) return 'warning';
  return 'danger';
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// Transaction Functions
function renderTransactions(transactions = sampleTransactions, containerId = 'transactionsTableBody') {
  const tbody = document.getElementById(containerId);
  if (!tbody) return;

  tbody.innerHTML = transactions.map(t => `
    <tr>
      <td>${formatDate(t.date)}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.25rem;">${t.icon}</span>
          <div>
            <div style="font-weight: 600;">${t.description}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${t.account}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="category-badge" style="background: ${getCategoryColor(t.category)}20; color: ${getCategoryColor(t.category)};">
          ${t.category}
        </span>
      </td>
      <td>
        <span class="transaction-type ${t.type}">
          ${t.type === 'income' ? '↑ Ingreso' : '↓ Gasto'}
        </span>
      </td>
      <td>
        <span class="${t.amount >= 0 ? 'amount-positive' : 'amount-negative'}">
          ${formatCurrency(t.amount)}
        </span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editTransaction(${t.id})" title="Editar">✏️</button>
          <button class="action-btn" onclick="duplicateTransaction(${t.id})" title="Duplicar">📋</button>
          <button class="action-btn" onclick="deleteTransaction(${t.id})" title="Eliminar">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function getCategoryColor(category) {
  const colors = {
    'Comida': '#7C3AED',
    'Salario': '#10B981',
    'Entretenimiento': '#F59E0B',
    'Transporte': '#3B82F6',
    'Freelance': '#8B5CF6',
    'Salud': '#EF4444',
    'Tecnología': '#6366F1',
    'Vivienda': '#EC4899',
  };
  return colors[category] || '#6B7280';
}

function editTransaction(id) {
  console.log('Editing transaction:', id);
  // In a real app, this would open a modal with the transaction data
  alert('Función de editar transacción (ID: ' + id + ')');
}

function duplicateTransaction(id) {
  console.log('Duplicating transaction:', id);
  alert('Transacción duplicada');
}

function deleteTransaction(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
    console.log('Deleting transaction:', id);
    alert('Transacción eliminada');
  }
}

// Budget Functions
function renderBudgets(budgets = sampleBudgets, containerId = 'budgetList') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = budgets.map(b => {
    const percentage = (b.spent / b.total) * 100;
    const remaining = b.total - b.spent;
    const status = getProgressStatus(percentage);

    return `
      <div class="budget-item fade-in">
        <div class="budget-header">
          <div class="budget-category">
            <div class="budget-icon" style="background: ${b.color}20; color: ${b.color};">
              ${b.icon}
            </div>
            <div class="budget-category-name">${b.category}</div>
          </div>
          <div class="budget-amounts">
            <div class="budget-spent">${formatCurrency(-b.spent)}</div>
            <div class="budget-total">de ${formatCurrency(-b.total)}</div>
          </div>
        </div>
        <div class="budget-progress">
          <div class="progress-bar-container">
            <div class="progress-bar ${status}" style="width: ${Math.min(percentage, 100)}%"></div>
          </div>
        </div>
        <div class="budget-footer">
          <span>${percentage.toFixed(1)}% utilizado</span>
          <span class="budget-remaining ${remaining >= 0 ? 'positive' : 'negative'}">
            ${remaining >= 0 ? 'Restante: ' : 'Excedido: '} ${formatCurrency(-remaining)}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

// Account Functions
function renderAccounts(accounts = sampleAccounts, containerId = 'accountsGrid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = accounts.map(a => `
    <div class="account-card" style="background: ${a.color};">
      <div class="account-card-header">
        <div class="account-type">${a.type}</div>
        <div class="account-icon">${a.icon}</div>
      </div>
      <div class="account-balance">${formatCurrency(a.balance)}</div>
      <div class="account-name">${a.name}</div>
    </div>
  `).join('');
}

// Filter Functions
function filterTransactions() {
  const typeFilter = document.getElementById('filterType')?.value || 'all';
  const categoryFilter = document.getElementById('filterCategory')?.value || 'all';
  const searchTerm = document.getElementById('searchTransaction')?.value.toLowerCase() || '';

  let filtered = sampleTransactions;

  if (typeFilter !== 'all') {
    filtered = filtered.filter(t => t.type === typeFilter);
  }

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(t => t.category === categoryFilter);
  }

  if (searchTerm) {
    filtered = filtered.filter(t =>
      t.description.toLowerCase().includes(searchTerm) ||
      t.category.toLowerCase().includes(searchTerm)
    );
  }

  renderTransactions(filtered);
}

// Update stats
function updateStats() {
  const totalIncome = sampleTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = sampleTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = sampleAccounts.reduce((sum, a) => sum + a.balance, 0);

  // Update DOM if elements exist
  if (document.getElementById('totalBalance')) {
    document.getElementById('totalBalance').textContent = formatCurrency(totalBalance);
  }
  if (document.getElementById('totalIncome')) {
    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
  }
  if (document.getElementById('totalExpense')) {
    document.getElementById('totalExpense').textContent = formatCurrency(-totalExpense);
  }
  if (document.getElementById('monthBalance')) {
    document.getElementById('monthBalance').textContent = formatCurrency(totalIncome - totalExpense);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Render components if containers exist
  renderTransactions();
  renderBudgets();
  renderAccounts();
  updateStats();

  // Set up filter listeners
  ['filterType', 'filterCategory', 'searchTransaction'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', filterTransactions);
      element.addEventListener('input', filterTransactions);
    }
  });

  // Active nav highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  console.log('MyCash app initialized');
});

// Export functions for use in other files
window.MyCash = {
  formatCurrency,
  formatDate,
  openModal,
  closeModal,
  renderTransactions,
  renderBudgets,
  renderAccounts,
  sampleTransactions,
  sampleBudgets,
  sampleAccounts,
};
