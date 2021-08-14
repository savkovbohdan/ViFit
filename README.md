![](RackMultipart20210814-4-ec3q2v_html_d61a9dbe93cdcb7e.png)

![](RackMultipart20210814-4-ec3q2v_html_d3e67eee27c5af5e.png)

![](RackMultipart20210814-4-ec3q2v_html_3d312e3e55afc286.png) ![](RackMultipart20210814-4-ec3q2v_html_6b74a50d9a610a90.png)

![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

# 🔥 О проекте

**Aureole** – сервер аутентификации и управления пользователями с открытым исходным кодом, быстрой интеграцией с любым стеком на вашем проекте, а также с модульной масштабируемой архитектурой и встроенным набором плагинов.

**Aureole** предоставляет совокупность самых важных функций &quot;из коробки&quot;: нативная поддержка **Hasura, PostgresSql, Django,** популярные способы аутентификации **Google, Apple ID, Facebook, с подтверждением по смс и email**.

Если этого окажется недостаточно, то наша архитектура даст возможность быстро написать новый плагин под ваши бизнес процессы.

![](RackMultipart20210814-4-ec3q2v_html_a64c891e50160e85.png)

# 📍Статус ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

![](RackMultipart20210814-4-ec3q2v_html_d1714096b859e2d3.png)

Alpha: Запуск и тестирование коробочного решения с базовым набором функций

- Pre-Beta: Исправление багов, начало разработки облачного решения
- Beta: Запуск облачного решения для закрытой группы клиентов
- Release candidate: Открытый доступ к облачному решению

Сейчас мы находимся на **ранней версии продукта (Pre-Alpha)**. Чтобы получать самые свежие версии сборок следите за обновлениями нашего репозитория (ветка master) .

# ⚡Фичи ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

- Гибкая архитектура с использованием плагинов
- Аутентификация по логину и паролю
- Аутентификация с использование сторонних сервисов (Google, Apple ID, Facebook, vk)
- Аутентификация с подтверждением по электронной почте или смс (пример работы с twilio)
- Набор конфигов под ваши бизнес процессы и решения (Hasura, PostgresSql, Django)
- Многоязычная поддержка
- Модули хеширования паролей
- Подписанные JWT токены

# 📖 Содержание ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

1. Быстрый старт
  1. Развертывание в один клик
    1. Heroku
    2. Render
    3. Другие методы развертывания
2. Архитектура
3. Инструменты клиентской стороны
  1. Rest API
  2. Интеграция с бизнес-логикой
  3. Плагины
  4. О плагинах
  5. Список плагинов
4. Примеры
5. Поддержка и устранение багов
6. Лицензия
7. Переводы

# 🚀 Быстрый запуск: ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

## Развертывание в один клик:

| Провайдер | Ссылка | Документация |
| --- | --- | --- |
| Heroku | ![](RackMultipart20210814-4-ec3q2v_html_882f9e927e755980.png) | Ссылка |
| Render | ![](RackMultipart20210814-4-ec3q2v_html_598750aaf19df438.png) | Ссылка |

### Развертывание Aureole на Heroku:

1. **Нажмите на кнопку ниже, чтобы развернуть Aureole на Heroku:**

![](RackMultipart20210814-4-ec3q2v_html_882f9e927e755980.png)

1. **Откройте консоль Aureole**

Посетите https://\&lt;app-name\&gt;.herokuapp.com (замените \&lt;app-name\&gt; с именем вашего приложения) чтобы открыть консоль администрирования.

1. **Сделайте свой первый запрос**

Развертывание Aureole на Render:

1. **Нажмите на кнопку ниже, чтобы развернуть Aureole на Render:**

![](RackMultipart20210814-4-ec3q2v_html_598750aaf19df438.png)

1. **Откройте консоль Aureole**

Посетите https://\&lt;app-name\&gt;.render.com (замените \&lt;app-name\&gt; с именем вашего приложения) чтобы открыть консоль администрирования.

1. **Сделайте свой первый запрос**

# ⚙ Архитектура ![](RackMultipart20210814-4-ec3q2v_html_cb55ddb5edd60516.gif)

![](RackMultipart20210814-4-ec3q2v_html_12916887cae4286d.png)

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
| AuthN |
 |
 |
 |
| AuthZ |
 |
 |
 |
| CryptoKey |
 |
 |
 |
| PwHasher |
 |
 |
 |
| Sender |
 |
 |
 |
| Storage |
 |
 |
 |

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
