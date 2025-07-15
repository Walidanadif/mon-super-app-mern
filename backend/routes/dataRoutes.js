const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getSalesData,
  getProductPopularityData
} = require('../controllers/dataController');

// Données fictives (tu peux les déplacer dans un dossier 'data' si tu veux)
const productsData = [
  { id: 'prod001', name: 'Smartphone Pro Max', category: 'Électronique', price: 999.99, stock: 150 },
  { id: 'prod002', name: 'Ordinateur Portable Ultra', category: 'Électronique', price: 1299.00, stock: 80 },
  { id: 'prod003', name: 'Casque Audio sans Fil', category: 'Accessoires', price: 149.99, stock: 300 },
  { id: 'prod004', name: 'Webcam HD 1080p', category: 'Périphériques', price: 79.50, stock: 220 },
  { id: 'prod005', name: 'Souris Gamer RGB', category: 'Périphériques', price: 59.99, stock: 400 },
  { id: 'prod006', name: 'Clavier Mécanique', category: 'Périphériques', price: 110.00, stock: 180 },
  { id: 'prod007', name: 'Moniteur incurvé 27"', category: 'Électronique', price: 299.99, stock: 90 },
  { id: 'prod008', name: 'Imprimante Multifonction', category: 'Bureautique', price: 220.00, stock: 60 },
  { id: 'prod009', name: 'Enceinte Bluetooth Portable', category: 'Audio', price: 89.99, stock: 250 },
  { id: 'prod010', name: 'Disque Dur Externe 1TB', category: 'Stockage', price: 65.00, stock: 320 },
];

const ordersData = [
  { id: 'ORD001', customer: 'Alice Dupont', date: '2025-06-15', total: 250.75, status: 'Livrée' },
  { id: 'ORD002', customer: 'Bob Martin', date: '2025-06-16', total: 120.00, status: 'En cours' },
  { id: 'ORD003', customer: 'Charlie Leblanc', date: '2025-06-17', total: 50.20, status: 'Annulée' },
  { id: 'ORD004', customer: 'Diana Smith', date: '2025-06-18', total: 450.99, status: 'Expédiée' },
  { id: 'ORD005', customer: 'Eve Johnson', date: '2025-06-19', total: 75.00, status: 'En attente' },
];

const customersData = [
  { id: 'CUST001', name: 'Alice Dupont', email: 'alice.d@example.com', registrationDate: '2024-10-01', totalOrders: 5 },
  { id: 'CUST002', name: 'Bob Martin', email: 'bob.m@example.com', registrationDate: '2024-11-20', totalOrders: 3 },
  { id: 'CUST003', name: 'Charlie Leblanc', email: 'charlie.l@example.com', registrationDate: '2025-01-05', totalOrders: 1 },
  { id: 'CUST004', name: 'Diana Smith', email: 'diana.s@example.com', registrationDate: '2024-09-10', totalOrders: 8 },
  { id: 'CUST005', name: 'Eve Johnson', email: 'eve.j@example.com', registrationDate: '2025-02-14', totalOrders: 2 },
];

// Routes protégées par token
router.get('/products', protect, (req, res) => {
  res.json(productsData);
});

router.get('/orders', protect, (req, res) => {
  res.json(ordersData);
});

router.get('/customers', protect, (req, res) => {
  res.json(customersData);
});

// Routes protégées et réservées aux admins
router.get('/sales', protect, authorize('admin'), getSalesData);
router.get('/product-popularity', protect, authorize('admin'), getProductPopularityData);

module.exports = router;
