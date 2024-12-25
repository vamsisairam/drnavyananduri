document.addEventListener("DOMContentLoaded", () => {

    // Chatbot Functionality
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatOutput = document.getElementById("chat-output");
    const chatToggle = document.getElementById("chatbot"); 
    const chatWindow = document.getElementById("chat-window");

    let userDetails = {}; 
    let chatEnded = false;
    let initialMessageDisplayed = false; 
    let isChatWindowMaximized = false; 

    function botReply(message) {
        if (chatEnded) return; 

        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = message;
        chatOutput.appendChild(botMessage);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function userReply(message) {
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = message;
        chatOutput.appendChild(userMessage);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            chatSend.click();
        }
    });

    chatSend.addEventListener("click", () => {
        const userMessage = chatInput.value.trim().toLowerCase(); 
        if (!userMessage) return;

        userReply(userMessage);
        chatInput.value = "";

        if (userMessage === "bye") {
            botReply("Okay, bye! It was good talking to you. Reach out if you need any help. ");
            chatEnded = true; 
            userDetails = {}; 
            return;
        }

        if (chatEnded && (userMessage === "hi" || userMessage === "hello" || userMessage === "hey")) {
            chatEnded = false; 
            botReply("Hello! What’s your name?"); 
            return; 
        }

        if (chatEnded) {
            return; 
        }

        // Check if this is the very first user input after the initial bot message
        if (!initialMessageDisplayed) { 
            initialMessageDisplayed = true; 
            if (userMessage === "hi" || userMessage === "hello" || userMessage === "hey") { 
                botReply("Hello! What’s your name?"); 
                return; 
            }
            return; // Do nothing for other initial inputs
        } 

        // Handle greetings at any point in the conversation
        if (userMessage === "hi" || userMessage === "hello" || userMessage === "hey") {
            botReply("Hi there!"); 
            return; 
        } 

        if (!userDetails.name) { 
            userDetails.name = userMessage;
            if (!userDetails.name) {
                botReply("Name cannot be empty. Can you please tell me your name?");
                return;
            }
            botReply(`Nice to meet you, ${userDetails.name}! Can I have your email?`);
            return; 
        } 

        if (!userDetails.email) { 
            userDetails.email = userMessage; 
            if (!isValidEmail(userDetails.email)) {
                botReply("That doesn't look like a valid email. Could you please provide a valid email?");
                return; 
            }
            botReply("Got it! What’s the purpose of your appointment?");
            return; 
        }

        userDetails.message = userMessage;
        if (!userDetails.message) {
            botReply("Please describe the purpose of your appointment.");
            return;
        }

        botReply("Thanks! Booking your appointment now...");

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://submit-form.com/osl2AVBaa"; 

        Object.keys(userDetails).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = userDetails[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
            botReply("Your appointment request has been sent! ✅");
        }, 1500); 

    });

    chatToggle.addEventListener("click", () => {
        if (!isChatWindowMaximized) {
            chatWindow.style.transform = "translateY(0)";
            chatWindow.style.opacity = "1";
            chatWindow.style.height = "400px"; 
            chatToggle.textContent = "[-]"; 
            isChatWindowMaximized = true; 
        } else {
            chatWindow.style.transform = "translateY(100%)";
            chatWindow.style.opacity = "0";
            chatWindow.style.height = "100px"; 
            chatToggle.textContent = "[+]"; 
            isChatWindowMaximized = false; 
        }
    });

    // Initialize userDetails with an empty object and set initialMessageDisplayed to false
    userDetails = {}; 
    initialMessageDisplayed = false; 
    botReply("If you need more help, just type!"); 

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hamburger Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
    });
});