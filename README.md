# Примеры хранилищ

Примеры проектов React, использующие библиотеки Redux Toolkit, React Query, React Context. Проекты blogs сидят на одном бэкенде **blogs_backend** и содержат Redux Toolkit и React Query. Проект shop использует useContext и useReducer самого React.

### Описания проектов

1. **blogs_backend**
- Бэкенд для проектов `blogs_redux` и `blogs_query`.
- **Запуск**: `npm run dev`

2. **blogs_redux**
- Одностраничное приложение (SPA) для управления блогами. Использует Redux для управления состоянием и имеет стилизованные компоненты и React Bootstrap для стилизации. Аутентификация пользователя: `"username": "lemon", "password": "sokol"`.
- **Запуск**: `npm run dev`

3. **blogs_query**
- Похожий SPA для управления блогами, использует React Query и Context для управления состоянием. Стилизация обрабатывается Material UI и стилизованными компонентами. Аутентификация пользователя: `"username": "lemon", "password": "sokol"`.
- **Запуск**: `npm run dev`

. **react-shop**
- Интернет магазин по апи [FortniteApi](https://fortniteapi.io/)
- **Запуск**: `npm run start`

### Использование

1. **Клонирование репозитория**:
```sh
git clone https://github.com/lemon1964/ReduxAndQueryAndReactContext.git
```

2. **К проектам**:
- `cd blogs_backend`
- `cd blogs_redux`
- `cd blogs_query`
- `cd react-shop`

3. **Зависимости**:
```sh
npm install
```

6. **Доступ к приложениям**:
- Backend: `http://localhost:3003/api/blogs/`
- Frontend: `http://localhost:5173`
