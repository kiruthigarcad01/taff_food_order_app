const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Add item to cart
exports.addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    const userId = req.user.userId;
  
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          items: {
            create: { foodId, quantity },
          },
        },
      });
      res.status(201).json({ message: "Item added to cart", order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update cart item quantity
  exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedItem = await prisma.orderItem.update({
        where: { id: parseInt(id) },
        data: { quantity },
      });
      res.status(200).json({ message: "Cart updated", updatedItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Remove item from cart
  exports.removeFromCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.orderItem.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  