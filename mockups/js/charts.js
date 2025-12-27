// MyCash - Charts Configuration using Chart.js

// Chart.js default configuration
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.color = '#6B7280';

// Color palette
const colors = {
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  purple: '#8B5CF6',
  pink: '#EC4899',
};

const categoryColors = [
  '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6',
  '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316'
];

// Expenses by Category Chart (Pie/Doughnut)
function initExpensesByCategoryChart() {
  const ctx = document.getElementById('expensesByCategoryChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Comida', 'Transporte', 'Entretenimiento', 'Salud', 'Vivienda', 'Tecnología'],
      datasets: [{
        data: [3250, 1200, 899, 1500, 8000, 899],
        backgroundColor: categoryColors.slice(0, 6),
        borderWidth: 0,
        hoverOffset: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: '600'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: $${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Income vs Expenses Chart (Line)
function initIncomeVsExpensesChart() {
  const ctx = document.getElementById('incomeVsExpensesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos',
          data: [28000, 30000, 25000, 32000, 29000, 30000],
          borderColor: colors.success,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: colors.success,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Gastos',
          data: [22000, 25000, 21000, 28000, 23000, 15748],
          borderColor: colors.danger,
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: colors.danger,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12,
              weight: '600'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: '600'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + context.parsed.y.toLocaleString();
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        x: {
          grid: {
            display: false,
          }
        }
      }
    }
  });
}

// Top Categories Chart (Bar)
function initTopCategoriesChart() {
  const ctx = document.getElementById('topCategoriesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Vivienda', 'Comida', 'Salud', 'Transporte', 'Tecnología'],
      datasets: [{
        label: 'Gasto',
        data: [8000, 3250, 1500, 1200, 899],
        backgroundColor: [
          colors.primary,
          colors.success,
          colors.danger,
          colors.info,
          colors.warning
        ],
        borderRadius: 8,
        barThickness: 40,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: '600'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return 'Gasto: $' + context.parsed.x.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        y: {
          grid: {
            display: false,
          }
        }
      }
    }
  });
}

// Account Balance Trend Chart (Area)
function initAccountBalanceChart() {
  const ctx = document.getElementById('accountBalanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Cuenta Bancaria',
          data: [35000, 38000, 42000, 46000, 43000, 45250],
          borderColor: colors.primary,
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Ahorros',
          data: [10000, 11000, 12000, 13500, 14200, 15000],
          borderColor: colors.success,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Efectivo',
          data: [3000, 2500, 2800, 2300, 2700, 2500],
          borderColor: colors.info,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: '600'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + context.parsed.y.toLocaleString();
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          stacked: false,
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        x: {
          grid: {
            display: false,
          }
        }
      }
    }
  });
}

// Monthly Comparison Chart (for reports)
function initMonthlyComparisonChart() {
  const ctx = document.getElementById('monthlyComparisonChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos',
          data: [28000, 30000, 25000, 32000, 29000, 31000, 28000, 30000, 25000, 32000, 29000, 30000],
          backgroundColor: colors.success,
        },
        {
          label: 'Gastos',
          data: [22000, 25000, 21000, 28000, 23000, 26000, 22000, 25000, 21000, 28000, 23000, 15748],
          backgroundColor: colors.danger,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        x: {
          grid: {
            display: false,
          }
        }
      }
    }
  });
}

// Initialize all charts
function initAllCharts() {
  initExpensesByCategoryChart();
  initIncomeVsExpensesChart();
  initTopCategoriesChart();
  initAccountBalanceChart();
  initMonthlyComparisonChart();
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initAllCharts);

// Export for use in other files
window.MyCashCharts = {
  initExpensesByCategoryChart,
  initIncomeVsExpensesChart,
  initTopCategoriesChart,
  initAccountBalanceChart,
  initMonthlyComparisonChart,
  initAllCharts,
};
