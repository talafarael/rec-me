# Решение проблемы 404 для /booking

## Что было исправлено

1. Удалены строки `root` и `index` из конфигурации - они конфликтовали с проксированием
2. Добавлена обработка API routes
3. Улучшена обработка статических файлов Next.js

## Шаги для применения исправлений

### 1. Скопируйте обновленный конфиг на сервер

```bash
sudo cp /nginx/conf.d/frontend.conf /etc/nginx/conf.d/frontend.conf
```

### 2. Проверьте конфигурацию

```bash
sudo nginx -t
```

Если есть ошибки, исправьте их перед продолжением.

### 3. Перезагрузите nginx

```bash
sudo systemctl reload nginx
```

## Диагностика проблемы

### Шаг 1: Проверьте, что Next.js работает на порту 3000

```bash
# На сервере выполните:
curl http://localhost:3000/booking

# Должен вернуться HTML страницы, а не ошибку
```

**Если получаете ошибку:**
- Фронтенд не запущен на порту 3000
- Запустите фронтенд: `cd /path/to/frontend && npm run start` (или через PM2/Docker)

### Шаг 2: Проверьте логи nginx

```bash
# Ошибки nginx
sudo tail -f /var/log/nginx/error.log

# Логи доступа фронтенда
sudo tail -f /var/log/nginx/frontend-access.log
sudo tail -f /var/log/nginx/frontend-error.log
```

### Шаг 3: Проверьте, что nginx проксирует запросы правильно

```bash
# Проверьте конфигурацию
sudo nginx -T | grep -A 20 "location /"
```

### Шаг 4: Проверьте доступность через домен

```bash
# С сервера
curl -I https://lead-form.website/booking

# Должен вернуться HTTP 200, а не 404
```

## Возможные причины 404

### 1. Next.js не запущен
**Решение:**
```bash
# Проверьте процессы
ps aux | grep node

# Запустите фронтенд
cd /path/to/frontend
npm run build
npm run start
# или через PM2
pm2 start npm --name "frontend" -- start
```

### 2. Next.js работает на другом порту
**Решение:** 
- Проверьте, на каком порту работает: `netstat -tulpn | grep node`
- Обновите `proxy_pass` в конфиге на правильный порт

### 3. Next.js не собран или собран неправильно
**Решение:**
```bash
cd /path/to/frontend
rm -rf .next
npm run build
npm run start
```

### 4. Проблема с роутингом Next.js
**Решение:**
- Убедитесь, что файл `/app/booking/page.tsx` существует
- Проверьте, что Next.js правильно настроен

### 5. Кэш браузера
**Решение:**
- Очистите кэш браузера (Ctrl+Shift+Delete)
- Попробуйте в режиме инкогнито
- Или добавьте `?v=1` к URL: `https://lead-form.website/booking?v=1`

## Проверка работы после исправлений

```bash
# 1. Проверьте, что Next.js работает локально
curl http://localhost:3000/booking

# 2. Проверьте через nginx
curl -I https://lead-form.website/booking

# 3. Проверьте в браузере
# Откройте: https://lead-form.website/booking
```

## Дополнительная отладка

Если проблема сохраняется, включите детальное логирование:

В `/etc/nginx/conf.d/frontend.conf` добавьте в блок `location /`:

```nginx
# Временное логирование для отладки
access_log /var/log/nginx/frontend-debug.log;
error_log /var/log/nginx/frontend-debug.log debug;
```

Затем:
```bash
sudo nginx -t
sudo systemctl reload nginx
# Попробуйте открыть страницу
sudo tail -f /var/log/nginx/frontend-debug.log
```

## Быстрая проверка всех компонентов

```bash
# 1. Next.js работает?
curl http://localhost:3000

# 2. Nginx работает?
sudo systemctl status nginx

# 3. Порт 3000 открыт?
netstat -tulpn | grep 3000

# 4. DNS настроен?
dig lead-form.website

# 5. SSL работает?
curl -I https://lead-form.website
```

