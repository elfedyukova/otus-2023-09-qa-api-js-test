# Проект по написанию автотестов на JavaScript

Создано в рамках курса OTUS JavaScript QA Engineer

## О курсе

Курс "JavaScript QA Engineer"
https://otus.ru/lessons/qajs/

## Об этом проекте

В рамках этого проекта созданы автотесты для https://bookstore.demoqa.com/swagger/

## Технологии

* JS - основной язык программирования
* JEST - инструмент для автоматизации тестирования 

## Дополнительная информация

### Рекомендуемая структура проекта:

src // исходный код проекта, опциональная папка, если проект написан на JS и тесты хранятся в одном репозитории с исходным кодом проекта
specs // папка с тестами
framework // тестовый фреймворк
framework/services // контроллеры, обёртка запросов к API
framework/config // базовый урл, логин / пароль, токен авторизации
framework/fixtures // слой с фикстурами, генераторами данных для тестов