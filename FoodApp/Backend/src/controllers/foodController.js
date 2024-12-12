const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// Create food
exports.createFood = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const adminId = req.user.userId; // Assumes middleware to get logged-in user
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  
    try {
      const food = await prisma.food.create({
        data: { name, description, price, stock, createdBy: adminId },
      });
      res.status(201).json({ message: "Food item created successfully", food });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all food items
  exports.getAllFood = async (req, res) => {
    try {
      const foodItems = await prisma.food.findMany();
      res.status(200).json(foodItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update food item
  exports.updateFood = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
  
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  
    try {
      const food = await prisma.food.update({
        where: { id: parseInt(id) },
        data: { name, description, price, stock },
      });
      res.status(200).json({ message: "Food item updated", food });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete food item
  exports.deleteFood = async (req, res) => {
    const { id } = req.params;
  
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  
    try {
      await prisma.food.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: "Food item deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  