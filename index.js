const mamiSelectorBtn = document.querySelector('#mami-Selector');
const luckySelectorBtn = document.querySelector('#lucky-Selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form'); // Corrected variable name
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
   <div class="message ${message.sender === 'mami' ? 'blue-bg' : 'gray-bg'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
   </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
}

let messageSender = 'lucky';

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    if (name === 'lucky') {
        luckySelectorBtn.classList.add('active-person');
        mamiSelectorBtn.classList.remove('active-person');
    }

    if (name === 'mami') {
        mamiSelectorBtn.classList.add('active-person');
        luckySelectorBtn.classList.remove('active-person');
    }
}

mamiSelectorBtn.onclick = () => updateMessageSender('mami');
luckySelectorBtn.onclick = () => updateMessageSender('lucky');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages)); // Corrected to store messages array
    chatMessages.innerHTML += createChatMessageElement(message);

    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
});
