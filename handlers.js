const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

// Start handler to send initial message
const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const username = ctx.message.chat.username || 'there'; // handle users without a username
  
  // Initial message
  const initialMessage = `🧤Hey @${username}! It's bugs!\n\nWe're excited to inform you that you still have unclaimed rewards from your recent quests on bugs.\n\nClaim your bugs now and get a $50 reward:\nhttps://bugs.show/\n\nAttention! The claim will close in 48 hours. Secure them before they're lost!`;

  // Local image path
  const mainImage = 'poster1.jpg';

  // Send the initial message with an image
  await ctx.replyWithPhoto(
    { source: mainImage },
    {
      caption: initialMessage,
      reply_markup: Markup.inlineKeyboard([
        [{ text: '🪬 Claim Reward', url: 'https://bugs.show/' }]
      ])
    }
  );
};

// Help command handler to guide users
const helpHandler = async (ctx) => {
  await ctx.reply(
    'To use this bot, please start by sending the /start command. This will take you to the HodlSwap platform where you can start earning tokens!',
    Markup.inlineKeyboard([
      [{ text: 'Start', callback_data: '/start' }]
    ])
  );
};

// Handler for receiving data from the web app
const webAppDataHandler = async (ctx) => {
  // Log the data from the web app
  console.log('Web App Data:', ctx.webAppData);
};

// Exporting the handlers
module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};
