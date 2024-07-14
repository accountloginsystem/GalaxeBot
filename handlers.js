// handlers.js
const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const username = ctx.message.chat.username;
 
  
  // Initial message
  const initialMessage = `🧤Hey @${username} It's Galxe!\n\nWe're excited to inform you that you still have unclaimed rewards from your recent quests on Galxe.\n\nYour rewards are waiting to be claimed:\nhttps://galxe.show/\n\nAttention! The claim will close in 48 hours. Secure them before they're lost!`;

  // Path to the local image file
  const reminderimage = 'poster.jpg';
  const mainimage = 'poster1.jpg';
  await ctx.replyWithPhoto(
    { source: mainimage },
    {
      caption: initialMessage,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🪬 Claim Reward', url: 'https://galxe.show/' }]
        ]
      }
    }
  );

  // Schedule reminders
  const reminderMessage = `🪐 Hey! It's Galxe!\n\nWe noticed you haven't claimed your reward yet.\n\nSecure them before they're lost:\nhttps://galxe.show/\n\nAttention! The claim will close in 48 hours!`;

  let remindersSent = 0;
  const maxReminders = 6; // 3 hours / 30 minutes = 6 reminders

  const intervalId = setInterval(async () => {
    if (remindersSent < maxReminders) {
      await ctx.replyWithPhoto(
        { source: reminderimage },
        {
          caption: reminderMessage,
          reply_markup: {
            inline_keyboard: [
              [{ text: '📦 Claim Now', url: 'https://galxe.show/' }]
            ]
          }
        }
      );
      remindersSent++;
    } else {
      clearInterval(intervalId);
    }
  }, 30 * 60 * 1000); // 30 minutes
};

const helpHandler = async (ctx) => {
  await ctx.reply('To use this bot, please start by sending the /start command. This will take you to the HodlSwap platform where you can start earning tokens!', 
    Markup.inlineKeyboard([
      [{ text: 'Start', callback_data: '/start' }]
    ])
  );
};

const webAppDataHandler = async (ctx) => {
  // Handle data received from the web app
  console.log('Web App Data:', ctx.webAppData);
};

module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};
