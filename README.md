# WebFinal

## Запуск

`npm start`
Запускается сервер и затем он запускает дочерний процесс, который выполняет `react-scripts start` и в браузере открывается проект

## Доступные методы API

1. `GET` `/api/mails/` - получение списка писем
    Параметры: 
    `limit` - сколько нужно получить писем
    `page` - страницы, ограниченные лимитом, которые отдаются с бека (если limit = 20, то page = 1: 0-19 элементы, page = 2: 20-40 элементы и т.д.)
2. `POST` `/api/mails/` - в request.body отдается массив писем
