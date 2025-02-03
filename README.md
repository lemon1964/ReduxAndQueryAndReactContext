# Примеры хранилищ

В папке `part7` содержатся примеры проектов React, которые используют  библиотеки Redux Toolkit, React Query, React Context. Проекты blogs сидят на одном бэкенде **blogs_backend** и содержат Redux Toolkit и React Query. Проект shop использует useContext и useReducer самого React.

### Описания проектов

1. **blogs_backend**
- Проект бэкэнда, адаптированный из предыдущей версии, служащий бэкэндом для проектов `blogs_redux` и `blogs_query`.
- **Запуск**: `npm run dev`
- **Линтинг**: `npm run lint`
- **Тестирование**: `npm run test`

2. **blogs_redux**
- Одностраничное приложение (SPA) для управления блогами. Он использует Redux для управления состоянием и имеет стилизованные компоненты и React Bootstrap для стилизации. Аутентификация пользователя: `"username": "lemon", "password": "sokol"`.
- **Как запустить**: `npm run dev`
- **Линтинг**: `npm run lint`

3. **blogs_query**
- Похожий SPA для управления блогами, но он использует React Query и Context для управления состоянием. Стилизация обрабатывается Material UI и стилизованными компонентами. Аутентификация пользователя: `"username": "lemon", "password": "sokol"`.
- **Как запустить**: `npm run dev`
- **Линтинг**: `npm run lint`

### Использование

1. **Клонируйте репозиторий**:
```sh
git clone https://github.com/lemon1964/Fullstackopen_GitHub.git
```

2. **Перейдите к проектам**:
- Откройте следующие каталоги в `Fullstackopen_GitHub/part7/`:
- `blogs_backend`
- `blogs_redux`
- `blogs_query`
- `blogs_query`

3. **Установите необходимые зависимости**:
```sh
npm install
```

4. **Запустите проекты**:
```sh
npm run dev
```

5. **Для проекта ultimate-hooks дополнительно запустите сервер**:
```sh
npm run server
```

6. **Доступ к приложениям**:
- Backend: `http://localhost:3003/api/blogs/`
- Frontend: `http://localhost:5173`

7. **Откройте браузер, чтобы убедиться, что приложения работают в соответствии с требованиями курса**.

Не стесняйтесь обращаться, если у вас есть какие-либо вопросы.