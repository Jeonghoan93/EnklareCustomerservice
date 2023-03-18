|-- enklare-chatbot-backend
    |-- .env
    |-- .gitignore
    |-- package.json
    |-- package-lock.json
    |-- server.js
    |-- config
    |   |-- db.js
    |   |-- rateLimiter.js
    |   |-- openaiApi.js
    |-- middleware
    |   |-- authentication.js
    |   |-- errorHandler.js
    |-- models
    |   |-- user.js
    |   |-- chatbotInteraction.js
    |-- routes
    |   |-- api
    |   |   |-- chat.js
    |   |   |-- users.js
    |   |   |-- loans.js
    |-- controllers
    |   |-- chatController.js
    |   |-- userController.js
    |   |-- loanController.js
    |-- services
    |   |-- openaiService.js
    |   |-- loanService.js
    |-- utils
    |   |-- responseParser.js
    |   |-- logger.js
    |-- tests
        |-- unit
        |   |-- models
        |   |   |-- user.test.js
        |   |   |-- chatbotInteraction.test.js
        |   |-- services
        |       |-- openaiService.test.js
        |       |-- loanService.test.js
        |-- integration
            |-- routes
                |-- chat.test.js
                |-- users.test.js
                |-- loans.test.js

frontend/
│
├─ public/
│   ├─ index.html
│   └─ favicon.ico
│
├─ src/
│   ├─ assets/
│   │   └─ logo.png
│   │
│   ├─ components/
│   │   ├─ Chatbot.vue
│   │   └─ ChatMessage.vue
│   │
│   ├─ store/
│   │   ├─ index.ts
│   │   ├─ chat.ts
│   │   └─ user.ts
│   │
│   ├─ views/
│   │   └─ Home.vue
│   │
│   ├─ App.vue
│   ├─ main.ts
│   └─ shims-vue.d.ts
│
├─ .env
├─ .gitignore
├─ babel.config.js
├─ package.json
├─ README.md
└─ tsconfig.json


