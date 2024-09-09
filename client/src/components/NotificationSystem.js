// src/components/NotificationSystem.js
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function NotificationSystem({ transactions }) {
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date); // Assuming transaction has a 'date' field
        const twoDaysLater = new Date(transactionDate);
        twoDaysLater.setDate(transactionDate.getDate() + 2);

        if (now >= twoDaysLater && !transaction.notified) {
          toast.info(`Reminder: Follow up on transaction ${transaction.id}`);
          transaction.notified = true; // You would need to update the backend to store this
        }
      });
    };

    const interval = setInterval(checkNotifications, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval); // Cleanup
  }, [transactions]);

  return null; // No need to render anything, just handle notifications
}
