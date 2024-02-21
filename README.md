# Проект по написанию автотестов на JavaScript

Создано в рамках курса OTUS JavaScript QA Engineer

## О курсе

Курс "JavaScript QA Engineer"
https://otus.ru/lessons/qajs/

## Об этом проекте

В рамках этого проекта созданы автотесты для https://bookstore.demoqa.com/swagger/

## Технологии

* JS — основной язык программирования
* JEST — фреймворк для тестирования JavaScript https://jestjs.io/ru/ 
* Supertest — библиотека, созданная с целью проводить функциональное тестирование HTTP-интерфейса https://www.npmjs.com/package/supertest 

## Дополнительная информация

### Рекомендуемая структура проекта:

- src // исходный код проекта, опциональная папка, если проект написан на JS и тесты хранятся в одном репозитории с исходным кодом проекта
- specs // папка с тестами
- framework // тестовый фреймворк
- framework/services // контроллеры, обёртка запросов к API
- framework/config // базовый урл, логин / пароль, токен авторизации
- framework/fixtures // слой с фикстурами, генераторами данных для тестов

### Для добавления в проект с автотестами инструмента репортинга jest-html-reporter:

1. Установите пакет jest-html-reporter: выполнив в терминале, находясь в корневой директории вашего проекта

```
   npm install --save-dev jest-html-reporter
   
```

2. Далее добавьте конфигурацию jest-html-reporter в ваш файл package.json. 

```
   "jest": {
       "reporters": ["default", "jest-html-reporters"]
   }
```
3. По умолчанию, jest-html-reporter будет генерировать отчет в папке "test-report.html" в корневом каталоге вашего проекта после каждого выполнения теста. Но можно настроить свое собственное местоположение и имя файла в настройках "jest-html-reporter". Для этого добавьте следующую конфигурацию в файл package.json:

```
   "jest": {
       "reporters": [
           "default",
           ["jest-html-reporters", {
               "publicPath": "./html-report",
               "filename": "report.html",
               "expand": true
           }]
       ]
   }
```
4. После этого, каждый раз, когда вы запускаете свои тесты с Jest, jest-html-reporter автоматически генерирует HTML-отчет о ваших тестах. 

Примечание: Если вы используете Yarn вместо npm, то команда установки будет выглядеть так:

```
yarn add --dev jest-html-reporter
```

