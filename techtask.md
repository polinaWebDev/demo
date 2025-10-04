# Техническое задание: Админ-панель на основе JSONPlaceholder

## Описание проекта
Pet-проект административной панели для управления данными из JSONPlaceholder API с современным стеком технологий.

## Технологический стек
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## Основные сущности для работы
1. **Users** - пользователи
2. **Posts** - посты
3. **Comments** - комментарии
4. **Albums** - альбомы
5. **Photos** - фотографии
6. **Todos** - задачи

## Функциональные требования

### 1. Аутентификация (Mock)
- Форма входа с email и паролем (без реальной валидации)
- Сохранение состояния "авторизации" в Zustand
- Защищенные роуты (redirect на /login если не авторизован)
- Logout функционал

### 2. Dashboard (Главная страница)
- Карточки со статистикой:
  - Общее количество пользователей
  - Общее количество постов
  - Общее количество альбомов
  - Количество выполненных/невыполненных задач
- Виджет с последними постами (5 штук)
- Виджет с активными пользователями

### 3. Управление пользователями
**Список пользователей** (`/users`)
- Таблица со всеми пользователями
- Поиск по имени и email
- Пагинация (если много данных)
- Сортировка по колонкам
- Кнопки действий: View, Edit, Delete

**Просмотр пользователя** (`/users/[id]`)
- Подробная информация о пользователе
- Список постов пользователя
- Список альбомов пользователя
- Список задач пользователя

**Создание/Редактирование пользователя** (`/users/new`, `/users/[id]/edit`)
- Форма с полями: name, username, email, phone, website
- Адрес: street, suite, city, zipcode
- Компания: name, catchPhrase, bs
- Валидация полей
- Отправка POST/PUT запроса

### 4. Управление постами
**Список постов** (`/posts`)
- Таблица/Grid с постами
- Фильтр по автору (userId)
- Поиск по заголовку и содержимому
- Пагинация

**Просмотр поста** (`/posts/[id]`)
- Заголовок и содержимое поста
- Информация об авторе
- Список комментариев к посту

**Создание/Редактирование поста** (`/posts/new`, `/posts/[id]/edit`)
- Форма: title, body, userId (select)
- Валидация
- CRUD операции

### 5. Управление комментариями
**Список комментариев** (`/comments`)
- Таблица с комментариями
- Фильтр по посту
- Поиск по email и содержимому

**Модерация комментариев**
- Возможность удаления комментария
- Просмотр комментария в модальном окне

### 6. Управление альбомами и фотографиями
**Список альбомов** (`/albums`)
- Grid/List view альбомов
- Фильтр по пользователю
- Количество фотографий в каждом альбоме

**Просмотр альбома** (`/albums/[id]`)
- Информация об альбоме
- Gallery с фотографиями (thumbnails)
- Lightbox для просмотра полноразмерных фото

### 7. Управление задачами (Todos)
**Список задач** (`/todos`)
- Таблица с задачами
- Фильтр: All / Completed / Active
- Фильтр по пользователю
- Возможность отметить задачу выполненной/невыполненной

**Канбан доска** (`/todos/board`) - опционально
- Колонки: To Do, In Progress, Done
- Drag-and-drop (можно эмулировать изменение статуса)

## Технические требования

### Архитектура приложения
```
/app
  /(auth)
    /login
      page.tsx
  /(dashboard)
    layout.tsx          # Layout с sidebar и header
    /page.tsx           # Dashboard
    /users
      /page.tsx
      /[id]
        /page.tsx
        /edit
          /page.tsx
      /new
        /page.tsx
    /posts
    /comments
    /albums
    /todos
  /api                  # Route handlers (если нужны)
/components
  /ui                   # shadcn/ui компоненты
  /features             # Feature-specific компоненты
  /layout               # Sidebar, Header, Footer
/lib
  /api                  # API функции
  /hooks                # Custom hooks
  /store                # Zustand stores
  /utils                # Утилиты
```

### State Management (Zustand)
- **authStore**: состояние авторизации, данные пользователя
- **uiStore**: состояние UI (sidebar collapsed, theme, etc.)

### Data Fetching (TanStack Query)
- Настройка QueryClient с дефолтными параметрами
- Custom hooks для каждой сущности:
  - `useUsers()`, `useUser(id)`, `useCreateUser()`, `useUpdateUser()`, `useDeleteUser()`
  - Аналогично для posts, comments, albums, todos
- Оптимистичные обновления для лучшего UX
- Кэширование запросов
- Prefetching для улучшения производительности

### UI/UX требования
- Responsive дизайн (mobile, tablet, desktop)
- Dark/Light theme toggle
- Loading states (скелетоны, спиннеры)
- Error handling с красивыми error states
- Toast уведомления для действий (success/error)
- Подтверждение удаления через Dialog
- Breadcrumbs для навигации
- Sidebar с навигацией (collapsible)

### shadcn/ui компоненты для использования
- Button, Input, Label
- Table, DataTable
- Dialog, AlertDialog
- Card, Badge
- Select, Combobox
- Form (react-hook-form)
- Toast/Sonner
- Skeleton
- Tabs
- Dropdown Menu
- Avatar
- Pagination

## API Endpoints (JSONPlaceholder)
```
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id

GET    /posts
GET    /posts/:id
GET    /posts?userId=:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id

GET    /comments
GET    /comments?postId=:id
POST   /comments
DELETE /comments/:id

GET    /albums
GET    /albums/:id
GET    /photos?albumId=:id
POST   /albums
DELETE /albums/:id

GET    /todos
GET    /todos?userId=:id
PATCH  /todos/:id
POST   /todos
DELETE /todos/:id
```

## Дополнительные фичи (опционально)
- Экспорт данных в CSV/JSON
- Bulk operations (массовое удаление)
- Фильтры с сохранением в URL (query params)
- Infinite scroll вместо пагинации
- Real-time обновления (эмуляция через polling)
- Статистика и графики (recharts/chart.js)
- Настройки профиля администратора
- История действий (audit log)
- Keyboard shortcuts

## Deployment
- Vercel / Netlify
- Environment variables для API URL
- Оптимизация bundle size
- SEO оптимизация (metadata)

## Этапы разработки
1. **Инициализация проекта** - setup Next.js, конфигурация
2. **UI Kit** - настройка shadcn/ui, Tailwind, базовые компоненты
3. **Роутинг и Layout** - структура страниц, sidebar, header
4. **Auth Mock** - простая авторизация
5. **API Integration** - настройка TanStack Query, API функции
6. **CRUD Users** - полный функционал для пользователей
7. **CRUD Posts** - функционал для постов
8. **Comments & Albums** - комментарии и альбомы
9. **Todos** - управление задачами
10. **Dashboard** - главная страница со статистикой
11. **Polish** - улучшение UX, анимации, финальные правки
12. **Deploy** - деплой на Vercel

## Критерии успеха
- ✅ Все CRUD операции работают корректно
- ✅ Красивый и отзывчивый UI
- ✅ Быстрая загрузка и отзывчивость приложения
- ✅ Корректная обработка ошибок
- ✅ Понятная навигация
- ✅ Чистый и поддерживаемый код
- ✅ Работает на всех устройствах