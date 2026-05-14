# YT Insight Frontend

Фронтенд проекта на `Next.js 16` и `React 19`.

## Что нужно для запуска

- `Node.js >= 20.9.0`
- `npm`
- запущенный бэкенд `YT Insight` на `http://localhost:8000`
- ключи `Clerk`

Минимальная версия Node взята из установленного в проекте `next@16.2.4`.

## Быстрый старт

```bash
# 1. Установить зависимости
npm ci

# 2. Создать env-файл
cp .env.local.example .env.local

# 3. Заполнить .env.local своими ключами Clerk

# 4. Запустить dev-сервер
npm run dev
```

После запуска приложение будет доступно на [http://localhost:3000](http://localhost:3000).

## Как поднять бэкенд

Фронтенд ходит в API по адресу из `NEXT_PUBLIC_API_URL`. По умолчанию в проекте ожидается:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Если бэкенд лежит рядом, его README находится в [../yt_insight_current/README.md](../yt_insight_current/README.md). Минимально для локальной разработки нужно поднять Django API, а для части сценариев еще и Celery/Redis.

## Настройка `.env.local`

Создай файл `.env.local` из шаблона:

```bash
cp .env.local.example .env.local
```

И заполни его:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Что делают переменные

- `NEXT_PUBLIC_API_URL` - базовый URL бэкенда
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - публичный ключ Clerk для фронтенда
- `CLERK_SECRET_KEY` - секретный ключ Clerk
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - роут логина
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - роут регистрации
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - куда редиректить после входа
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - куда редиректить после регистрации

Без валидных ключей Clerk защищенные страницы и auth-flow работать не будут.

## Основные команды

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run gen-types
```

Что они делают:

- `npm run dev` - локальная разработка
- `npm run build` - production build
- `npm run start` - запуск production build
- `npm run lint` - проверка ESLint
- `npm run gen-types` - пересобрать `types/generated.ts` из `openapi.yaml`

## Проверка, что все поднялось

1. Запусти бэкенд на `http://localhost:8000`
2. Запусти фронтенд через `npm run dev`
3. Открой `http://localhost:3000`
4. Проверь, что открывается главная страница
5. Проверь, что логин/регистрация работают с твоим Clerk-проектом

## Если что-то не стартует

- `npm: command not found` - не установлен Node.js / npm
- ошибки Clerk при старте - проверь ключи в `.env.local`
- `fetch`/API ошибки - проверь, что бэкенд действительно слушает `NEXT_PUBLIC_API_URL`
- редиректы на логин - это нормально для защищенных роутов без авторизации

## Структура, важная для запуска

- `app/` - маршруты Next.js App Router
- `providers/auth-provider.tsx` - инициализация auth и загрузка текущего пользователя
- `lib/api.ts` - все запросы в бэкенд, базовый URL берется из `NEXT_PUBLIC_API_URL`
- `proxy.ts` - защита приватных роутов через Clerk
