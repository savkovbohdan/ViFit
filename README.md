![](https://raw.githubusercontent.com/savkovbohdan/ViFit/967799a3c7fea4d634d02ffcb3aa2dad4f53b2b9/Header.svg)
![Lines of code](https://img.shields.io/tokei/lines/github/art9studio/aureole)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/art9studio/aureole)

<a href="https://discord.gg/EjBQ3fKg"><img src="https://img.shields.io/badge/chat-discord-brightgreen.svg?logo=discord&style=flat"></a>
<a href="https://twitter.com/aureolecloud"><img src="https://img.shields.io/badge/Follow-aureolecloud-blue.svg?style=flat&logo=twitter"></a>

# 🔥 О проекте

**Aureole** – сервер аутентификации и управления пользователями с открытым исходным кодом, быстрой интеграцией с любым стеком на вашем проекте, а также с модульной масштабируемой архитектурой и встроенным набором плагинов.

**Aureole** предоставляет совокупность самых важных функций &quot;из коробки&quot;: нативная поддержка **Hasura, PostgresSql, Django,** популярные способы аутентификации **Google, Apple ID, Facebook, с подтверждением по смс и email**. Если этого окажется недостаточно, то наша архитектура даст возможность быстро написать новый плагин под ваши бизнес процессы.


<img src="https://github.com/savkovbohdan/ViFit/blob/master/GifVideo.png" width="500px"/>


# 📍Статус

- [x] Alpha: Запуск и тестирование коробочного решения с базовым набором функций
- [ ] Pre-Beta: Исправление багов, начало разработки облачного решения
- [ ] Beta: Запуск облачного решения для закрытой группы клиентов
- [ ] Release candidate: Открытый доступ к облачному решению

Сейчас мы находимся на **ранней версии продукта (Pre-Alpha)**. Чтобы получать самые свежие версии сборок следите за обновлениями нашего репозитория (ветка master).

# ⚡Фичи

- Гибкая архитектура с использованием плагинов
- Аутентификация по логину и паролю
- Аутентификация с использование сторонних сервисов (Google, Apple ID, Facebook, vk)
- Аутентификация с подтверждением по электронной почте или смс (пример работы с twilio)
- Набор конфигов под ваши бизнес процессы и решения (Hasura, PostgresSql, Django)
- Многоязычная поддержка
- Модули хеширования паролей
- Подписанные JWT токены

# 📖 Содержание ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

- [Быстрый запуск:](#-быстрый-запуск-)
    - [Развертывание в один клик](#развертывание-в-один-клик)
    - [Heroku](#развертывание-aureole-на-heroku)
    - [Render](#other-deployment-methods)
    - [Другие методы развертывания](#other-deployment-methods)
- [Архитектура](#architecture)
- [Инструменты клиентской стороны](#client-side-tooling)
    - [Rest API](#other-one-click-deployment-options)
    - [Интеграция с бизнес-логикой](#other-deployment-methods)
- [Плагины](#add-business-logic)
    - [О плагинах](#remote-schemas)
    - [Список плагинов](#trigger-webhooks-on-database-events)
- [Примеры](#demos)
- [Поддержка и устранение багов](#support--troubleshooting)
- [Лицензия](#contributing)
- [Переводы assets](#brand-assets)


# 🚀 Быстрый запуск: ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

## Развертывание в один клик:

| Провайдер | Ссылка | Документация |
| --- | --- | --- |
| Heroku | ![](https://www.herokucdn.com/deploy/button.svg) | Ссылка |
| Render | ![](https://render.com/images/deploy-to-render-button.svg) | Ссылка |

### Развертывание Aureole на Heroku:


### Развертывание Aureole на Render:


# ⚙ Архитектура 

 <img src="https://github.com/savkovbohdan/ViFit/blob/master/Scheme.png" width="500px"/>

# 🔄 Коммуникация на стороне клиента ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

## Мы используем Rest API

Мы используем Rest API для избежания дополнительных внутренних прослоек, что означает передачу данных в исходном виде.

## Интеграция с бизнес-логикой

Aureole предоставляет простые в обосновании, масштабируемые и производительные методы для добавления бизнес-логики в ваш проект. Наш продукт позволяет быстро создать приложение с авторизацией без необходимости писать все с нуля.

# 🖇️ Плагины ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

## О плагинах

Aureole решает проблему модульности и масштабируемости с помощью гибкой архитектуры и системы плагинов.

Мы разработали базовый набор плагинов и предоставляем его абсолютно бесплатно. Также архитектура Aureole позволяет удобно расширить функции существующих плагинов и быстро разработать новые модули под свои задачи.

## Список плагинов

| Название | Краткое описание | Статус | Документация |
| --- | --- | --- | --- |
| AuthN | | | |
| AuthZ | | | |
| CryptoKey | | | |
| PwHasher | | | |
| Sender | | | |
| Storage | | | |


# 👾Примеры ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

# 💬 Поддержка и устранение багов ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

Документация и сообщество поможет вам решить большинство проблем. Если вы столкнулись с ошибкой или вам нужно связаться с нами, вы можете использовать один из следующих каналов связи:

- Поддержка и обратная связь: [Discord](https://discord.gg/EjBQ3fKg)
- Проблема и отслеживание ошибок: [GitHub issues](https://github.com/Art9Studio/Aureole/issues)
- Следите за обновлениями продукта в Twitter: [@aureolecloud](https://twitter.com/aureolecloud)
- Поговорите с нами в чате: [Telegram](https://t.me/joinchat/lsaDf65QlHk5M2Ri)

# 📝 Лицензия ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

Aureole доступен по адресу Apache License 2.0 (Apache-2.0).

Все прочие материалы (за исключением материалов, содержащихся в server, cli и console папках) доступны под MIT License. Сюда входит все, что есть в docs и community папках.

# 🈂️ Переводы ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

Russian 🇷🇺

English 🇷🇺
