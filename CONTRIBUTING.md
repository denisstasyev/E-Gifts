# Правила работы с ветками

> Для запуска этого проекта необходимо, чтобы [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) и [Docker Compose](https://docs.docker.com/compose/install/) были установлены.

## Ветки

В проекте есть 4 основные ветки: master, dev, dev-front, dev-back. Разработка фронтенда и бекенда ведётся независимо в ветках dev-front и dev-back. Через pull request на Github вносятся изменения (после согласования) в ветку dev. Ветка master всегда содержит рабочую версию проекта.

## Правила названия комитов

- Делаются только на английском языке
- Начинаются с заглавной буквы
- Первое слово - глагол в настоящем времени
- Нет слова "commit" в названии

## Общие файлы

Для добавления изменений в документацию (папка docs) и в общие файлы создаётся новая ветка и через pull request на Github вносятся изменения (после согласования) в ветку dev.

## Алгоритм работы

> Сначала необходимо запустить команду `git clone https://github.com/denisstasyev/E-Gifts.git`

1. `git pull <название репозитория>`
2. `git checkout -b <название ветки, например, dev-back>`
---
3. `git add .`
4. `git commit -m "<Название коммита, например, Fix bug with smth>"`

#### Пункты 5-7 только из dev-back или dev-front.

5. `git push origin HEAD`
---
6. Pull request в dev на Github
### 7. `git pull origin dev`

[Пригодится для публикации релиза](https://habr.com/ru/post/106912/)
