# Как увидеть и запустить фронтенд

## Вариант 1: Локальная разработка (на вашем компьютере)

### Шаг 1: Перейдите в директорию фронтенда
```bash
cd /home/farael/GitHub/rec-me/frontend
```

### Шаг 2: Установите зависимости (если еще не установлены)
```bash
npm install
# или если используете pnpm
pnpm install
```

### Шаг 3: Запустите dev сервер
```bash
npm run dev
# или
pnpm dev
```

### Шаг 4: Откройте в браузере
Откройте браузер и перейдите по адресу:
```
http://localhost:3000
```

Фронтенд будет доступен на порту **3000** по умолчанию.

---

## Вариант 2: Через Docker (для разработки)

### Запуск через docker-compose:
```bash
cd /home/farael/GitHub/rec-me/frontend
docker-compose -f docker-compose.yml.dev up
```

Фронтенд будет доступен на `http://localhost:3000`

---

## Вариант 3: На продакшн сервере

### Если фронтенд уже запущен на сервере:

1. **Через домен** (если nginx настроен):
   ```
   https://lead-form.website
   ```

2. **Напрямую по IP и порту** (если nginx не настроен):
   ```
   http://IP_СЕРВЕРА:3000
   ```

### Запуск фронтенда на сервере:

#### Способ A: Через npm напрямую
```bash
cd /path/to/frontend
npm install
npm run build
npm run start
```

#### Способ B: Через Docker (продакшн)
```bash
cd /path/to/frontend
docker build -f Dockerfile.prod -t frontend-app .
docker run -d -p 3000:3000 --name frontend frontend-app
```

#### Способ C: Через PM2 (рекомендуется для продакшна)
```bash
# Установите PM2
npm install -g pm2

# Перейдите в директорию фронтенда
cd /path/to/frontend

# Соберите приложение
npm run build

# Запустите через PM2
pm2 start npm --name "frontend" -- start

# Сохраните конфигурацию PM2
pm2 save
pm2 startup
```

---

## Проверка, что фронтенд работает

### Локально:
```bash
# Проверьте, что порт 3000 слушается
curl http://localhost:3000

# Или откройте в браузере
# http://localhost:3000
```

### На сервере:
```bash
# Проверьте, что процесс запущен
ps aux | grep node
# или
pm2 list

# Проверьте, что порт открыт
netstat -tulpn | grep 3000
# или
ss -tulpn | grep 3000

# Проверьте доступность
curl http://localhost:3000
```

---

## Если фронтенд не открывается

### Проблема: "Cannot GET /" или 404
**Решение:** Убедитесь, что Next.js сервер запущен:
```bash
cd frontend
npm run dev
```

### Проблема: Порт 3000 занят
**Решение:** 
```bash
# Найдите процесс на порту 3000
lsof -i :3000
# или
netstat -tulpn | grep 3000

# Остановите процесс или используйте другой порт
# Для Next.js можно указать другой порт:
PORT=3001 npm run dev
```

### Проблема: Ошибки при сборке
**Решение:**
```bash
# Очистите кэш и переустановите зависимости
rm -rf node_modules .next
npm install
npm run build
```

### Проблема: Не видно через домен
**Решение:**
1. Проверьте, что nginx запущен: `sudo systemctl status nginx`
2. Проверьте, что фронтенд работает на порту 3000: `curl http://localhost:3000`
3. Проверьте логи nginx: `sudo tail -f /var/log/nginx/error.log`
4. Проверьте конфигурацию nginx: `sudo nginx -t`

---

## Полезные команды

```bash
# Остановить dev сервер
# Нажмите Ctrl+C в терминале

# Остановить через PM2
pm2 stop frontend
pm2 restart frontend
pm2 delete frontend

# Просмотр логов PM2
pm2 logs frontend

# Остановить Docker контейнер
docker stop myapp-dev
docker-compose -f docker-compose.yml.dev down
```

---

## Структура URL

После настройки nginx:
- **Фронтенд:** `https://lead-form.website`
- **API:** `https://api.lead-form.website`

Локально (для разработки):
- **Фронтенд:** `http://localhost:3000`
- **API:** `http://localhost:9000` (если бэкенд запущен локально)

