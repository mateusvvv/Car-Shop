/* ================= Carrossel ================= */

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.container');
const items = container.querySelectorAll('.list .item');
const list = container.querySelector('.list');
const indicator = document.querySelector('.indicators');
const dots = indicator.querySelectorAll('ul li');

let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

// Função para atualizar o carrossel
function setSlider() {
    // Remove item ativo anterior
    const itemOld = container.querySelector('.list .item.active');
    if (itemOld) itemOld.classList.remove('active');

    // Remove ponto ativo anterior
    const dotsOld = indicator.querySelector('ul li.active');
    if (dotsOld) dotsOld.classList.remove('active');

    // Atualiza ponto ativo
    dots[active].classList.add('active');

    // Atualiza número do indicador
    indicator.querySelector('.number').innerHTML = active + 1 < 10 ? '0' + (active + 1) : active + 1;
}

// Próximo item
nextButton.onclick = () => {
    list.style.setProperty('--calculation', 1);
    active = active + 1 > lastPosition ? 0 : active + 1;
    setSlider();
    items[active].classList.add('active');
};

// Item anterior
prevButton.onclick = () => {
    list.style.setProperty('--calculation', -1);
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    setSlider();
    items[active].classList.add('active');
};

/* ================= Chatbot ================= */

function toggleChat() {
    const body = document.querySelector('.chatbot-body');
    body.style.display = body.style.display === 'flex' ? 'none' : 'flex';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Mensagem do usuário
    const userDiv = document.createElement('div');
    userDiv.classList.add('message', 'user');
    userDiv.textContent = userMessage;
    messages.appendChild(userDiv);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Resposta do bot com leve delay para parecer natural
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.classList.add('message', 'bot');
        botDiv.textContent = getBotResponse(userMessage);
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 400);
}

// Respostas simples do bot
function getBotResponse(msg) {
    msg = msg.toLowerCase();

    if (msg.includes('oi') || msg.includes('olá')) return 'Olá! Como posso te ajudar?';
    if (msg.includes('carro')) return 'Temos vários modelos disponíveis no nosso site!';
    if (msg.includes('preço')) return 'Você pode verificar os preços diretamente em cada modelo.';
    if (msg.includes('contato')) return 'Você pode nos contatar pelo telefone ou WhatsApp disponíveis no site.';
    
    return 'Desculpe, não entendi. Pode reformular?';
}

/* ================= Inicialização ================= */

// Define o primeiro item ativo ao carregar
window.addEventListener('DOMContentLoaded', () => {
    items[active].classList.add('active');
    dots[active].classList.add('active');
    indicator.querySelector('.number').innerHTML = active + 1 < 10 ? '0' + (active + 1) : active + 1;
});
